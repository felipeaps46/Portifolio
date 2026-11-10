// O armazenamento do navegador pode estar bloqueado (aba anônima, cookies desativados),
// então toda leitura e escrita é protegida e o site funciona sem ele.

export function readStorage(key: string, session = false): string | null {
  try {
    return (session ? window.sessionStorage : window.localStorage).getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string, session = false): void {
  try {
    (session ? window.sessionStorage : window.localStorage).setItem(key, value);
  } catch {
    /* armazenamento indisponível: ignora */
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  const raw = readStorage(key);
  if (!raw) return fallback;
  try {
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}
