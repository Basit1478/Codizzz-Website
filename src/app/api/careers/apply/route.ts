import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getCareerRole } from "@/data/careers";

export const runtime = "nodejs";

const MAX_CV_BYTES = 3 * 1024 * 1024;
const COOLDOWN_MS = 5 * 60 * 1000;
const submissionCooldowns = new Map<string, number>();
const allowedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const allowedExtensions = new Set(["pdf", "doc", "docx"]);

const escapeHTML = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
})[character] ?? character);

function readText(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid application data." }, { status: 400 });

  const role = getCareerRole(readText(form, "role"));
  const name = readText(form, "name");
  const email = readText(form, "email");
  const phone = readText(form, "phone");
  const city = readText(form, "city");
  const profile = readText(form, "profile");
  const motivation = readText(form, "motivation");
  const cv = form.get("cv");

  if (!role || !name || !email || !phone || !city || !profile || !motivation || !(cv instanceof File)) {
    return NextResponse.json({ error: "Complete all required fields and attach your CV." }, { status: 400 });
  }
  if (name.length > 120 || email.length > 254 || phone.length > 40 || city.length > 100 || profile.length > 500 || motivation.length > 2500) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (profile) {
    try {
      const url = new URL(profile);
      if (!new Set(["http:", "https:"]).has(url.protocol)) throw new Error();
    } catch {
      return NextResponse.json({ error: "Enter a valid LinkedIn or portfolio URL." }, { status: 400 });
    }
  }

  const extension = cv.name.split(".").pop()?.toLowerCase() ?? "";
  if ((cv.type && !allowedTypes.has(cv.type)) || !allowedExtensions.has(extension)) {
    return NextResponse.json({ error: "Upload your CV as a PDF, DOC or DOCX file." }, { status: 400 });
  }
  if (cv.size === 0 || cv.size > MAX_CV_BYTES) {
    return NextResponse.json({ error: "Your CV must be smaller than 3 MB." }, { status: 400 });
  }

  const now = Date.now();
  const cooldownKey = email.toLowerCase();
  submissionCooldowns.forEach((expiresAt, key) => { if (expiresAt <= now) submissionCooldowns.delete(key); });
  if ((submissionCooldowns.get(cooldownKey) ?? 0) > now) {
    return NextResponse.json({ error: "Please wait five minutes before applying again." }, { status: 429 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Application email delivery is not configured." }, { status: 503 });
  }

  const safe = {
    role: escapeHTML(role.title), name: escapeHTML(name), email: escapeHTML(email), phone: escapeHTML(phone),
    city: escapeHTML(city), profile: escapeHTML(profile),
    motivation: escapeHTML(motivation).replace(/\n/g, "<br>"),
  };
  const fileName = cv.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || `cv.${extension}`;
  const content = Buffer.from(await cv.arrayBuffer()).toString("base64");
  const deliveryId = randomUUID();
  const emailPayload = {
    from: process.env.CAREERS_FROM_EMAIL ?? "Codizzz Careers <onboarding@resend.dev>",
    to: [process.env.CAREERS_TO_EMAIL ?? "teamcodizzz@gmail.com"],
    reply_to: email,
    subject: `Career application: ${name} | ${role.title}`,
    attachments: [{ filename: fileName, content }],
    html: `<div style="font-family:system-ui,sans-serif;max-width:640px;margin:auto;background:#100f0e;color:#f5f2eb;padding:32px;border:1px solid #3a3631"><h1 style="color:#e72700;margin:0 0 24px">CODIZZZ CAREERS</h1><h2 style="margin:0 0 20px">${safe.role}</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> <a style="color:#e72700" href="mailto:${safe.email}">${safe.email}</a></p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>City:</strong> ${safe.city}</p><p><strong>Profile:</strong> ${safe.profile}</p><hr style="border:0;border-top:1px solid #3a3631;margin:24px 0"><p><strong>Why Codizzz?</strong><br>${safe.motivation}</p><p style="color:#bbb4aa;margin-top:28px">The applicant's CV is attached. Reply to this email to contact them.</p></div>`,
  };
  submissionCooldowns.set(cooldownKey, now + COOLDOWN_MS);

  try {
    const sendEmail = () => fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": deliveryId,
        "User-Agent": "Codizzz-Careers/1.0",
      },
      body: JSON.stringify(emailPayload),
    });
    let response = await sendEmail();
    if (response.status === 429 || response.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      response = await sendEmail();
    }
    if (!response.ok) {
      const providerError = await response.json().catch(() => null) as { name?: string } | null;
      console.error("[careers-email] Resend rejected a delivery", {
        status: response.status,
        code: providerError?.name ?? "unknown",
        deliveryId,
      });
      submissionCooldowns.delete(cooldownKey);
      return NextResponse.json({ error: "Application could not be delivered." }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    submissionCooldowns.delete(cooldownKey);
    return NextResponse.json({ error: "Application could not be delivered." }, { status: 500 });
  }
}
