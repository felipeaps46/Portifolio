import { useTranslation } from "react-i18next";
import { skills, type SkillCategory, type SkillItem } from "../../data/techData";

export function Skills() {
  const { t } = useTranslation();
  const groups = new Map<SkillCategory, SkillItem[]>();
  for (const s of skills) groups.set(s.category, [...(groups.get(s.category) ?? []), s]);

  return (
    <div className="os-pad os-skills">
      {[...groups.entries()].map(([cat, items]) => (
        <fieldset key={cat} className="os-fieldset">
          <legend>{t(`os.skills.categories.${cat}`)}</legend>
          <ul className="os-skill-list">
            {items.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.name}>
                  <span className="os-skill-icon" style={{ background: s.bg }}>
                    <Icon color={s.color} size={16} aria-hidden="true" />
                  </span>
                  {s.name}
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
