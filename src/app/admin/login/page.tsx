import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import BrandMark from "@/components/BrandMark";
import { adminEmail, isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminLoginPage({ searchParams }: { searchParams?: { password?: string; recovery?: string } }) {
  const supabase = createSupabaseServerClient();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email?.toLowerCase() === adminEmail) redirect("/admin");
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <div className="admin-login-panel__brand"><BrandMark /><span>Content administration</span></div>
        <div><h1>Manage what the website publishes.</h1><p>Sign in to update services, career roles and team members without editing code.</p></div>
        <AdminLoginForm configured={isSupabaseConfigured} defaultEmail={adminEmail} notice={searchParams?.password === "updated" ? "Password updated. Sign in with your new password." : searchParams?.recovery === "failed" ? "That recovery link is invalid or expired. Request a new one." : ""} />
        <a className="admin-back-link" href="/">Return to website</a>
      </section>
      <aside className="admin-login-aside" aria-hidden="true"><span>Services</span><span>Careers</span><span>Team</span><strong>One controlled source.</strong></aside>
    </main>
  );
}
