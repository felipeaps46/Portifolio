// src/api/chat.ts

import  API_URL from "./apiURL";

export async function ask(
  question: string,
  prompt?: string,
  signal?: AbortSignal
): Promise<string> {
  const res = await fetch(`${API_URL}/chat/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify({ question, prompt }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${errText ? "- " + errText : ""}`);
  }

  const data = await res.json();
  if (!data || typeof data.answer !== "string") {
    throw new Error("Resposta inválida do backend: campo 'answer' não encontrado.");
  }

  return data.answer;
}