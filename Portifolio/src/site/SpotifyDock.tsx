import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { useTranslation } from "react-i18next";
import { SPOTIFY_TRACKS } from "./data";
import { CloseIcon } from "./icons";

// Tipos mínimos da Spotify iFrame API (https://developer.spotify.com/documentation/embeds/references/iframe-api).
type PlaybackUpdate = { data: { isPaused: boolean; isBuffering: boolean; position: number; duration: number } };
type EmbedController = {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  destroy: () => void;
  addListener: (event: "ready" | "playback_update", cb: (e: PlaybackUpdate) => void) => void;
};
type IFrameAPI = {
  createController: (el: HTMLElement, opts: { uri: string; width?: string | number; height?: string | number }, cb: (c: EmbedController) => void) => void;
};
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

let apiPromise: Promise<IFrameAPI> | null = null;
function loadSpotifyApi(): Promise<IFrameAPI> {
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      window.onSpotifyIframeApiReady = resolve;
      const s = document.createElement("script");
      s.src = "https://open.spotify.com/embed/iframe-api/v1";
      s.async = true;
      s.onerror = () => {
        apiPromise = null;
        reject(new Error("Spotify iFrame API não carregou"));
      };
      document.body.appendChild(s);
    });
  }
  return apiPromise;
}

export type SpotifyState = { playing: boolean; count: number; trackIndex: number };
export type SpotifyControl = { pause: () => void };

type Props = {
  open: boolean;
  onClose: () => void;
  onState: (s: SpotifyState) => void;
  controlRef: MutableRefObject<SpotifyControl | null>;
};

/**
 * Player do Spotify carregado só quando a pessoa abre. O site não tem acesso ao áudio,
 * então o pulso usa o BPM cadastrado e a posição da música que o player informa.
 */
export function SpotifyDock({ open, onClose, onState, controlRef }: Props) {
  const { t } = useTranslation();
  const hostRef = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<EmbedController | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const trackRef = useRef(0);
  const onStateRef = useRef(onState);
  onStateRef.current = onState;

  // Estado de reprodução: posição informada pelo player + relógio local entre os avisos.
  const pb = useRef({ playing: false, pos: 0, at: 0 });

  useEffect(() => {
    if (!open || ctrlRef.current) return;
    let cancelled = false;
    loadSpotifyApi()
      .then((api) => {
        if (cancelled || !hostRef.current) return;
        const target = document.createElement("div");
        hostRef.current.appendChild(target);
        api.createController(target, { uri: `spotify:track:${SPOTIFY_TRACKS[trackRef.current].id}`, width: "100%", height: 80 }, (c) => {
          if (cancelled) {
            c.destroy();
            return;
          }
          ctrlRef.current = c;
          controlRef.current = { pause: () => c.pause() };
          c.addListener("playback_update", (e) => {
            const playing = !e.data.isPaused && !e.data.isBuffering;
            pb.current = { playing, pos: e.data.position, at: performance.now() };
          });
        });
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [open, controlRef]);

  // Converte posição em contagem de pulsos e avisa o site só quando muda.
  useEffect(() => {
    let last = "";
    const id = window.setInterval(() => {
      const { playing, pos, at } = pb.current;
      const track = SPOTIFY_TRACKS[trackRef.current];
      const now = playing ? pos + (performance.now() - at) : pos;
      const count = Math.floor(now / (60000 / track.pulse));
      const key = `${playing}:${count}:${trackRef.current}`;
      if (key !== last) {
        last = key;
        onStateRef.current({ playing, count, trackIndex: trackRef.current });
      }
    }, 30);
    return () => window.clearInterval(id);
  }, []);

  // Fechar o painel para a música e desmonta o player.
  useEffect(() => {
    if (open) return;
    pb.current = { playing: false, pos: 0, at: 0 };
    ctrlRef.current?.destroy();
    ctrlRef.current = null;
    controlRef.current = null;
    if (hostRef.current) hostRef.current.innerHTML = "";
  }, [open, controlRef]);

  const pick = (i: number) => {
    setTrackIndex(i);
    trackRef.current = i;
    pb.current = { playing: false, pos: 0, at: performance.now() };
    const c = ctrlRef.current;
    if (c) {
      c.loadUri(`spotify:track:${SPOTIFY_TRACKS[i].id}`);
      c.play();
    }
  };

  return (
    <aside className={`dock${open ? " dock--open" : ""}`} aria-label={t("site.spotify.title")} hidden={!open}>
      <div className="dock__head">
        <span className="mono">{t("site.spotify.title")}</span>
        <button type="button" className="dock__close" onClick={onClose} aria-label={t("site.spotify.close")}>
          <CloseIcon size={18} />
        </button>
      </div>
      <div className="dock__tracks" role="group" aria-label={t("site.spotify.tracks")}>
        {SPOTIFY_TRACKS.map((tr, i) => (
          <button key={tr.id} type="button" className={`dock__track mono${trackIndex === i ? " on" : ""}`} aria-pressed={trackIndex === i} onClick={() => pick(i)}>
            {tr.title} <span className="muted">· {tr.bpm} BPM</span>
          </button>
        ))}
      </div>
      <div className="dock__player" ref={hostRef} />
      <p className="mono muted dock__note">{failed ? t("site.spotify.failed") : t("site.spotify.note")}</p>
    </aside>
  );
}
