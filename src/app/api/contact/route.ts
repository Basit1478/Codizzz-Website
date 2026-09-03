import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, service, message } = await req.json();

  if (!name || !email || !service || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const escapeHTML = (value: string) =>
    value.replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[character] ?? character);
  const safeName = escapeHTML(String(name));
  const safeEmail = escapeHTML(String(email));
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
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
