"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminForgotPasswordForm({ email, configured }: { email: string; configured: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    setStatus("loading");
    setMessage("");
    const redirectTo = `${window.location.origin}/auth/callback?next=/admin/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      setStatus("error");
      setMessage(error.status === 429 ? "Too many requests. Wait a few minutes, then try again." : "The reset email could not be sent. Check Supabase email settings and try again.");
      return;
    }
    setStatus("sent");
    setMessage(`A secure reset link was sent to ${email}. Check the inbox and spam folder.`);
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      {!configured && <p className="admin-notice" role="status">Add the Supabase publishable key to enable password recovery.</p>}
      <label><span>Admin email</span><input type="email" value={email} readOnly disabled /></label>
      {message && <p className={`admin-form-message${status === "sent" ? " is-success" : " is-error"}`} role={status === "sent" ? "status" : "alert"}>{message}</p>}
      <button className="admin-primary-action" disabled={!configured || status === "loading" || status === "sent"}>{status === "loading" ? "Sending…" : status === "sent" ? "Reset link sent" : "Send reset link"}</button>
    </form>
  );
}
