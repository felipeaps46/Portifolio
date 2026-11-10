import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { TASKBAR_HEIGHT } from "./config";
import type { WinState } from "./useWindows";

type WindowProps = {
  title: string;
  label: string;
  width: number;
  state: WinState;
  active: boolean;
  accent: string;
  mobile: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMove: (x: number, y: number) => void;
  footer?: ReactNode;
  children: ReactNode;
};

export function Window(props: WindowProps) {
  const { t } = useTranslation();
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const { state, mobile } = props;

  if (!state.open || state.min) return null;

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    props.onFocus();
    if (mobile || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: state.x, oy: state.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - TASKBAR_HEIGHT - 34;
    const x = Math.min(maxX, Math.max(120 - props.width, d.ox + e.clientX - d.sx));
    const y = Math.min(maxY, Math.max(0, d.oy + e.clientY - d.sy));
    props.onMove(x, y);
  };

  const endDrag = () => {
    drag.current = null;
  };

  const style = mobile
    ? { zIndex: state.z }
    : { left: state.x, top: state.y, width: props.width, zIndex: state.z };

  return (
    <section
      className={`os-win os-bevel${mobile ? " os-win--mobile" : ""}`}
      aria-label={props.label}
      style={style}
      onPointerDown={props.onFocus}
    >
      <div
        className="os-titlebar"
        style={{ background: props.active ? props.accent : "#7A7468" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <span className="os-titlebar__text">{props.title}</span>
        <span className="os-titlebar__buttons">
          <button type="button" className="os-btn os-tb-btn" aria-label={t("os.window.minimize")} onClick={props.onMinimize}>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <rect x="1" y="9" width="10" height="2" fill="#1B1A17" />
            </svg>
          </button>
          <button type="button" className="os-btn os-tb-btn" aria-label={t("os.window.close")} onClick={props.onClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="#1B1A17" strokeWidth="2" />
            </svg>
          </button>
        </span>
      </div>
      <div className="os-win__body">{props.children}</div>
      {props.footer && <div className="os-win__footer">{props.footer}</div>}
    </section>
  );
}
