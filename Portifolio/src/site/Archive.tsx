import { useTranslation } from "react-i18next";
import { award1, award2, award3, CERTIFICATES, PAPERS } from "./data";
import { Header } from "./Header";
import { Marquee } from "./Hero";
import { Footer } from "./Contact";

const AWARDS = [
  { key: "a1", img: award1, alt: "site.about.award1Alt", pos: "50% 50%" },
  { key: "a2", img: award2, alt: "site.about.award2Alt", pos: "50% 55%" },
  { key: "a3", img: award3, alt: "site.archive.award3Alt", pos: "50% 45%" },
] as const;

export function Archive() {
  const { t } = useTranslation();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Header archive />
      <main id="conteudo" tabIndex={-1}>
        <section className="wrap scan archive__top">
          <span className="mono muted">{t("site.archive.tag")}</span>
          <h1 className="display archive__title">
            {t("site.archive.title")}
            <span className="loud-text">.</span>
          </h1>
          <nav aria-label={t("site.archive.sections")} className="mono archive__tabs">
            <button type="button" className="tab" onClick={() => go("premios")}>01 {t("site.archive.awards")}</button>
            <button type="button" className="tab" onClick={() => go("certificados")}>02 {t("site.archive.certs")}</button>
            <button type="button" className="tab" onClick={() => go("papers")}>03 {t("site.archive.papers")}</button>
          </nav>
        </section>

        <Marquee text={`${t("site.marquee.archive")} `.repeat(4).trim()} />

        <section id="premios" className="wrap section">
          <div className="section__head">
            <h2 className="display h2">{t("site.archive.awards")}</h2>
            <span className="mono muted">{t("site.archive.awardsHint")}</span>
          </div>
          <div className="awards">
            {AWARDS.map((a) => (
              <div key={a.key} className="award">
                <img src={a.img} alt={t(a.alt)} data-cursor="media" loading="lazy" style={{ objectPosition: a.pos }} />
                <div className="award__text">
                  <span className="mono loud-text">{t(`site.archive.items.${a.key}.tag`)}</span>
                  <p className="display award__title">{t(`site.archive.items.${a.key}.title`)}</p>
                  <p className="award__p">{t(`site.archive.items.${a.key}.text`)}</p>
                  <span className="mono muted">PUC Minas</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certificados" className="wrap section">
          <div className="section__head">
            <h2 className="display h2">{t("site.archive.certs")}</h2>
            <span className="mono muted">{t("site.archive.certsHint")}</span>
          </div>
          {CERTIFICATES.length ? (
            <div className="certs">
              {CERTIFICATES.map((c) => (
                <div key={c.href} className="cert scan">
                  <span className="mono muted">{c.org} · {c.year}</span>
                  <p className="display cert__name">{c.name}</p>
                  <a className="btn" href={c.href} target="_blank" rel="noreferrer">{t("site.archive.viewCert")}</a>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty scan mono">{t("site.archive.empty")}</p>
          )}
        </section>

        <section id="papers" className="wrap section">
          <div className="section__head">
            <h2 className="display h2">{t("site.archive.papers")}</h2>
            <span className="mono muted">{t("site.archive.papersHint")}</span>
          </div>
          {PAPERS.length ? (
            <div className="papers">
              {PAPERS.map((p, i) => (
                <a key={p.href} className="paper" href={p.href} target="_blank" rel="noreferrer">
                  <span className="mono muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="paper__main">
                    <span className="display paper__title">{p.title}</span>
                    <span className="mono muted">{p.venue} · {p.year}</span>
                  </span>
                  <span className="mono hide-sm">{t("site.archive.readPaper")}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="empty scan mono">{t("site.archive.empty")}</p>
          )}
        </section>
      </main>
      <Footer archive />
    </>
  );
}
