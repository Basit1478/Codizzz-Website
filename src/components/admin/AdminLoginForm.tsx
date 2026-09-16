"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginForm({ configured, defaultEmail }: { configured: boolean; defaultEmail: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    setStatus("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) });
    if (error) {
      setStatus("error");
      setMessage("Email or password is incorrect.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      {!configured && <p className="admin-notice" role="status">Add the Supabase publishable key to enable secure sign-in.</p>}
      <label><span>Email</span><input name="email" type="email" autoComplete="username" defaultValue={defaultEmail} required disabled={!configured} /></label>
      <label><span>Password</span><input name="password" type="password" autoComplete="current-password" required disabled={!configured} /></label>
      {status === "error" && <p className="admin-form-message is-error" role="alert">{message}</p>}
      <button className="admin-primary-action" disabled={!configured || status === "loading"}>{status === "loading" ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
