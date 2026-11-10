import { useTranslation } from "react-i18next";
import { TRASH_ITEMS } from "../config";

export function Trash({ emptied, onEmpty }: { emptied: boolean; onEmpty: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="os-pad os-stack">
      <div className="os-inset os-trash">
        {emptied ? (
          <p className="os-trash__empty">{t("os.trash.emptied")}</p>
        ) : (
          TRASH_ITEMS.map((f) => (
            <div key={f.name} className="os-trash__row">
              <span>{f.name}</span>
              <span className="os-muted">{f.year}</span>
            </div>
          ))
        )}
      </div>
      <div className="os-row-end">
        <button type="button" className="os-btn" onClick={onEmpty} disabled={emptied}>
          {t("os.trash.empty")}
        </button>
      </div>
    </div>
  );
}
