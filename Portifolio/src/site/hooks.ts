import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export type Route = "home" | "archive";

function readRoute(): Route {
  return window.location.hash.startsWith("#/arquivo") ? "archive" : "home";
}

/** Rotas por hash: "#/arquivo" abre o Arquivo; qualquer outro hash (como "#projetos") fica na página inicial. */
export function useHashRoute(): Route {
  const route = useSyncExternalStore(
    (cb) => {
      window.addEventListener("hashchange", cb);
      return () => window.removeEventListener("hashchange", cb);
    },
    readRoute,
    () => "home" as Route,
  );
  const last = useRef(route);
  useEffect(() => {
    if (last.current === route) return;
    last.current = route;
    const hash = window.location.hash;
    if (route === "home" && hash.length > 1 && !hash.startsWith("#/")) {
      // Veio do Arquivo por um link de seção (ex.: "#projetos"): rola até ela depois de montar.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [route]);
  return route;
}

/** Batida de 120 BPM gerada com Web Audio. `beat` vai de 0 a 3 enquanto toca, -1 parado. */
export function useBeat() {
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(-1);
  const ctx = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const timer = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
    setBeat(-1);
  }, []);

  const start = useCallback(() => {
    try {
      if (!ctx.current) {
        const ac = new AudioContext();
        const g = ac.createGain();
        g.gain.value = 0.45;
        g.connect(ac.destination);
        ctx.current = ac;
        master.current = g;
      }
      void ctx.current.resume();
    } catch {
      ctx.current = null;
    }

    const noise = (ac: AudioContext, out: GainNode, len: number, type: BiquadFilterType, freq: number, vol: number, t: number) => {
      const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * len), ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = ac.createBufferSource();
      src.buffer = buf;
      const f = ac.createBiquadFilter();
      f.type = type;
      f.frequency.value = freq;
      const g = ac.createGain();
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + len);
      src.connect(f).connect(g).connect(out);
      src.start(t);
      src.stop(t + len);
    };
    const kick = (ac: AudioContext, out: GainNode, t: number) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.frequency.setValueAtTime(150, t);
      o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
      g.gain.setValueAtTime(1, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + 0.36);
    };

    let step = 0;
    const tick = () => {
      const ac = ctx.current;
      const out = master.current;
      if (ac && out) {
        const t = ac.currentTime + 0.02;
        if (step % 2 === 0) kick(ac, out, t);
        if (step % 8 === 4) noise(ac, out, 0.18, "bandpass", 1800, 0.5, t);
        if (step % 2 === 1) noise(ac, out, 0.05, "highpass", 7000, 0.18, t);
      }
      if (step % 2 === 0) setBeat((step / 2) % 4);
      step++;
    };
    tick();
    timer.current = window.setInterval(tick, 250);
    setPlaying(true);
  }, []);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearInterval(timer.current);
      void ctx.current?.close().catch(() => undefined);
    },
    [],
  );

  const toggle = useCallback(() => (timer.current !== null ? stop() : start()), [start, stop]);
  return { playing, beat, toggle, stop };
}
