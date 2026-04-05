import { useState } from "react";
import { Button } from "./Button";
import { EMAIL } from "../constants/contact";

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`;

type Status = "idle" | "sending" | "success" | "error";
type Lang = "fr" | "en";

const COPY = {
  fr: {
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "Votre email",
    message: "Message",
    messagePlaceholder: "Je veux moderniser mon site pour…",
    srSuccess: "Message envoyé.",
    srError: "Erreur ou champs incomplets.",
    success: "Message envoyé. Je vous réponds sous 24–48h.",
    errorPrefix: "Merci de remplir tous les champs, ou écrivez-moi directement à",
    send: "Envoyer",
    sending: "Envoi…",
    direct: "Ou écrivez-moi directement",
    subjectPrefix: "Contact Webmo",
  },
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "Your email",
    message: "Message",
    messagePlaceholder: "I want to modernize my website to…",
    srSuccess: "Message sent.",
    srError: "Error or missing fields.",
    success: "Message sent. I will get back to you within 24–48h.",
    errorPrefix: "Please fill in all fields, or write to me directly at",
    send: "Send",
    sending: "Sending…",
    direct: "Or write to me directly",
    subjectPrefix: "Webmo contact",
  },
} as const;

export function ContactForm({ lang = "fr" }: { lang?: Lang }) {
  const [status, setStatus] = useState<Status>("idle");
  const t = COPY[lang];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `${t.subjectPrefix} — ${name}`,
          _replyto: email,
        }),
      });

      if (!res.ok) throw new Error("FormSubmit error");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/[0.12] bg-white/[0.05] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/80">
          {t.name}
          <input
            className="h-11 rounded-xl border border-white/[0.1] bg-white/[0.06] px-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md placeholder:text-white/35 focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            placeholder={t.namePlaceholder}
            name="name"
            autoComplete="name"
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-white/80">
          {t.email}
          <input
            className="h-11 rounded-xl border border-white/[0.1] bg-white/[0.06] px-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md placeholder:text-white/35 focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            placeholder={t.emailPlaceholder}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm text-white/80">
        {t.message}
        <textarea
          className="min-h-32 rounded-xl border border-white/[0.1] bg-white/[0.06] px-3 py-3 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md placeholder:text-white/35 focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          placeholder={t.messagePlaceholder}
          name="message"
          required
        />
      </label>

      <p className="sr-only" aria-live="polite">
        {status === "success" && t.srSuccess}
        {status === "error" && t.srError}
      </p>

      {status === "success" ? (
        <p className="mt-4 rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm text-brand-300">
          {t.success}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {t.errorPrefix}{" "}
          <a className="font-semibold underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.send}
        </Button>
        <p className="text-xs text-white/55">
          {t.direct}{" "}
          <a className="font-semibold text-white hover:underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
