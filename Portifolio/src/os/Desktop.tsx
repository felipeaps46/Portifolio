import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  APP_ORDER,
  APP_WIDTH,
  DEFAULT_LOOK,
  MOBILE_QUERY,
  STORAGE,
  TRASH_ITEMS,
  WALLPAPERS,
  type AppId,
  type Look,
} from "./config";
import { readJSON, readStorage, writeStorage } from "./storage";
import { playSfx, type Sfx } from "./sound";
import { useClock, useMediaQuery } from "./hooks";
import { useWindows } from "./useWindows";
import { getProjects } from "./projectsView";
import { Window } from "./Window";
import { BootScreen } from "./BootScreen";
import { DesktopIcon, SpeakerIcon, StartLogo, type DesktopIconId } from "./icons";
import { Welcome } from "./apps/Welcome";
import { About } from "./apps/About";
import { Projects } from "./apps/Projects";
import { Experience } from "./apps/Experience";
import { Skills } from "./apps/Skills";
import { Chat } from "./apps/Chat";
import { Mail } from "./apps/Mail";
import { Trash } from "./apps/Trash";
import { VideoPlayer } from "./apps/VideoPlayer";
import { Appearance } from "./apps/Appearance";
import { userData } from "../data/userData";
import { health } from "../api/healthApi";
import "./os.css";

const DESKTOP_APPS: (AppId & DesktopIconId)[] = ["about", "projects", "exp", "skills", "chat", "mail"];
const START_APPS: AppId[] = ["about", "projects", "exp", "skills", "chat", "mail", "look", "trash"];

