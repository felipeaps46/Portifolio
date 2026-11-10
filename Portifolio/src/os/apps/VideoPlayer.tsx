import { useTranslation } from "react-i18next";
import { PlayIcon } from "../icons";
import type { ProjectView } from "../projectsView";

type VideoPlayerProps = { items: ProjectView[]; current: string; onPick: (id: string) => void };

export function VideoPlayer({ items, current, onPick }: VideoPlayerProps) {
  const { t } = useTranslation();
  const sel = items.find((p) => p.id === current) ?? items[0];
  if (!sel) return null;

  return (
    <div className="os-player">
      <div className="os-player__main">
        <div className="os-player__screen">
          <video key={sel.id} src={sel.video} controls autoPlay muted playsInline loop />
        </div>
        <div className="os-inset os-player__status">
          <span>{t("os.video.playing", { file: sel.videoFile })}</span>
          <span>{t("os.video.info")}</span>
        </div>
      </div>
      <div className="os-player__side">
        <div className="os-label">{t("os.video.playlist")}</div>
        <div className="os-inset os-player__list">
          {items.map((p) => {
            const on = p.id === sel.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                className={`os-player__item${on ? " os-player__item--on" : ""}`}
                onClick={() => onPick(p.id)}
              >
                <PlayIcon size={10} />
                {p.videoFile}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
