import { redirect } from "next/navigation";
import AdminContentDesk from "@/components/admin/AdminContentDesk";
import { careerRoles } from "@/data/careers";
import { services } from "@/data/services";
import { teamMembers } from "@/data/team";
import { adminEmail, isSupabaseConfigured, supabaseUrl } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CareerRole, ServiceRecord, TeamMember } from "@/types/content";

export const dynamic = "force-dynamic";

function imageUrl(path: string) {
  if (!path || path.startsWith("/") || /^https?:\/\//.test(path)) return path;
  return `${supabaseUrl}/storage/v1/object/public/team-images/${path}`;
}

function serviceIconUrl(path: string) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${supabaseUrl}/storage/v1/object/public/service-icons/${path}`;
}

export default async function AdminPage() {
  if (!isSupabaseConfigured) return <AdminContentDesk services={services} careers={careerRoles} team={teamMembers} userEmail="Setup required" readOnly />;
  const supabase = createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  if (user.email?.toLowerCase() !== adminEmail) return <main className="admin-access-denied"><h1>Access denied.</h1><p>This account is not approved to manage Codizzz content.</p><a href="/admin/login">Use the approved admin account</a></main>;

  const [serviceResult, careerResult, teamResult] = await Promise.all([
    supabase.from("services").select("*").order("position"),
    supabase.from("career_roles").select("*").order("position"),
    supabase.from("team_members").select("*").order("position"),
  ]);

  const hasSchemaError = serviceResult.error || careerResult.error || teamResult.error;
  if (hasSchemaError) return <AdminContentDesk services={services} careers={careerRoles} team={teamMembers} userEmail={user.email ?? adminEmail} readOnly />;

  const managedServices: ServiceRecord[] = (serviceResult.data ?? []).map((row) => ({ id: row.id, slug: row.slug, iconKey: row.icon_key, iconPath: row.icon_path ?? "", icon: serviceIconUrl(row.icon_path ?? ""), title: row.title, short: row.summary, position: row.position, published: row.published, updatedAt: row.updated_at }));
  const managedCareers: CareerRole[] = (careerResult.data ?? []).map((row) => ({ id: row.id, slug: row.slug, title: row.title, focus: row.focus, description: row.description, position: row.position, published: row.published, updatedAt: row.updated_at }));
  const managedTeam: TeamMember[] = (teamResult.data ?? []).map((row) => ({ id: row.id, slug: row.slug, name: row.name, role: row.role, imagePath: row.image_path ?? "", image: imageUrl(row.image_path ?? ""), summary: row.summary, skills: row.skills ?? [], linkedinUrl: row.linkedin_url ?? "", xUrl: row.x_url ?? "", position: row.position, published: row.published, updatedAt: row.updated_at }));

  return <AdminContentDesk services={managedServices} careers={managedCareers} team={managedTeam} userEmail={user.email ?? adminEmail} />;
}
