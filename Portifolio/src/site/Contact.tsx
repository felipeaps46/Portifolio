import { useTranslation } from "react-i18next";
import { userData } from "../data/userData";

export function Contact({ onAsk }: { onAsk: () => void }) {
  const { t } = useTranslation();
  const email = userData.links?.email ?? userData.emailName;

  return (
    <section id="contato" className="wrap scan contact">
      <p className="mono muted">{t("site.contact.tag")}</p>
      <h2 className="display big pulse">
        {t("site.contact.line1")}
        <br />
        {t("site.contact.line2")}
        <span className="loud-text">?</span>
      </h2>
      <a className="display mail" href={`mailto:${email}`}>{email}</a>
      <div className="actions">
        <a className="btn loud" href={userData.links?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="btn" href={userData.links?.github} target="_blank" rel="noreferrer">GitHub</a>
        <button type="button" className="btn" onClick={onAsk}>{t("site.contact.ai")}</button>
      </div>
      <Footer />
    </section>
  );
}

export function Footer({ archive = false }: { archive?: boolean }) {
  const { t } = useTranslation();
  return (
    <footer className={`mono muted footer${archive ? " wrap" : ""}`}>
      <span>© 2026 Felipe Pereira</span>
      <span>{t("site.contact.made")}</span>
      <a href={archive ? "#/" : "#capa"}>{archive ? t("site.archive.back") : t("site.contact.top")}</a>
    </footer>
  );
}