export function Desktop() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "pt";
  const mobile = useMediaQuery(MOBILE_QUERY);
  const clock = useClock();
  const { wins, active, open, close, minimize, focus, move } = useWindows();

  const [booting, setBooting] = useState(() => readStorage(STORAGE.booted) !== "1");
  const [sound, setSound] = useState(false);
  const [look, setLook] = useState<Look>(() => readJSON(STORAGE.look, DEFAULT_LOOK));
  const [startOpen, setStartOpen] = useState(false);
  const [trashEmpty, setTrashEmpty] = useState(false);

  const projects = useMemo(() => getProjects(t), [t]);
  const videos = useMemo(() => projects.filter((p) => p.video), [projects]);
  const [selected, setSelected] = useState(() => videos[videos.length - 1]?.id ?? projects[0]?.id ?? "");
  const [playing, setPlaying] = useState(() => videos[0]?.id ?? "");

  const soundRef = useRef(sound);
  soundRef.current = sound;
  const sfx = useCallback((name: Sfx) => {
    if (soundRef.current) playSfx(name);
  }, []);

  // Acorda o backend (Render) uma vez por sessão, para o chat responder rápido.
  useEffect(() => {
    if (readStorage(STORAGE.sessionPing, true)) return;
    writeStorage(STORAGE.sessionPing, "1", true);
    health().catch(() => undefined);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }, [lang]);

  useEffect(() => {
    if (!startOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setStartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [startOpen]);

  const openApp = useCallback(
    (id: AppId) => {
      open(id);
      setStartOpen(false);
      sfx("open");
    },
    [open, sfx],
  );
  const closeApp = (id: AppId) => {
    close(id);
    sfx("close");
  };
  const minimizeApp = (id: AppId) => {
    minimize(id);
    sfx("close");
  };

  const bootingRef = useRef(booting);
  bootingRef.current = booting;
  const finishBoot = useCallback(() => {
    if (!bootingRef.current) return;
    bootingRef.current = false;
    setBooting(false);
    writeStorage(STORAGE.booted, "1");
    if (soundRef.current) playSfx("boot");
  }, []);

  const changeLook = (patch: Partial<Look>) => {
    setLook((prev) => {
      const next = { ...prev, ...patch };
      writeStorage(STORAGE.look, JSON.stringify(next));
      return next;
    });
    sfx("click");
  };

  const toggleSound = () => {
    const on = !sound;
    setSound(on);
    if (on) playSfx("click");
  };

  const toggleLang = () => {
    void i18n.changeLanguage(lang === "pt" ? "en" : "pt");
    sfx("click");
  };

  const playProject = (id: string) => {
    setPlaying(id);
    openApp("video");
  };

  const wallpaper = WALLPAPERS.find((w) => w.id === look.wallpaper) ?? WALLPAPERS[0];
  const playingFile = videos.find((v) => v.id === playing)?.videoFile ?? "";
  const done = projects.filter((p) => p.done).length;

  const apps: Record<AppId, { title: string; body: ReactNode; footer?: ReactNode }> = {
    welcome: { title: t("os.apps.welcome"), body: <Welcome onOpen={openApp} /> },
    about: { title: t("os.about.title"), body: <About /> },
    projects: {
      title: t("os.projects.title", { count: projects.length }),
      body: (
        <>
          <div className="os-addressbar">
            {t("os.projects.address")} <span className="os-inset">FelipeOS:\{t("os.apps.projects")}\</span>
          </div>
          <Projects items={projects} selected={selected} onSelect={setSelected} onPlay={playProject} />
        </>
      ),
      footer: t("os.projects.hint", { done, progress: projects.length - done }),
    },
    exp: { title: t("os.exp.title"), body: <Experience /> },
    skills: { title: t("os.skills.title"), body: <Skills /> },
    chat: { title: t("os.chat.title"), body: <Chat /> },
    mail: { title: t("os.mail.title"), body: <Mail /> },
    trash: {
      title: t("os.trash.title", { count: trashEmpty ? 0 : TRASH_ITEMS.length }),
      body: (
        <Trash
          emptied={trashEmpty}
          onEmpty={() => {
            setTrashEmpty(true);
            sfx("close");
          }}
        />
      ),
    },
    video: {
      title: t("os.video.title", { file: playingFile }),
      body: (
        <VideoPlayer
          items={videos}
          current={playing}
          onPick={(id) => {
            setPlaying(id);
            sfx("click");
          }}
        />
      ),
    },
    look: {
      title: t("os.look.title"),
      body: (
        <Appearance
          look={look}
          onChange={changeLook}
          onReset={() => changeLook(DEFAULT_LOOK)}
          onClose={() => closeApp("look")}
        />
      ),
    },
  };

  const tasks = APP_ORDER.filter((id) => wins[id].open);

  return (
    <div
      className="os-root"
      style={{
        backgroundColor: look.desktop,
        backgroundImage: wallpaper.image,
        backgroundSize: wallpaper.size,
      }}
    >
      <div className="os-watermark" aria-hidden="true">
        <div className="os-watermark__name">Felipe/OS</div>
        <div>{t("os.edition")}</div>
      </div>

      <nav className="os-icons" aria-label={t("os.desktopIcons")} onPointerDown={() => setStartOpen(false)}>
        {DESKTOP_APPS.map((id) => (
          <button key={id} type="button" className="os-icon" onClick={() => openApp(id)}>
            <DesktopIcon id={id} />
            <span>{t(`os.apps.${id}`)}</span>
          </button>
        ))}
        <a className="os-icon" href={userData.curriculo} download>
          <DesktopIcon id="cv" />
          <span>{t("os.apps.cv")}</span>
        </a>
        <button type="button" className="os-icon" onClick={() => openApp("look")}>
          <DesktopIcon id="look" />
          <span>{t("os.apps.look")}</span>
        </button>
        <button type="button" className="os-icon" onClick={() => openApp("trash")}>
          <DesktopIcon id="trash" />
          <span>{t("os.apps.trash")}</span>
        </button>
      </nav>

      <main className="os-windows" onPointerDown={() => setStartOpen(false)}>
        {APP_ORDER.map((id) => (
          <Window
            key={id}
            title={apps[id].title}
            label={t(`os.apps.${id}`)}
            width={APP_WIDTH[id]}
            state={wins[id]}
            active={active === id}
            accent={look.accent}
            mobile={mobile}
            onFocus={() => focus(id)}
            onClose={() => closeApp(id)}
            onMinimize={() => minimizeApp(id)}
            onMove={(x, y) => move(id, x, y)}
            footer={apps[id].footer}
          >
            {apps[id].body}
          </Window>
        ))}
      </main>

      {startOpen && (
        <div className="os-start os-bevel" role="menu" aria-label={t("os.start.menu")}>
          <div className="os-start__band" style={{ background: look.accent }}>
            <span>Felipe/OS</span>
          </div>
          <div className="os-start__items">
            {START_APPS.map((id) => (
              <button key={id} type="button" role="menuitem" className="os-start__item" onClick={() => openApp(id)}>
                {t(`os.apps.${id}`)}
              </button>
            ))}
            <div className="os-sep" />
            <a role="menuitem" className="os-start__item" href={userData.curriculo} download>
              {t("os.start.cv")}
            </a>
            <button
              type="button"
              role="menuitem"
              className="os-start__item"
              onClick={() => {
                setStartOpen(false);
                setBooting(true);
              }}
            >
              {t("os.start.restart")}
            </button>
          </div>
        </div>
      )}

      <footer className="os-taskbar">
        <button
          type="button"
          className="os-btn os-start-btn"
          aria-expanded={startOpen}
          aria-haspopup="menu"
          onClick={() => {
            setStartOpen((s) => !s);
            sfx("click");
          }}
        >
          <StartLogo />
          {t("os.start.button")}
        </button>
        <div className="os-tasks">
          {tasks.map((id) => {
            const on = active === id && !wins[id].min;
            return (
              <button
                key={id}
                type="button"
                className={`os-btn os-task${on ? " os-task--on" : ""}`}
                aria-pressed={on}
                onClick={() => (on ? minimizeApp(id) : openApp(id))}
              >
                {t(`os.apps.${id}`)}
              </button>
            );
          })}
        </div>
        <div className="os-inset os-tray">
          <button
            type="button"
            className="os-tray__btn"
            aria-pressed={sound}
            aria-label={t(sound ? "os.taskbar.soundOff" : "os.taskbar.soundOn")}
            title={t(sound ? "os.taskbar.soundOff" : "os.taskbar.soundOn")}
            onClick={toggleSound}
          >
            <SpeakerIcon on={sound} />
          </button>
          <button
            type="button"
            className="os-tray__btn os-tray__lang"
            aria-label={t("os.taskbar.language")}
            title={t("os.taskbar.language")}
            onClick={toggleLang}
          >
            {lang.toUpperCase()}
          </button>
          <span className="os-tray__clock">{clock}</span>
        </div>
      </footer>

      {booting && <BootScreen accent={look.accent} projectCount={projects.length} onDone={finishBoot} />}
    </div>
  );
}
