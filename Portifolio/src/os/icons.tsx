import type { ReactElement } from "react";

const S = { stroke: "#1B1A17", strokeWidth: 2 };

export type DesktopIconId = "about" | "projects" | "exp" | "skills" | "chat" | "mail" | "cv" | "look" | "trash";

export function DesktopIcon({ id }: { id: DesktopIconId }) {
  return ICONS[id];
}

const ICONS: Record<DesktopIconId, ReactElement> = {
  about: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <rect x="8" y="4" width="28" height="36" fill="#FFFDF7" {...S} />
      <circle cx="22" cy="16" r="5" fill="#F2B544" {...S} />
      <path d="M13 32c2-6 16-6 18 0" fill="none" {...S} />
    </svg>
  ),
  projects: <FolderIcon size={44} />,
  exp: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <rect x="4" y="6" width="36" height="30" fill="#1B1A17" {...S} />
      <path d="M10 15l5 4-5 4M18 25h10" fill="none" stroke="#7CE08A" strokeWidth="2.5" />
    </svg>
  ),
  skills: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <rect x="4" y="6" width="36" height="32" fill="#E4DFD3" {...S} />
      <path d="M12 14v18M22 14v18M32 14v18" {...S} />
      <rect x="8" y="18" width="8" height="5" fill="#B8481A" />
      <rect x="18" y="25" width="8" height="5" fill="#1D3F8F" />
      <rect x="28" y="16" width="8" height="5" fill="#2F7D4F" />
    </svg>
  ),
  chat: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <path d="M5 7h34v22H20l-9 8v-8H5z" fill="#FFFDF7" {...S} />
      <circle cx="15" cy="18" r="2" fill="#1B1A17" />
      <circle cx="22" cy="18" r="2" fill="#1B1A17" />
      <circle cx="29" cy="18" r="2" fill="#1B1A17" />
    </svg>
  ),
  mail: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <rect x="4" y="10" width="36" height="24" fill="#FFFDF7" {...S} />
      <path d="M4 10l18 14 18-14" fill="none" {...S} />
    </svg>
  ),
  cv: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <path d="M9 4h19l8 8v28H9z" fill="#FFFDF7" {...S} />
      <rect x="12" y="22" width="20" height="10" fill="#B8481A" />
      <text x="22" y="30" fontSize="8" fontFamily="monospace" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
        PDF
      </text>
    </svg>
  ),
  look: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <rect x="4" y="6" width="36" height="26" fill="#2E3A6B" {...S} />
      <path d="M4 26l10-8 8 6 6-4 12 8" fill="none" stroke="#F2B544" strokeWidth="2" />
      <circle cx="31" cy="13" r="3" fill="#F2B544" />
      <path d="M16 32v6h12v-6" fill="#C9C3B5" {...S} />
    </svg>
  ),
  trash: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <path d="M10 12h24l-3 28H13z" fill="#C9C3B5" {...S} />
      <path d="M7 12h30M17 7h10v5M17 18v16M22 18v16M27 18v16" fill="none" {...S} />
    </svg>
  ),
};

export function FolderIcon({ size = 34, fill = "#F2B544" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
      <path d="M4 10h14l4 5h18v23H4z" fill={fill} {...S} />
      <path d="M4 18h36" {...S} />
    </svg>
  );
}

export function PlayIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 1l9 5-9 5z" fill="currentColor" />
    </svg>
  );
}

export function StartLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <rect x="1" y="1" width="7" height="7" fill="#B8481A" />
      <rect x="10" y="1" width="7" height="7" fill="#F2B544" />
      <rect x="1" y="10" width="7" height="7" fill="#1D3F8F" />
      <rect x="10" y="10" width="7" height="7" fill="#2F7D4F" />
    </svg>
  );
}

export function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 7h3l4-4v12l-4-4H2z" fill="#1B1A17" />
      {on ? (
        <path d="M12 6c1.2 1.6 1.2 4.4 0 6M14.5 4c2.2 2.8 2.2 7.2 0 10" fill="none" stroke="#1B1A17" strokeWidth="1.6" />
      ) : (
        <path d="M12 6l5 6M17 6l-5 6" stroke="#B8481A" strokeWidth="1.8" />
      )}
    </svg>
  );
}
