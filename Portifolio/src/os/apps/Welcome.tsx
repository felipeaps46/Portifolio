import { useTranslation } from "react-i18next";
import type { AppId } from "../config";

export function Welcome({ onOpen }: { onOpen: (id: AppId) => void }) {
  const { t } = useTranslation();
  return (
    <div className="os-pad os-stack">
      <h1 className="os-display">{t("os.welcome.hello")}</h1>
      <p className="os-text">{t("os.welcome.text")}</p>
      <div className="os-grid2">
        <button type="button" className="os-btn" onClick={() => onOpen("projects")}>
          {t("os.welcome.projects")}
        </button>
        <button type="button" className="os-btn" onClick={() => onOpen("about")}>
          {t("os.welcome.about")}
        </button>
        <button type="button" className="os-btn" onClick={() => onOpen("chat")}>
          {t("os.welcome.chat")}
        </button>
        <button type="button" className="os-btn" onClick={() => onOpen("mail")}>
          {t("os.welcome.mail")}
        </button>
      </div>
    </div>
  );
}
