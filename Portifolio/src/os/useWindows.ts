import { useCallback, useRef, useState } from "react";
import { APP_ORDER, APP_WIDTH, TASKBAR_HEIGHT, type AppId } from "./config";

export type WinState = { x: number; y: number; z: number; open: boolean; min: boolean };
export type Wins = Record<AppId, WinState>;

function initialWins(): Wins {
  const vw = window.innerWidth;
  const vh = window.innerHeight - TASKBAR_HEIGHT;
  const wins = {} as Wins;
  APP_ORDER.forEach((id, i) => {
    const w = APP_WIDTH[id];
    wins[id] = {
      x: Math.max(110, Math.round((vw - w) / 2 + (i - 5) * 26)),
      y: Math.max(16, Math.min(vh - 320, 30 + i * 18)),
      z: 1,
      open: false,
      min: false,
    };
  });
  // Projetos à esquerda e boas-vindas à direita, como no protótipo.
  wins.projects = { ...wins.projects, x: Math.max(110, Math.round(vw * 0.1)), y: 36, open: true, z: 9 };
  wins.welcome = {
    ...wins.welcome,
    x: Math.max(110, Math.min(vw - APP_WIDTH.welcome - 24, Math.round(vw * 0.56))),
    y: Math.max(36, Math.round(vh * 0.28)),
    open: true,
    z: 10,
  };
  return wins;
}

export function useWindows() {
  const [wins, setWins] = useState<Wins>(initialWins);
  const [active, setActive] = useState<AppId | null>("welcome");
  const zTop = useRef(10);

  const patch = useCallback((id: AppId, change: Partial<WinState>) => {
    setWins((prev) => ({ ...prev, [id]: { ...prev[id], ...change } }));
  }, []);

  const focus = useCallback(
    (id: AppId) => {
      setActive(id);
      setWins((prev) => {
        if (prev[id].z === zTop.current) return prev;
        zTop.current += 1;
        return { ...prev, [id]: { ...prev[id], z: zTop.current } };
      });
    },
    [],
  );

  const open = useCallback(
    (id: AppId) => {
      zTop.current += 1;
      patch(id, { open: true, min: false, z: zTop.current });
      setActive(id);
    },
    [patch],
  );

  const close = useCallback(
    (id: AppId) => {
      patch(id, { open: false, min: false });
      setActive((a) => (a === id ? null : a));
    },
    [patch],
  );

  const minimize = useCallback(
    (id: AppId) => {
      patch(id, { min: true });
      setActive((a) => (a === id ? null : a));
    },
    [patch],
  );

  const move = useCallback((id: AppId, x: number, y: number) => patch(id, { x, y }), [patch]);

  return { wins, active, open, close, minimize, focus, move };
}
