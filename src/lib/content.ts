import "server-only";
import { createClient } from "@supabase/supabase-js";
import { careerRoles as fallbackCareerRoles } from "@/data/careers";
import { services as fallbackServices } from "@/data/services";
import { teamMembers as fallbackTeamMembers } from "@/data/team";
import type { CareerRole, ServiceRecord, TeamMember } from "@/types/content";
import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from "./supabase/config";

function publicClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(supabaseUrl, supabasePublishableKey, { auth: { persistSession: false } });
}

function teamImageUrl(path: string) {
  if (!path || path.startsWith("/") || /^https?:\/\//.test(path)) return path;
  return `${supabaseUrl}/storage/v1/object/public/team-images/${path}`;
}

function serviceIconUrl(path: string) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${supabaseUrl}/storage/v1/object/public/service-icons/${path}`;
}

export async function getServices(): Promise<ServiceRecord[]> {
  const client = publicClient();
  if (!client) return fallbackServices;
  const { data, error } = await client.from("services").select("*").eq("published", true).order("position");
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id, slug: row.slug, iconKey: row.icon_key, iconPath: row.icon_path ?? "", icon: serviceIconUrl(row.icon_path ?? ""), title: row.title, short: row.summary,
    position: row.position, published: row.published, updatedAt: row.updated_at,
  }));
}

export async function getCareerRoles(): Promise<CareerRole[]> {
  const client = publicClient();
  if (!client) return fallbackCareerRoles;
  const { data, error } = await client.from("career_roles").select("*").eq("published", true).order("position");
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id, slug: row.slug, title: row.title, focus: row.focus, description: row.description,
    position: row.position, published: row.published, updatedAt: row.updated_at,
  }));
}

export async function getCareerRole(slug?: string) {
  if (!slug) return undefined;
  return (await getCareerRoles()).find((role) => role.slug === slug);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = publicClient();
  if (!client) return fallbackTeamMembers;
  const { data, error } = await client.from("team_members").select("*").eq("published", true).order("position");
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id, slug: row.slug, name: row.name, role: row.role, imagePath: row.image_path ?? "",
    image: teamImageUrl(row.image_path ?? ""), summary: row.summary, skills: row.skills ?? [],
    linkedinUrl: row.linkedin_url ?? "", xUrl: row.x_url ?? "", position: row.position,
    published: row.published, updatedAt: row.updated_at,
  }));
}
