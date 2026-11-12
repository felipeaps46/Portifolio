import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { userData } from "../data/userData";
import { SITE_PROJECTS, type SiteProject } from "./data";
import { GridIcon, ListIcon, PlayIcon, PlusIcon } from "./icons";

type View = "grid" | "list";

export function Projects() {
  const { t } = useTranslation();
  const [view, setView] = useState<View>("grid");
  const [open, setOpen] = useState<string | null>(SITE_PROJECTS[0]?.id ?? null);
  const [video, setVideo] = useState<SiteProject | null>(null);
  const toggle = (id: string) => setOpen((o) => (o === id ? null : id));
  const sel = SITE_PROJECTS.find((p) => p.id === open);

  return (
    <section id="projetos" className="wrap section">
      <div className="section__head">
        <h2 className="display big">{t("site.projects.title")}</h2>
        <div className="viewbar">
          <span className="mono muted">{t("site.projects.count", { count: SITE_PROJECTS.length })}</span>
          <div role="group" aria-label={t("site.projects.view")} className="viewbar__group">
            <button type="button" className={`seg${view === "list" ? " on" : ""}`} aria-pressed={view === "list"} aria-label={t("site.projects.list")} onClick={() => setView("list")}>
              <ListIcon />
            </button>
            <button type="button" className={`seg${view === "grid" ? " on" : ""}`} aria-pressed={view === "grid"} aria-label={t("site.projects.grid")} onClick={() => setView("grid")}>
              <GridIcon />
            </button>
          </div>
        </div>
      </div>

      {view === "list" ? (
        <div className="tracks">
          {SITE_PROJECTS.map((p, i) => {
            const isOpen = open === p.id;
            return (
              <div key={p.id} className="rise" style={{ animationDelay: `${i * 60}ms` }}>
                <button type="button" className={`track${isOpen ? " open" : ""}`} aria-expanded={isOpen} onClick={() => toggle(p.id)}>
                  <span className="mono muted">{p.n}</span>
                  <span className="display track__title">{t(p.titleKey)}</span>
                  <span className="mono muted hide-sm">{t(`site.projects.items.${p.key}.kind`)}</span>
                  <span className="mono muted hide-sm track__stack">{p.stack.slice(0, 3).join(" · ")}</span>
                  <Status done={p.done} className="hide-sm" />
                  <span className="track__plus"><PlusIcon /></span>
                </button>
                {isOpen && (
                  <div className="detail rise">
                    <Cover p={p} wide />
                    <Info p={p} onWatch={setVideo} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="grid">
            {SITE_PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`card rise${open === p.id ? " sel" : ""}`}
                style={{ animationDelay: `${i * 60}ms` }}
                aria-pressed={open === p.id}
                onClick={() => toggle(p.id)}
              >
                <span className="card__cover" data-cursor="media">
                  {p.image ? (
                    <img src={p.image} alt={t("site.projects.screen", { name: t(p.titleKey) })} loading="lazy" />
                  ) : (
                    <span className="card__empty scan">
                      <Status done={false} />
                      <span className="display card__ghost">{t(p.titleKey)}</span>
                    </span>
                  )}
                  <span className="card__play" aria-hidden="true"><PlayIcon size={22} /></span>
                </span>
                <span className="display card__title">{t(p.titleKey)}</span>
                <span className="mono muted">{p.n} · {t(`site.projects.items.${p.key}.kind`)}</span>
              </button>
            ))}
          </div>

          {sel && (
            <div className="panel rise" key={sel.id}>
              <div className="panel__head">
                <p className="display panel__title">{t(sel.titleKey)}</p>
                <span className="mono panel__meta">
                  {sel.n} · {t(`site.projects.items.${sel.key}.kind`)} · <Status done={sel.done} />
                </span>
              </div>
              <Info p={sel} onWatch={setVideo} narrow />
            </div>
          )}
        </>
      )}

      <VideoModal project={video} onClose={() => setVideo(null)} />
    </section>
  );
}

function Status({ done, className = "" }: { done: boolean; className?: string }) {
  const { t } = useTranslation();
  return (
    <span className={`mono status ${className}`}>
      {!done && <span className="rec" aria-hidden="true" />}
      {done ? t("site.projects.done") : t("site.projects.wip")}
    </span>
  );
}

function Cover({ p, wide = false }: { p: SiteProject; wide?: boolean }) {
  const { t } = useTranslation();
  if (p.image) {
    return <img className={wide ? "detail__img" : ""} src={p.image} alt={t("site.projects.screen", { name: t(p.titleKey) })} data-cursor="media" loading="lazy" />;
  }
  return (
    <div className="detail__empty scan" data-cursor="media">
      <span className="rec" aria-hidden="true" />
      <span className="display">{t("site.projects.wip")}</span>
      <span className="mono muted">{t("site.projects.soon")}</span>
    </div>
  );
}

function Info({ p, onWatch, narrow = false }: { p: SiteProject; onWatch: (p: SiteProject) => void; narrow?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className={`info${narrow ? " info--narrow" : ""}`}>
      <p className="info__desc">{t(`site.projects.items.${p.key}.desc`)}</p>
      <div className="chips mono">
        {p.stack.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>
      <div className="actions">
        {p.video && (
          <button type="button" className="btn loud" onClick={() => onWatch(p)}>
            <PlayIcon size={16} />
            {t("site.projects.watch")}
          </button>
        )}
        {p.siteLink && (
          <a className="btn" href={p.siteLink} target="_blank" rel="noreferrer">{t("site.projects.site")}</a>
        )}
        <a className="btn" href={p.gitHubLink ?? userData.links?.github} target="_blank" rel="noreferrer">
          {t("site.projects.github")}
        </a>
      </div>
    </div>
  );
}

function VideoModal({ project, onClose }: { project: SiteProject | null; onClose: () => void }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  const name = project ? t(project.titleKey) : "";
  return (
    <dialog
      ref={ref}
      className="video"
      aria-label={t("site.projects.video", { name })}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project?.video && (
        <div className="video__box">
          <div className="video__head">
            <span className="display video__title">{name}</span>
            <button type="button" className="btn" onClick={onClose}>{t("site.projects.close")}</button>
          </div>
          <video key={project.id} src={project.video} controls autoPlay playsInline />
        </div>
      )}
    </dialog>
  );
}
