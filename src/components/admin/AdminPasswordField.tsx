"use client";

import Link from "next/link";
import { useId, useState } from "react";

type Props = {
  label: string;
  name: string;
  autoComplete: "current-password" | "new-password";
  disabled?: boolean;
  minLength?: number;
  forgotHref?: string;
};

export default function AdminPasswordField({ label, name, autoComplete, disabled = false, minLength, forgotHref }: Props) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <div className="admin-password-field">
      <label htmlFor={id}><span>{label}</span></label>
      <div className="admin-password-control">
        <input id={id} name={name} type={visible ? "text" : "password"} autoComplete={autoComplete} minLength={minLength} required disabled={disabled} />
        <button type="button" onClick={() => setVisible((value) => !value)} disabled={disabled} aria-controls={id} aria-pressed={visible} aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`} title={visible ? "Hide password" : "Show password"}>
          {visible ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.3A10.8 10.8 0 0 1 12 4c5.2 0 8.7 4.2 9.7 6.2a3.9 3.9 0 0 1 0 3.6 15 15 0 0 1-2.1 3M6.2 6.2a15.7 15.7 0 0 0-3.9 4 3.9 3.9 0 0 0 0 3.6C3.3 15.8 6.8 20 12 20c1.4 0 2.7-.3 3.8-.8" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.3 10.2C3.3 8.2 6.8 4 12 4s8.7 4.2 9.7 6.2a3.9 3.9 0 0 1 0 3.6C20.7 15.8 17.2 20 12 20S3.3 15.8 2.3 13.8a3.9 3.9 0 0 1 0-3.6Z" /><circle cx="12" cy="12" r="3" /></svg>
          )}
        </button>
      </div>
      {forgotHref && <Link className="admin-forgot-link" href={forgotHref}>Forgot password?</Link>}
    </div>
  );
}
