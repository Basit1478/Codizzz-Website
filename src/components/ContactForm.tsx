"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { ArrowIcon } from "./StudioIcons";

const COOLDOWN_MS = 5 * 60 * 1000;
const COOLDOWN_KEY = "codizzz-contact-cooldown-until";

function formatRemaining(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(0);
  const [successOpen, setSuccessOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const currentTime = Date.now();
    setNow(currentTime);
    try {
      const stored = Number(window.localStorage.getItem(COOLDOWN_KEY));
      if (Number.isFinite(stored) && stored > currentTime) setCooldownUntil(stored);
      else window.localStorage.removeItem(COOLDOWN_KEY);
    } catch {
      // The server still enforces the cooldown when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    if (cooldownUntil <= Date.now()) return;
    const timer = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      if (currentTime >= cooldownUntil) {
        setCooldownUntil(0);
        try { window.localStorage.removeItem(COOLDOWN_KEY); } catch { /* Storage can be unavailable. */ }
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (successOpen && !dialog.open) dialog.showModal();
    if (!successOpen && dialog.open) dialog.close();
  }, [successOpen]);

  const remaining = Math.max(0, cooldownUntil - now);
  const coolingDown = remaining > 0;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (coolingDown) return;
    const formElement = event.currentTarget;
    setState("loading");
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      const result = await response.json().catch(() => ({}));
      if (response.status === 429) {
        const retryAfter = typeof result.retryAfter === "number" ? result.retryAfter * 1000 : COOLDOWN_MS;
        const until = Date.now() + retryAfter;
        setNow(Date.now());
        setCooldownUntil(until);
        try { window.localStorage.setItem(COOLDOWN_KEY, String(until)); } catch { /* Server enforcement remains active. */ }
        setState("idle");
        return;
      }
      if (!response.ok) throw new Error();
      const until = Date.now() + COOLDOWN_MS;
      setNow(Date.now());
      setCooldownUntil(until);
      try { window.localStorage.setItem(COOLDOWN_KEY, String(until)); } catch { /* Server enforcement remains active. */ }
      formElement.reset();
      setState("idle");
      setSuccessOpen(true);
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <form className="contact-form" onSubmit={submit}>
        <fieldset disabled={state === "loading" || coolingDown}>
          <label><span>Name</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
          <label><span>Company <small>Optional</small></span><input name="company" autoComplete="organization" maxLength={160} placeholder="Company name" /></label>
          <label><span>What kind of build?</span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
          <label><span>What can we help you with?</span><textarea name="message" required maxLength={5000} rows={5} placeholder="Tell us where work slows down, what needs to connect, or what you want to build." /></label>
        </fieldset>
        {state === "error" && <p className="form-error" role="alert">The form could not be sent. Email <a href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com</a> or <a href="https://wa.me/923703168969" target="_blank" rel="noreferrer">message us on WhatsApp</a>.</p>}
        {coolingDown && <p className="form-cooldown contact-form__wide" role="status">Requirement received. You can send another in <strong>{formatRemaining(remaining)}</strong>.</p>}
        <button className="button button--solid" disabled={state === "loading" || coolingDown}>
          {state === "loading" ? "Sending requirement…" : coolingDown ? `Send again in ${formatRemaining(remaining)}` : <>Send requirement <ArrowIcon /></>}
        </button>
        <p className="contact-form__delivery">Your information is used only to respond to your request. Submissions go to <a href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com</a>.</p>
      </form>

      <dialog ref={dialogRef} className="success-dialog" onClose={() => setSuccessOpen(false)} aria-labelledby="success-title">
        <div className="success-dialog__mark" aria-hidden="true">
          <svg viewBox="0 0 32 32"><path d="m8 16.5 5.2 5L24 10.8" /></svg>
        </div>
        <h2 id="success-title">Requirement received.</h2>
        <p>Your message has been sent to Codizzz. We will reply to the email address you provided.</p>
        <p className="success-dialog__cooldown">Another requirement can be sent in <strong>{formatRemaining(remaining)}</strong>.</p>
        <button className="button button--solid" type="button" onClick={() => setSuccessOpen(false)}>Done</button>
      </dialog>
    </>
  );
}
