import { useTranslation } from "react-i18next";
import { FolderIcon, PlayIcon } from "../icons";
import type { ProjectView } from "../projectsView";

type ProjectsProps = {
  items: ProjectView[];
  selected: string;
  onSelect: (id: string) => void;
  onPlay: (id: string) => void;
};

export function Projects({ items, selected, onSelect, onPlay }: ProjectsProps) {
  const { t } = useTranslation();
  const sel = items.find((p) => p.id === selected) ?? items[0];

  return (
    <div className="os-projects">
      <div className="os-projects__list os-inset" role="listbox" aria-label={t("os.apps.projects")}>
        {items.map((p) => {
          const on = p.id === sel.id;
          return (
            <button
              key={p.id}
              type="button"
              role="option"
              aria-selected={on}
              className={`os-file${on ? " os-file--on" : ""}`}
              onClick={() => onSelect(p.id)}
            >
              <FolderIcon fill={p.done ? "#F2B544" : "#C9C3B5"} />
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="os-projects__detail">
        {sel.image ? (
          <div className="os-inset os-projects__media">
            <img src={sel.image} alt={t("os.projects.imageAlt", { name: sel.name })} />
            {sel.video && (
              <button type="button" className="os-btn os-projects__play" onClick={() => onPlay(sel.id)}>
                <PlayIcon />
                {t("os.projects.play")}
              </button>
            )}
          </div>
        ) : (
          <div className="os-inset os-projects__installing">
            <div className="os-progress" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            {t("os.projects.installing")}
          </div>
        )}

        <div className="os-projects__head">
          <h2 className="os-display">{sel.name}</h2>
          <span className={`os-status ${sel.done ? "os-status--done" : "os-status--wip"}`}>
            {t(sel.done ? "projects.status.done" : "projects.status.inProgress")}
          </span>
        </div>
        <p className="os-text">{sel.description}</p>
        <div className="os-mono os-muted">{sel.tech}</div>
        {(sel.siteLink || sel.gitHubLink) && (
          <div className="os-links">
            {sel.siteLink && (
              <a href={sel.siteLink} target="_blank" rel="noreferrer">
                {t("os.projects.site")}
              </a>
            )}
            {sel.gitHubLink && (
              <a href={sel.gitHubLink} target="_blank" rel="noreferrer">
                {t("os.projects.github")}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
