import { useTranslation } from "react-i18next";

type Props = { archive?: boolean };

export function Header({ archive = false }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "pt";
  const other = lang === "pt" ? "en" : "pt";

  return (
    <header className="wrap header">
      <a href={archive ? "#/" : "#capa"} className="display header__logo" aria-label={t("site.nav.home")}>
        FELIPE<span className="loud-text">.</span>
      </a>
      {archive ? (
        <a href="#/" className="mono header__back">{t("site.archive.back")}</a>
      ) : (
        <nav className="mono header__nav" aria-label={t("site.nav.sections")}>
          <a href="#projetos">01 {t("site.nav.projects")}</a>
          <a href="#experiencia">02 {t("site.nav.exp")}</a>
          <a href="#sobre">03 {t("site.nav.about")}</a>
          <a href="#contato">04 {t("site.nav.contact")}</a>
        </nav>
      )}
      <button type="button" className="mono header__lang" onClick={() => void i18n.changeLanguage(other)} aria-label={t("site.nav.lang")}>
        <span className={lang === "pt" ? "" : "muted"}>PT</span> / <span className={lang === "en" ? "" : "muted"}>EN</span>
      </button>
    </header>
  );
}
