import Link from "next/link";
import AdminForgotPasswordForm from "@/components/admin/AdminForgotPasswordForm";
import BrandMark from "@/components/BrandMark";
import { adminEmail, isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminForgotPasswordPage() {
  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <div className="admin-login-panel__brand"><BrandMark /><span>Account recovery</span></div>
        <div><h1>Reset admin access.</h1><p>We will send a secure, single-use password reset link to the approved Codizzz admin email.</p></div>
        <AdminForgotPasswordForm email={adminEmail} configured={isSupabaseConfigured} />
        <Link className="admin-back-link" href="/admin/login">Return to sign in</Link>
      </section>
      <aside className="admin-login-aside" aria-hidden="true"><span>Secure</span><span>Verified</span><span>Controlled</span><strong>One approved account.</strong></aside>
    </main>
  );
}
