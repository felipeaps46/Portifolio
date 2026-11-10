import { useTranslation } from "react-i18next";
import { userData } from "../../data/userData";
import { projects } from "../../data/projects";
import { services } from "../../data/serviceData";

export function About() {
  const { t } = useTranslation();
  const rows: [string, string][] = [
    [t("os.about.processor"), t("os.about.processorValue")],
    [t("os.about.memory"), t("os.about.memoryValue", { count: projects.length })],
    [t("os.about.version"), t("os.about.versionValue")],
    [t("os.about.location"), t("os.about.locationValue")],
  ];

  return (
    <div className="os-pad os-about">
      <img src={userData.img} alt={t("os.about.photoAlt")} className="os-inset os-about__photo" />
      <div className="os-stack os-about__info">
        <h2 className="os-display">{userData.name}</h2>
        <div className="os-chips">
          {userData.caracteristicas.map((c) => (
            <span key={c} className="os-inset os-chip">
              {t(c)}
            </span>
          ))}
        </div>
        <table className="os-props">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="os-inset os-text os-about__desc">{t(userData.desc)}</p>
      <fieldset className="os-fieldset os-about__services">
        <legend>{t("os.about.services")}</legend>
        <ul className="os-services">
          {services.map((s) => (
            <li key={s.title}>
              <strong>{t(s.title)}</strong> — {t(s.description)}
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}
