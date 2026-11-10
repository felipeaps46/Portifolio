import { useTranslation } from "react-i18next";
import { ACCENT_COLORS, DESKTOP_COLORS, WALLPAPERS, type Look } from "../config";

type AppearanceProps = { look: Look; onChange: (patch: Partial<Look>) => void; onReset: () => void; onClose: () => void };

export function Appearance({ look, onChange, onReset, onClose }: AppearanceProps) {
  const { t } = useTranslation();
  return (
    <div className="os-pad os-stack">
      <fieldset className="os-fieldset">
        <legend>{t("os.look.wallpaper")}</legend>
        <div className="os-wallpapers">
          {WALLPAPERS.map((w) => {
            const on = w.id === look.wallpaper;
            return (
              <button key={w.id} type="button" aria-pressed={on} className="os-wallpaper" onClick={() => onChange({ wallpaper: w.id })}>
                <span
                  className="os-wallpaper__thumb"
                  style={{
                    borderColor: on ? "#1B1A17" : "transparent",
                    backgroundColor: look.desktop,
                    backgroundImage: w.image,
                    backgroundSize: w.thumb,
                  }}
                />
                {t(`os.look.wallpapers.${w.id}`)}
              </button>
            );
          })}
        </div>
      </fieldset>
      <Swatches legend={t("os.look.desktopColor")} colors={DESKTOP_COLORS} value={look.desktop} onPick={(hex) => onChange({ desktop: hex })} />
      <Swatches legend={t("os.look.accentColor")} colors={ACCENT_COLORS} value={look.accent} onPick={(hex) => onChange({ accent: hex })} />
      <div className="os-row-end">
        <button type="button" className="os-btn" onClick={onReset}>
          {t("os.look.reset")}
        </button>
        <button type="button" className="os-btn" onClick={onClose}>
          {t("os.look.ok")}
        </button>
      </div>
    </div>
  );
}

type SwatchesProps = {
  legend: string;
  colors: readonly { hex: string; key: string }[];
  value: string;
  onPick: (hex: string) => void;
};

function Swatches({ legend, colors, value, onPick }: SwatchesProps) {
  const { t } = useTranslation();
  return (
    <fieldset className="os-fieldset">
      <legend>{legend}</legend>
      <div className="os-swatches">
        {colors.map((c) => {
          const on = c.hex === value;
          return (
            <button
              key={c.hex}
              type="button"
              className="os-swatch"
              aria-pressed={on}
              aria-label={t(`os.look.colors.${c.key}`)}
              title={t(`os.look.colors.${c.key}`)}
              style={{ background: c.hex, borderColor: on ? "#1B1A17" : "#FFFFFF" }}
              onClick={() => onPick(c.hex)}
            />
          );
        })}
      </div>
    </fieldset>
  );
}
