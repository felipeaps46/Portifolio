import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function useClock(): string {
  const [time, setTime] = useState(() => formatTime(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(new Date())), 10_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
