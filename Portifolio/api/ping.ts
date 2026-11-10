// api/ping.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Defina PING_URL nas variáveis de ambiente do projeto Vercel (opcional).
// Fallback: sua API pública no Render + /health
const PING_URL =
  process.env.PING_URL ||
  'https://portifolio-backend-yq9i.onrender.com/health';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const resp = await fetch(PING_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'VercelCronPing/1.0',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const text = await resp.text();
    res.status(200).json({
      ok: resp.ok,
      status: resp.status,
      url: PING_URL,
      sample: text.slice(0, 200),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    clearTimeout(timeout);
    res.status(200).json({
      ok: false,
      url: PING_URL,
      error: String(error),
      timestamp: new Date().toISOString(),
    });
  }
}