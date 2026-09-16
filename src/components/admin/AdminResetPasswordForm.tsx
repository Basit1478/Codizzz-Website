"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminResetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");
    if (password.length < 12) {
      setStatus("error");
      setMessage("Use at least 12 characters for the new password.");
      return;
    }
    if (password !== confirmation) {
      setStatus("error");
      setMessage("The two passwords do not match.");
      return;
    }
    setStatus("loading");
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setMessage("The password could not be updated. The recovery link may have expired; request a new one.");
      return;
    }
    await supabase.auth.signOut({ scope: "global" });
    router.replace("/admin/login?password=updated");
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <label><span>New password</span><input name="password" type="password" autoComplete="new-password" minLength={12} required /></label>
      <label><span>Confirm new password</span><input name="confirmation" type="password" autoComplete="new-password" minLength={12} required /></label>
      {status === "error" && <p className="admin-form-message is-error" role="alert">{message}</p>}
      <button className="admin-primary-action" disabled={status === "loading"}>{status === "loading" ? "Updating…" : "Set new password"}</button>
    </form>
  );
}
