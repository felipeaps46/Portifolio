import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EXPERIENCES } from "./data";

/**
 * Experiências em slides horizontais. No computador a seção "trava" e a rolagem
 * vertical passa os slides; no celular (ou com menos movimento) vira um carrossel
 * para deslizar com o dedo.
 */
export function Experience() {
  const { t } = useTranslation();
  const secRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(1);
  const total = EXPERIENCES.length;

  useEffect(() => {
    const sec = secRef.current, pin = pinRef.current, track = trackRef.current;
    if (!sec || !pin || !track) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const extra = Math.max(0, track.scrollWidth - track.clientWidth);
      const pinned = !calm.matches && window.innerWidth > 900 && extra > 0;
      let p: number;
      if (pinned) {
        const ph = pin.offsetHeight;
        sec.style.height = `${ph + extra}px`;
        sec.classList.add("pinned");
        const r = sec.getBoundingClientRect();
        p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - ph)));
        track.scrollLeft = p * extra;
      } else {
        sec.style.height = "";
        sec.classList.remove("pinned");
        p = extra > 0 ? track.scrollLeft / extra : 0;
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      setIndex(Math.min(total, Math.round(p * (total - 1)) + 1));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    track.addEventListener("scroll", schedule, { passive: true });
    calm.addEventListener("change", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      track.removeEventListener("scroll", schedule);
      calm.removeEventListener("change", schedule);
      ro.disconnect();
    };
  }, [total]);

  return (
    <section id="experiencia" className="xp" ref={secRef}>
      <div className="xp__pin" ref={pinRef}>
        <div className="wrap section__head xp__head">
          <h2 className="display big">{t("site.exp.title")}</h2>
          <p className="mono muted">
            <span className="xp__count">{String(index).padStart(2, "0")}</span> / {String(total).padStart(2, "0")} · {t("site.exp.hint")}
          </p>
        </div>

        <div className="xp__track" ref={trackRef}>
          {EXPERIENCES.map((x) => {
            const base = `site.exp.items.${x.key}`;
            const bullets = x.list ? (t(`${base}.bullets`, { returnObjects: true }) as string[]) : [];
            const name = t(`${base}.name`);
            return (
              <article key={x.key} className="xs">
                <div className="xs__text">
                  <span className="mono loud-text">{t(`${base}.tag`)}</span>
                  <h3 className="display xs__title">{t(`${base}.title`)}</h3>
                  {x.list ? (
                    <ul className="bullets">
                      {bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="xs__p">{t(`${base}.text`)}</p>
                  )}
                  {x.key === "degree" && <span className="mono muted">{t(`${base}.note`)}</span>}
                  {x.cta && (
                    <a className="btn" href={x.cta}>{t(`${base}.cta`)}</a>
                  )}
                </div>
                <div className="xs__side">
                  <div className="xs__tile" data-cursor={x.photo ? "media" : undefined}>
                    {x.photo ? (
                      <img src={x.photo} alt={t(`site.exp.photoAlt.${x.key}`)} className={x.gray ? "gray" : ""} loading="lazy" />
                    ) : (
                      <span className="xs__mark scan display">{name}</span>
                    )}
                  </div>
                  <div className="xs__tile">
                    {x.logo ? (
                      <span className="xs__logo"><img src={x.logo} alt={name} /></span>
                    ) : (
                      <span className="xs__logo display" aria-hidden="true">{name}</span>
                    )}
                  </div>
                  <div className="xs__who">
                    <p className="display xs__name">{name}</p>
                    <span className="mono loud-text">{t(`${base}.role`)}</span>
                    <span>{t(`${base}.when`)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="wrap">
          <div className="xp__bar" aria-hidden="true">
            <span ref={barRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
