import Link from "next/link";
import { redirect } from "next/navigation";
import AdminResetPasswordForm from "@/components/admin/AdminResetPasswordForm";
import BrandMark from "@/components/BrandMark";
import { adminEmail } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminResetPasswordPage() {
  const supabase = createSupabaseServerClient();
  if (!supabase) redirect("/admin/login?recovery=failed");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== adminEmail) {
    if (user) await supabase.auth.signOut();
    redirect("/admin/login?recovery=failed");
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <div className="admin-login-panel__brand"><BrandMark /><span>New credentials</span></div>
        <div><h1>Set a new password.</h1><p>Use at least 12 characters. After the update, all active sessions will be signed out.</p></div>
        <AdminResetPasswordForm />
        <Link className="admin-back-link" href="/admin/login">Cancel and return to sign in</Link>
      </section>
      <aside className="admin-login-aside" aria-hidden="true"><span>Private</span><span>Strong</span><span>Fresh</span><strong>Protect the control desk.</strong></aside>
    </main>
  );
}
