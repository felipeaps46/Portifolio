import { useTranslation } from "react-i18next";
import { experienceData } from "../../data/experienceData";

export function Experience() {
  const { t } = useTranslation();
  return (
    <div className="os-terminal">
      <div className="os-terminal__prompt">felipe@os:~$ cat {t("os.apps.exp")}</div>
      {experienceData.map((e) => {
        const end = e.finalDate ? e.finalDate : t("os.exp.current");
        const range = e.startDate === e.finalDate ? e.startDate : `${e.startDate} → ${end}`;
        return (
          <div key={e.role}>
            <span className="os-terminal__date">[{range}]</span> <strong>{t(e.role)}</strong> · {t(e.company)}{" "}
            <span className="os-terminal__tag">({t(e.type)})</span>
            <br />
            <span className="os-terminal__desc">{t(e.description)}</span>
          </div>
        );
      })}
      <div className="os-terminal__prompt">
        felipe@os:~$ <span className="os-terminal__cursor" aria-hidden="true" />
      </div>
    </div>
  );
}
