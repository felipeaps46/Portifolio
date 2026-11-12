import { useTranslation } from "react-i18next";
import { PauseIcon, PlayIcon } from "./icons";

type Props = { playing: boolean; beat: number; onToggle: () => void };

export function Hero({ playing, beat, onToggle }: Props) {
  const { t } = useTranslation();

  return (
    <section id="capa" className="wrap scan hero">
      <div className="mono muted hero__meta">
        <span>{t("site.hero.meta")}</span>
        <span>{t("site.hero.place")}</span>
      </div>

      <h1 className="display hero__name pulse">
        Felipe
        <br />
        Pereira<span className="loud-text">.</span>
      </h1>

      <div className="hero__grid">
        <div className="hero__intro">
          <p className="display hero__role">{t("site.hero.role")}</p>
          <p className="hero__lead">{t("site.hero.lead")}</p>
        </div>

        <div className="hero__player">
          <div className="hero__playinfo">
            <span className="mono">{playing ? t("site.hero.playing") : t("site.hero.play")}</span>
            <span className="mono muted">{t("site.hero.bpm")}</span>
            <span className="hero__dots" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={playing && beat === i ? "on" : ""} />
              ))}
            </span>
          </div>
          <button
            type="button"
            className="playbtn glow"
            onClick={onToggle}
            aria-pressed={playing}
            aria-label={playing ? t("site.hero.pauseLabel") : t("site.hero.playLabel")}
          >
            {playing ? <PauseIcon size={38} /> : <PlayIcon size={38} />}
          </button>
        </div>
      </div>
    </section>
  );
}

export function Marquee({ text, variant = "loud", reverse = false }: { text: string; variant?: "loud" | "dark"; reverse?: boolean }) {
  return (
    <div className={`band band--${variant}`} aria-hidden="true">
      <div className={`marquee display${reverse ? " rev" : ""}`}>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
