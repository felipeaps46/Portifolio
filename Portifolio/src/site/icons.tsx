type P = { size?: number };

export function PlayIcon({ size = 24 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon({ size = 24 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" fill="currentColor" />
    </svg>
  );
}

export function ListIcon({ size = 22 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.4" fill="none" />
    </svg>
  );
}

export function GridIcon({ size = 22 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7.5" height="7.5" fill="currentColor" />
      <rect x="13.5" y="3" width="7.5" height="7.5" fill="currentColor" />
      <rect x="3" y="13.5" width="7.5" height="7.5" fill="currentColor" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" fill="currentColor" />
    </svg>
  );
}

export function PlusIcon({ size = 28 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function ArrowIcon({ size = 28 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" fill="none" />
    </svg>
  );
}

export function CloseIcon({ size = 22 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.2" fill="none" />
    </svg>
  );
}
