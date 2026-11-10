export type AppId =
  | "welcome"
  | "about"
  | "projects"
  | "exp"
  | "skills"
  | "chat"
  | "mail"
  | "trash"
  | "video"
  | "look";

export const APP_ORDER: AppId[] = [
  "welcome",
  "projects",
  "about",
  "exp",
  "skills",
  "chat",
  "mail",
  "trash",
  "video",
  "look",
];

/** Largura padrão de cada janela, em px (no celular as janelas ocupam a tela). */
export const APP_WIDTH: Record<AppId, number> = {
  welcome: 440,
  about: 600,
  projects: 800,
  exp: 620,
  skills: 560,
  chat: 440,
  mail: 480,
  trash: 460,
  video: 820,
  look: 480,
};

export type WallpaperId = "dots" | "grid" | "bands" | "plain";

export const WALLPAPERS: { id: WallpaperId; image: string; size: string; thumb: string }[] = [
  { id: "dots", image: "radial-gradient(#FFFFFF14 1px, transparent 1.5px)", size: "6px 6px", thumb: "6px 6px" },
  {
    id: "grid",
    image: "linear-gradient(#FFFFFF14 1px, transparent 1px), linear-gradient(90deg, #FFFFFF14 1px, transparent 1px)",
    size: "32px 32px",
    thumb: "10px 10px",
  },
  {
    id: "bands",
    image:
      "linear-gradient(180deg, transparent 0 56%, #F2B54433 56% 62%, transparent 62% 67%, #B8481A33 67% 73%, transparent 73% 78%, #6B3FA033 78% 85%, transparent 85%)",
    size: "100% 100%",
    thumb: "100% 100%",
  },
  { id: "plain", image: "none", size: "auto", thumb: "auto" },
];

export const DESKTOP_COLORS = [
  { hex: "#2E3A6B", key: "night" },
  { hex: "#2F5D50", key: "moss" },
  { hex: "#5A3E5D", key: "plum" },
  { hex: "#3B3A36", key: "graphite" },
] as const;

export const ACCENT_COLORS = [
  { hex: "#B8481A", key: "rust" },
  { hex: "#1D3F8F", key: "blue" },
  { hex: "#2F7D4F", key: "green" },
  { hex: "#6B3FA0", key: "purple" },
] as const;

export type Look = { wallpaper: WallpaperId; desktop: string; accent: string };

export const DEFAULT_LOOK: Look = { wallpaper: "dots", desktop: "#2E3A6B", accent: "#B8481A" };

export const TRASH_ITEMS = [
  { name: "portfolio_v1_rolagem_infinita.html", year: "2025" },
  { name: "tema_missao_espacial.fig", year: "2026" },
  { name: "tema_jornal.fig", year: "2026" },
];

export const TASKBAR_HEIGHT = 46;
export const MOBILE_QUERY = "(max-width: 760px)";

export const STORAGE = {
  booted: "felipeos.booted",
  look: "felipeos.look",
  sessionPing: "felipeos.ping",
};
