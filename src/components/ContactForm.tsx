"use client";

import { FormEvent, useState } from "react";
import { services } from "@/data/services";
import { ArrowIcon } from "./StudioIcons";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      if (!response.ok) throw new Error();
      setState("sent");
    } catch {
      setState("error");
    }
  }
  if (state === "sent") return <div className="form-message" role="status"><h2>Your requirement is with us.</h2><p>It has been sent to teamcodizzz@gmail.com. We will review it and reply to the email address you provided.</p></div>;
  return (
    <form className="contact-form" onSubmit={submit}>
      <label><span>Your name</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Name" /></label>
      <label><span>Email address</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
      <label><span>What kind of build?</span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
      <label className="contact-form__wide"><span>What needs to change?</span><textarea name="message" required maxLength={5000} rows={6} placeholder="Tell us where work slows down, what needs to connect, or what you want to build." /></label>
      {state === "error" && <p className="form-error" role="alert">The form could not be sent. Email <a href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com</a> or <a href="https://wa.me/923332011256" target="_blank" rel="noreferrer">message us on WhatsApp</a>.</p>}
      <button className="button button--solid contact-form__wide" disabled={state === "loading"}>
        {state === "loading" ? "Sending requirement…" : <>Send requirement <ArrowIcon /></>}
      </button>
      <p className="contact-form__delivery contact-form__wide">Form submissions go to <a href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com</a></p>
    </form>
  );
}
