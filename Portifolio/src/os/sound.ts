// Efeitos sonoros gerados na hora com Web Audio (sem arquivos de áudio).

type Note = { f: number; t: number; d: number; w?: OscillatorType; v?: number };

export type Sfx = "open" | "close" | "click" | "boot";

const SFX: Record<Sfx, Note[]> = {
  open: [
    { f: 660, t: 0, d: 0.06 },
    { f: 990, t: 0.05, d: 0.08 },
  ],
  close: [
    { f: 880, t: 0, d: 0.06 },
    { f: 520, t: 0.05, d: 0.08 },
  ],
  click: [{ f: 440, t: 0, d: 0.035 }],
  boot: [
    { f: 392, t: 0, d: 0.5, w: "triangle", v: 0.08 },
    { f: 523, t: 0.14, d: 0.5, w: "triangle", v: 0.08 },
    { f: 659, t: 0.28, d: 0.5, w: "triangle", v: 0.08 },
    { f: 784, t: 0.42, d: 0.9, w: "triangle", v: 0.08 },
  ],
};

let ctx: AudioContext | null = null;

export function playSfx(name: Sfx): void {
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx ??= new Ctor();
    const ac = ctx;
    if (ac.state === "suspended") void ac.resume();
    const t0 = ac.currentTime + 0.01;
    for (const n of SFX[name]) {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      const t = t0 + n.t;
      osc.type = n.w ?? "square";
      osc.frequency.setValueAtTime(n.f, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(n.v ?? 0.04, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + n.d);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + n.d + 0.03);
    }
  } catch {
    /* áudio indisponível: segue em silêncio */
  }
}
