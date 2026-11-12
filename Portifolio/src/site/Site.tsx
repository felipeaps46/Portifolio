import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { health } from "../api/healthApi";
import { useBeat, useHashRoute } from "./hooks";
import { Cursor } from "./Cursor";
import { Header } from "./Header";
import { Hero, Marquee } from "./Hero";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { About } from "./About";
import { Contact } from "./Contact";
import { ChatPanel } from "./ChatPanel";
import { Archive } from "./Archive";
import { SpotifyDock, type SpotifyControl, type SpotifyState } from "./SpotifyDock";
import { SPOTIFY_TRACKS } from "./data";
import "./site.css";

const PING_KEY = "felipe.ping";

export function Site() {
  const { t, i18n } = useTranslation();
  const route = useHashRoute();
  const beat = useBeat();
  const [chat, setChat] = useState(false);
  const [dock, setDock] = useState(false);
  const [spotify, setSpotify] = useState<SpotifyState>({ playing: false, count: 0, trackIndex: 0 });
  const spotifyCtl = useRef<SpotifyControl | null>(null);

  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith("en") ? "en" : "pt-BR";
  }, [i18n.language]);

  // Acorda o backend do chat (Render) uma vez por sessão.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(PING_KEY)) return;
      sessionStorage.setItem(PING_KEY, "1");
    } catch {
      /* sem storage: pinga mesmo assim */
    }
    health().catch(() => undefined);
  }, []);

  // Só uma fonte toca por vez: quando o Spotify *começa* a tocar, a batida própria para.
  // (Reagir só à mudança evita parar a batida logo depois de pausar o Spotify,
  // já que o aviso de pausa do player chega com atraso.)
  const { stop: stopBeat } = beat;
  const wasSpotify = useRef(false);
  useEffect(() => {
    if (spotify.playing && !wasSpotify.current) stopBeat();
    wasSpotify.current = spotify.playing;
  }, [spotify.playing, stopBeat]);

  const toggleBeat = () => {
    if (!beat.playing) spotifyCtl.current?.pause();
    beat.toggle();
  };

  const fromSpotify = spotify.playing && !beat.playing;
  const playing = beat.playing || fromSpotify;
  const count = fromSpotify ? spotify.count : beat.beat;
  const track = SPOTIFY_TRACKS[spotify.trackIndex];
  const rootClass = ["root", playing ? "is-playing" : "", playing ? (count % 2 ? "beat-b" : "beat-a") : ""].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      <a
        className="skip mono"
        href="#conteudo"
        onClick={(e) => {
          // Não muda o hash: ele também controla a rota (#/arquivo).
          e.preventDefault();
          document.getElementById("conteudo")?.focus();
        }}
      >
        {t("site.skip")}
      </a>
      {route === "archive" ? (
        <Archive />
      ) : (
        <>
          <Header />
          <main id="conteudo" tabIndex={-1}>
            <Hero
              playing={beat.playing}
              beat={playing ? ((count % 4) + 4) % 4 : -1}
              onToggle={toggleBeat}
              spotify={fromSpotify ? track : null}
              onOpenSpotify={() => setDock(true)}
            />
            <Marquee text={t("site.marquee.stack")} />
            <Projects />
            <Experience />
            <About />
            <Marquee text={t("site.marquee.areas")} variant="dark" reverse />
            <Contact onAsk={() => setChat(true)} />
          </main>
        </>
      )}
      <SpotifyDock open={dock} onClose={() => setDock(false)} onState={setSpotify} controlRef={spotifyCtl} />
      <ChatPanel open={chat} onClose={() => setChat(false)} />
      <Cursor />
    </div>
  );
}
