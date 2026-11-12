import { useEffect, useState } from "react";
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
import "./site.css";

const PING_KEY = "felipe.ping";

export function Site() {
  const { t, i18n } = useTranslation();
  const route = useHashRoute();
  const { playing, beat, toggle } = useBeat();
  const [chat, setChat] = useState(false);

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

  return (
    <div className={`root${playing ? " is-playing" : ""}`}>
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
            <Hero playing={playing} beat={beat} onToggle={toggle} />
            <Marquee text={t("site.marquee.stack")} />
            <Projects />
            <Experience />
            <About />
            <Marquee text={t("site.marquee.areas")} variant="dark" reverse />
            <Contact onAsk={() => setChat(true)} />
          </main>
        </>
      )}
      <ChatPanel open={chat} onClose={() => setChat(false)} />
      <Cursor />
    </div>
  );
}
