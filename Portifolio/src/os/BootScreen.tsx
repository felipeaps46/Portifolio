import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type BootScreenProps = { accent: string; projectCount: number; onDone: () => void };

const STEP_MS = 420;

export function BootScreen({ accent, projectCount, onDone }: BootScreenProps) {
  const { t } = useTranslation();
  const lines = (t("os.boot.lines", { returnObjects: true, count: projectCount }) as string[]).map((l) =>
    l.replace("{{count}}", String(projectCount)),
  );
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (step > lines.length + 1) onDone();
  }, [step, lines.length, onDone]);

  const shown = Math.min(step, lines.length);
  const pct = Math.round((100 * shown) / lines.length);

  return (
    <div className="os-boot" role="dialog" aria-label={t("os.boot.label")} aria-live="polite">
      <div className="os-boot__log">
        {lines.slice(0, shown).map((line, i) => (
          <div key={line}>
            <span className="os-boot__ok">{i < shown - 1 || step > lines.length ? "[ OK ]" : "[ .. ]"}</span> {line}
          </div>
        ))}
      </div>
      <div className="os-boot__center">
        <div className="os-boot__logo">Felipe/OS</div>
        <div className="os-boot__edition">{t("os.edition")}</div>
        <div className="os-boot__bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div style={{ width: `${pct}%`, background: accent }} />
        </div>
      </div>
      <div className="os-boot__footer">
        <span>{t("os.boot.hint")}</span>
        <button type="button" className="os-boot__skip" onClick={onDone} autoFocus>
          {t("os.boot.skip")}
        </button>
      </div>
    </div>
  );
}
