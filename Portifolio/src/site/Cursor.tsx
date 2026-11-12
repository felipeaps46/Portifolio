import { useEffect, useRef } from "react";

/**
 * Bolinha que segue o mouse com um leve atraso.
 * - data-cursor="media": cresce e inverte em preto e branco o que está atrás.
 * - data-cursor="dark": fica preta (áreas de fundo claro).
 * - data-cursor="light": volta a ser branca dentro de uma área clara.
 * Só aparece com mouse e quando o sistema não pede menos movimento (ver CSS).
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mx = -200, my = -200, cx = -200, cy = -200;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      el.classList.add("on");
      const zone = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      const mode = zone?.getAttribute("data-cursor") ?? "";
      el.classList.toggle("media", mode === "media");
      el.classList.toggle("dark", mode === "dark");
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) el.classList.remove("on");
    };
    const loop = () => {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__dot" />
    </div>
  );
}
