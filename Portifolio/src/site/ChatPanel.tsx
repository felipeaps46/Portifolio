import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { ask } from "../api/chatApi";
import { CloseIcon } from "./icons";

// Prompt enviado ao backend (LangChain), que completa {question} e {context}.
const PROMPT = `You are an AI assistant designed to answer questions about Felipe based on the provided context. Never mention anything negative about Felipe, and maintain a professional tone. If the answer is not in the context, say you do not know. Keep your answer concise (maximum three sentences) and only use information relevant to Felipe. Answer in the same language as the question.

  Question: {question}
  Context: {context}
  Answer:`;

type Msg = { id: number; me: boolean; text: string; pending?: boolean };

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const suggestions = t("site.chat.suggestions", { returnObjects: true }) as string[];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      inputRef.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const send = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    const userId = nextId.current++;
    const botId = nextId.current++;
    setMsgs((m) => [...m, { id: userId, me: true, text: q }, { id: botId, me: false, text: t("site.chat.typing"), pending: true }]);
    setDraft("");
    setBusy(true);
    let answer: string;
    try {
      answer = (await ask(q, PROMPT)) || t("site.chat.error");
    } catch {
      answer = t("site.chat.error");
    }
    setMsgs((m) => m.map((x) => (x.id === botId ? { ...x, text: answer, pending: false } : x)));
    setBusy(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(draft);
  };

  return (
    <dialog
      ref={ref}
      className="chat"
      aria-label={t("site.chat.title")}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="chat__box">
        <div className="chat__head">
          <span className="display chat__title">{t("site.chat.title")}<span className="loud-text">.</span></span>
          <button type="button" className="seg" onClick={onClose} aria-label={t("site.chat.close")}>
            <CloseIcon />
          </button>
        </div>

        <div className="chat__list" ref={listRef} aria-live="polite">
          <div className="msg">
            <span className="mono muted">{t("site.chat.bot")}</span>
            <p>{t("site.chat.intro")}</p>
          </div>
          {msgs.map((m) => (
            <div key={m.id} className={`msg${m.me ? " msg--me" : ""}${m.pending ? " msg--pending" : ""}`}>
              <span className="mono muted">{m.me ? t("site.chat.you") : t("site.chat.bot")}</span>
              <p>{m.text}</p>
            </div>
          ))}
        </div>

        <div className="chat__suggestions">
          {suggestions.map((s) => (
            <button key={s} type="button" className="chip chip--btn mono" disabled={busy} onClick={() => void send(s)}>
              {s}
            </button>
          ))}
        </div>

        <form className="chat__form" onSubmit={onSubmit}>
          <label htmlFor="chat-input" className="sr-only">{t("site.chat.label")}</label>
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t("site.chat.placeholder")}
            autoComplete="off"
          />
          <button type="submit" className="btn loud" disabled={busy || !draft.trim()}>{t("site.chat.send")}</button>
        </form>
      </div>
    </dialog>
  );
}
