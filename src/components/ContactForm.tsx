"use client";

import { FormEvent, useState } from "react";
import { services } from "./StudioSections";
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
  if (state === "sent") return <div className="form-message" role="status"><h2>Your requirement is with us.</h2><p>We will review it and reply using the contact details you provided.</p></div>;
  return (
    <form className="contact-form" onSubmit={submit}>
      <label><span>Your name</span><input name="name" autoComplete="name" required placeholder="Name" /></label>
      <label><span>Email address</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
      <label><span>What kind of build?</span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
      <label className="contact-form__wide"><span>What needs to change?</span><textarea name="message" required rows={6} placeholder="Tell us where work slows down, what needs to connect, or what you want to build." /></label>
      {state === "error" && <p className="form-error" role="alert">The form could not be sent. Please email teamcodizzz@gmail.com and we will take it from there.</p>}
      <button className="button button--solid contact-form__wide" disabled={state === "loading"}>
        {state === "loading" ? "Sending requirement…" : <>Send requirement <ArrowIcon /></>}
      </button>
    </form>
  );
}
