import { NextRequest, NextResponse } from "next/server";

const COOLDOWN_MS = 5 * 60 * 1000;
const submissionCooldowns = new Map<string, number>();

const allowedServices = new Set([
  "AI Agents",
  "AI Automation",
  "Digital FTE",
  "Custom Software",
  "Mobile App Development",
  "Custom Web Development",
]);

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  const { name, email, company = "", service, message } = payload ?? {};

  if (![name, email, service, message].every((value) => typeof value === "string" && value.trim().length > 0)) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  if (name.length > 120 || email.length > 254 || typeof company !== "string" || company.length > 160 || service.length > 80 || message.length > 5000) {
    return NextResponse.json({ error: "One or more fields are too long" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  if (!allowedServices.has(service)) {
    return NextResponse.json({ error: "Select a valid service" }, { status: 400 });
  }

  const now = Date.now();
  const cookieCooldownUntil = Number(req.cookies.get("codizzz_contact_cooldown")?.value ?? 0);
  if (Number.isFinite(cookieCooldownUntil) && cookieCooldownUntil > now) {
    const retryAfter = Math.ceil((cookieCooldownUntil - now) / 1000);
    return NextResponse.json(
      { error: "Please wait before sending another requirement", retryAfter },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const cooldownKey = email.trim().toLowerCase();
  submissionCooldowns.forEach((expiresAt, key) => {
    if (expiresAt <= now) submissionCooldowns.delete(key);
  });
  const cooldownUntil = submissionCooldowns.get(cooldownKey) ?? 0;
  if (cooldownUntil > now) {
    const retryAfter = Math.ceil((cooldownUntil - now) / 1000);
    return NextResponse.json(
      { error: "Please wait before sending another requirement", retryAfter },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form is missing RESEND_API_KEY");
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
  }

  submissionCooldowns.set(cooldownKey, now + COOLDOWN_MS);

  const escapeHTML = (value: string) =>
    value.replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[character] ?? character);
  const safeName = escapeHTML(String(name));
  const safeEmail = escapeHTML(String(email));
  const safeCompany = company.trim() ? escapeHTML(company.trim()) : "Not provided";
  const safeService = escapeHTML(String(service));
  const safeMessage = escapeHTML(String(message));

  const emailHTML = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #100f0e; color: #f5f2eb; padding: 30px; border: 1px solid #3a3631;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 style="color: #e72700; font-size: 28px; margin: 0; letter-spacing: 2px;">CODIZZZ</h1>
        <p style="color: #bbb4aa; font-size: 11px; margin: 4px 0 0; letter-spacing: 2px; text-transform: uppercase;">Digital products built around your need</p>
      </div>
      <h2 style="color: #f5f2eb; font-size: 18px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #3a3631;">
        New requirement: ${safeService}
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #3a3631; color: #f5f2eb; font-weight: bold; font-size: 15px;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <a href="mailto:${safeEmail}" style="color: #e72700; text-decoration: none; font-size: 14px;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #3a3631; color: #f5f2eb; font-size: 14px;">${safeCompany}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #3a3631; color: #e72700; font-weight: bold;">${safeService}</td>
        </tr>
        <tr>
          <td style="padding: 14px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
          <td style="padding: 14px 0; color: #f5f2eb; line-height: 1.7; font-size: 14px;">${safeMessage}</td>
        </tr>
      </table>
      <a href="mailto:${safeEmail}" style="display: block; text-align: center; background: #e72700; color: #fff4ef; padding: 14px; font-weight: bold; text-decoration: none; font-size: 14px; margin-bottom: 20px;">
        Reply to ${safeName}
      </a>
      <p style="color: #777067; font-size: 11px; text-align: center; margin: 0;">Codizzz &bull; Karachi, Pakistan</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Codizzz Contact Form <onboarding@resend.dev>",
        to: ["teamcodizzz@gmail.com"],
        reply_to: email,
        subject: `New requirement: ${safeName} | ${safeService}`,
        html: emailHTML,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Resend error:", err);
      submissionCooldowns.delete(cooldownKey);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    const response = NextResponse.json({ success: true, retryAfter: COOLDOWN_MS / 1000 });
    response.cookies.set({
      name: "codizzz_contact_cooldown",
      value: String(Date.now() + COOLDOWN_MS),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: COOLDOWN_MS / 1000,
    });
    return response;
  } catch (err) {
    console.error("Contact form error:", err);
    submissionCooldowns.delete(cooldownKey);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
