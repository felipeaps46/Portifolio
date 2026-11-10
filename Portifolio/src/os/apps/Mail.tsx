import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { sendEmail } from "../../api/email.Api";
import { userData } from "../../data/userData";

type Status = "idle" | "sending" | "sent" | "error" | "required";

export function Mail() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("required");
      return;
    }
    setStatus("sending");
    try {
      const res = await sendEmail(form.name, form.email, form.phone || "-", form.message);
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const statusText =
    status === "idle" ? "" : status === "sending" ? t("os.mail.sending") : t(`os.mail.${status}`);

  return (
    <form className="os-pad os-stack os-mail" onSubmit={onSubmit} noValidate>
      <div className="os-field">
        <span className="os-field__label">{t("os.mail.to")}</span>
        <span className="os-inset os-field__static">{userData.links?.email}</span>
      </div>
      <div className="os-field">
        <label className="os-field__label" htmlFor="mail-name">{t("os.mail.name")}</label>
        <input id="mail-name" className="os-inset os-input" value={form.name} onChange={set("name")} placeholder={t("os.mail.namePh")} autoComplete="name" required />
      </div>
      <div className="os-field">
        <label className="os-field__label" htmlFor="mail-email">{t("os.mail.email")}</label>
        <input id="mail-email" className="os-inset os-input" type="email" value={form.email} onChange={set("email")} placeholder={t("os.mail.emailPh")} autoComplete="email" required />
      </div>
      <div className="os-field">
        <label className="os-field__label" htmlFor="mail-phone">{t("os.mail.phone")}</label>
        <input id="mail-phone" className="os-inset os-input" type="tel" value={form.phone} onChange={set("phone")} placeholder={t("os.mail.phonePh")} autoComplete="tel" />
      </div>
      <label htmlFor="mail-msg" className="os-sr-only">{t("os.mail.message")}</label>
      <textarea id="mail-msg" className="os-inset os-textarea" rows={6} value={form.message} onChange={set("message")} placeholder={t("os.mail.messagePh")} required />
      <div className="os-mail__footer">
        <span className="os-links">
          <a href={userData.links?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={userData.links?.github} target="_blank" rel="noreferrer">GitHub</a>
        </span>
        <button type="submit" className="os-btn" disabled={status === "sending"}>
          {t("os.mail.send")}
        </button>
      </div>
      <p className={`os-mail__status os-mail__status--${status}`} role="status">{statusText}</p>
    </form>
  );
}
