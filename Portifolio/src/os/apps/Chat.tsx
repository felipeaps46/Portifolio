import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { ask } from "../../api/chatApi";

// Mesmo prompt usado pelo chat anterior; o backend (LangChain) completa {question} e {context}.
const PROMPT = `You are an AI assistant designed to answer questions about Felipe based on the provided context. Never mention anything negative about Felipe, and maintain a professional tone. If the answer is not in the context, say you do not know. Keep your answer concise (maximum three sentences) and only use information relevant to Felipe. Answer in the same language as the question.

  Question: {question}
  Context: {context}
  Answer:`;

type Msg = { id: number; me: boolean; text: string; pending?: boolean };

export function Chat() {
  const { t } = useTranslation();
  const [msgs, setMsgs] = useState<Msg[]>(() => [{ id: 0, me: false, text: t("chat.mensagemInicial") }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const suggestions = t("os.chat.suggestions", { returnObjects: true }) as string[];

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const send = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    const userId = nextId.current++;
    const botId = nextId.current++;
    setMsgs((m) => [...m, { id: userId, me: true, text: q }, { id: botId, me: false, text: t("os.chat.typing"), pending: true }]);
    setDraft("");
    setBusy(true);
    let answer: string;
    try {
      answer = (await ask(q, PROMPT)) || t("os.chat.error");
    } catch {
      answer = t("os.chat.error");
    }
    setMsgs((m) => m.map((x) => (x.id === botId ? { ...x, text: answer, pending: false } : x)));
    setBusy(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(draft);
  };

  return (
    <div className="os-chat">
      <div className="os-inset os-chat__list" ref={listRef} aria-live="polite">
        {msgs.map((m) => (
          <div key={m.id} className={`os-msg${m.me ? " os-msg--me" : ""}`}>
            <div className="os-msg__who">{m.me ? t("os.chat.you") : t("os.chat.bot")}</div>
            <div className={`os-msg__bubble${m.pending ? " os-msg__bubble--pending" : ""}`}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="os-chat__suggestions">
        {suggestions.map((s) => (
          <button key={s} type="button" className="os-btn os-btn--small" disabled={busy} onClick={() => void send(s)}>
            {s}
          </button>
        ))}
      </div>
      <form className="os-chat__form" onSubmit={onSubmit}>
        <label htmlFor="os-chat-input" className="os-sr-only">
          {t("os.chat.label")}
        </label>
        <input
          id="os-chat-input"
          className="os-inset os-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t("chat.placeholder")}
          autoComplete="off"
        />
        <button type="submit" className="os-btn" disabled={busy || !draft.trim()}>
          {t("os.chat.send")}
        </button>
      </form>
    </div>
  );
}
