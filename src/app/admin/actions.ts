"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { adminEmail } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminActionResult = { ok: boolean; message: string };

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const iconKeys = new Set(["agent", "automation", "fte", "software", "mobile", "web"]);

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function position(form: FormData) {
  const value = Number(text(form, "position"));
  return Number.isInteger(value) && value >= 0 ? value : 0;
}

function socialUrl(value: string, hosts: string[]) {
  if (!value) return "";
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return url.protocol === "https:" && hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`)) ? url.toString() : null;
  } catch {
    return null;
  }
}

async function authorizedClient() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured yet." } as const;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== adminEmail) return { ok: false, error: "Your admin session has expired. Sign in again." } as const;
  return { ok: true, supabase } as const;
}

function refreshPublicContent() {
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  revalidatePath("/services");
  revalidatePath("/careers");
  revalidatePath("/team");
  revalidatePath("/contact");
}

export async function saveService(form: FormData): Promise<AdminActionResult> {
  const auth = await authorizedClient();
  if (!auth.ok) return { ok: false, message: auth.error };
  const id = text(form, "id");
  const slug = text(form, "slug").toLowerCase();
  const title = text(form, "title");
  const summary = text(form, "summary");
  const iconKey = text(form, "iconKey");
  const oldIconPath = text(form, "oldIconPath");
  let iconPath = form.get("removeCustomIcon") === "on" ? "" : oldIconPath;
  if (!slugPattern.test(slug)) return { ok: false, message: "Slug can use lowercase letters, numbers and hyphens only." };
  if (title.length < 2 || summary.length < 10 || !iconKeys.has(iconKey)) return { ok: false, message: "Complete the title, description and icon fields." };

  const customIcon = form.get("customIcon");
  if (customIcon instanceof File && customIcon.size > 0) {
    const allowedTypes = new Map([["image/svg+xml", "svg"], ["image/png", "png"], ["image/webp", "webp"]]);
    const extension = allowedTypes.get(customIcon.type);
    if (!extension || customIcon.size > 1024 * 1024) return { ok: false, message: "Upload an SVG, PNG or WebP icon under 1 MB." };
    iconPath = `${slug}/${randomUUID()}.${extension}`;
    const { error: uploadError } = await auth.supabase.storage.from("service-icons").upload(iconPath, customIcon, { contentType: customIcon.type, upsert: false });
    if (uploadError) return { ok: false, message: "Custom icon could not be uploaded. Run the service-icon migration if the bucket is not available yet." };
  }

  const payload = { slug, title, summary, icon_key: iconKey, icon_path: iconPath, position: position(form), published: form.get("published") === "on" };
  const query = id ? auth.supabase.from("services").update(payload).eq("id", id) : auth.supabase.from("services").insert(payload);
  const { data, error } = await query.select("id").maybeSingle();
  if (error || !data) {
    if (iconPath && iconPath !== oldIconPath) await auth.supabase.storage.from("service-icons").remove([iconPath]);
    if (error?.code === "23505") return { ok: false, message: "That service slug already exists." };
    if (error?.code === "42703" || error?.code === "PGRST204") return { ok: false, message: "Run the service-icon migration, then try again." };
    return { ok: false, message: data ? "Service could not be saved." : "This service no longer exists. Refresh the page and try again." };
  }
  let cleanupWarning = "";
  if (oldIconPath && iconPath !== oldIconPath) {
    const { error: cleanupError } = await auth.supabase.storage.from("service-icons").remove([oldIconPath]);
    if (cleanupError) cleanupWarning = " The service was saved, but the previous icon could not be cleaned up.";
  }
  refreshPublicContent();
  return { ok: true, message: `${id ? "Service updated." : "Service added."}${cleanupWarning}` };
}

export async function saveCareerRole(form: FormData): Promise<AdminActionResult> {
  const auth = await authorizedClient();
  if (!auth.ok) return { ok: false, message: auth.error };
  const id = text(form, "id");
  const slug = text(form, "slug").toLowerCase();
  const title = text(form, "title");
  const focus = text(form, "focus");
  const description = text(form, "description");
  if (!slugPattern.test(slug)) return { ok: false, message: "Slug can use lowercase letters, numbers and hyphens only." };
  if (title.length < 2 || focus.length < 2 || description.length < 10) return { ok: false, message: "Complete every role field before saving." };
  const payload = { slug, title, focus, description, position: position(form), published: form.get("published") === "on" };
  const query = id ? auth.supabase.from("career_roles").update(payload).eq("id", id) : auth.supabase.from("career_roles").insert(payload);
  const { data, error } = await query.select("id").maybeSingle();
  if (error) return { ok: false, message: error.code === "23505" ? "That role slug already exists." : "Role could not be saved." };
  if (!data) return { ok: false, message: "This role no longer exists. Refresh the page and try again." };
  refreshPublicContent();
  return { ok: true, message: id ? "Role updated." : "Role added." };
}

export async function saveTeamMember(form: FormData): Promise<AdminActionResult> {
  const auth = await authorizedClient();
  if (!auth.ok) return { ok: false, message: auth.error };
  const id = text(form, "id");
  const slug = text(form, "slug").toLowerCase();
  const name = text(form, "name");
  const role = text(form, "role");
  const summary = text(form, "summary");
  const oldImagePath = text(form, "oldImagePath");
  let imagePath = oldImagePath;
  if (!slugPattern.test(slug)) return { ok: false, message: "Slug can use lowercase letters, numbers and hyphens only." };
  if (name.length < 2 || role.length < 2 || summary.length < 10) return { ok: false, message: "Complete the name, role and bio fields." };

  const image = form.get("image");
  if (image instanceof File && image.size > 0) {
    if (image.size > 5 * 1024 * 1024 || !new Set(["image/jpeg", "image/png", "image/webp"]).has(image.type)) {
      return { ok: false, message: "Upload a JPG, PNG or WebP image under 5 MB." };
    }
    const extension = image.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    imagePath = `${slug}/${randomUUID()}.${extension}`;
    const { error: uploadError } = await auth.supabase.storage.from("team-images").upload(imagePath, image, { contentType: image.type, upsert: false });
    if (uploadError) return { ok: false, message: "Profile image could not be uploaded." };
  }

  const skills = text(form, "skills").split(",").map((skill) => skill.trim()).filter(Boolean).slice(0, 20);
  const published = form.get("published") === "on";
  const linkedinUrl = socialUrl(text(form, "linkedinUrl"), ["linkedin.com"]);
  const xUrl = socialUrl(text(form, "xUrl"), ["x.com", "twitter.com"]);
  if (linkedinUrl === null || xUrl === null) {
    if (imagePath && imagePath !== oldImagePath && !imagePath.startsWith("/")) await auth.supabase.storage.from("team-images").remove([imagePath]);
    return { ok: false, message: "Use valid HTTPS LinkedIn and X profile URLs." };
  }
  if (published && !imagePath) {
    return { ok: false, message: "Add a profile image before publishing this team member." };
  }
  const payload = {
    slug, name, role, summary, image_path: imagePath, skills,
    linkedin_url: linkedinUrl, x_url: xUrl,
    position: position(form), published,
  };
  const query = id ? auth.supabase.from("team_members").update(payload).eq("id", id) : auth.supabase.from("team_members").insert(payload);
  const { data, error } = await query.select("id").maybeSingle();
  if (error) {
    if (imagePath && imagePath !== oldImagePath && !imagePath.startsWith("/")) await auth.supabase.storage.from("team-images").remove([imagePath]);
    return { ok: false, message: error.code === "23505" ? "That team-member slug already exists." : "Team member could not be saved." };
  }
  if (!data) {
    if (imagePath && imagePath !== oldImagePath && !imagePath.startsWith("/")) await auth.supabase.storage.from("team-images").remove([imagePath]);
    return { ok: false, message: "This team member no longer exists. Refresh the page and try again." };
  }
  let cleanupWarning = "";
  if (oldImagePath && imagePath !== oldImagePath && !oldImagePath.startsWith("/")) {
    const { error: cleanupError } = await auth.supabase.storage.from("team-images").remove([oldImagePath]);
    if (cleanupError) cleanupWarning = " The profile was saved, but the previous image could not be cleaned up.";
  }
  refreshPublicContent();
  return { ok: true, message: `${id ? "Team member updated." : "Team member added."}${cleanupWarning}` };
}

export async function deleteContent(resource: "services" | "careers" | "team", id: string): Promise<AdminActionResult> {
  const auth = await authorizedClient();
  if (!auth.ok) return { ok: false, message: auth.error };
  const table = resource === "services" ? "services" : resource === "careers" ? "career_roles" : "team_members";
  let teamImagePath = "";
  let serviceIconPath = "";
  if (resource === "services") {
    const { data } = await auth.supabase.from("services").select("icon_path").eq("id", id).maybeSingle();
    if (data?.icon_path) serviceIconPath = data.icon_path;
  }
  if (resource === "team") {
    const { data } = await auth.supabase.from("team_members").select("image_path").eq("id", id).maybeSingle();
    if (data?.image_path && !data.image_path.startsWith("/")) teamImagePath = data.image_path;
  }
  const { data: deleted, error } = await auth.supabase.from(table).delete().eq("id", id).select("id").maybeSingle();
  if (error) return { ok: false, message: "Record could not be removed." };
  if (!deleted) return { ok: false, message: "This record no longer exists. Refresh the page and try again." };
  let cleanupWarning = "";
  if (teamImagePath) {
    const { error: cleanupError } = await auth.supabase.storage.from("team-images").remove([teamImagePath]);
    if (cleanupError) cleanupWarning = " The record was removed, but its old image could not be cleaned up.";
  }
  if (serviceIconPath) {
    const { error: cleanupError } = await auth.supabase.storage.from("service-icons").remove([serviceIconPath]);
    if (cleanupError) cleanupWarning = " The record was removed, but its custom icon could not be cleaned up.";
  }
  refreshPublicContent();
  return { ok: true, message: `Record removed.${cleanupWarning}` };
}

export async function signOutAdmin() {
  const supabase = createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  revalidatePath("/admin");
}
