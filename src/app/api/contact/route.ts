import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, service, message } = await req.json();

  if (!name || !email || !service || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #040810; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid rgba(245,197,24,0.3);">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 style="color: #f5c518; font-size: 28px; margin: 0; letter-spacing: 2px;">CODIZZZ</h1>
        <p style="color: #6b7280; font-size: 11px; margin: 4px 0 0; letter-spacing: 3px; text-transform: uppercase;">AI Solutions</p>
      </div>
      <h2 style="color: #fff; font-size: 18px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(245,197,24,0.2);">
        New Lead: ${service}
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #fff; font-weight: bold; font-size: 15px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <a href="mailto:${email}" style="color: #f5c518; text-decoration: none; font-size: 14px;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f5c518; font-weight: bold;">${service}</td>
        </tr>
        <tr>
          <td style="padding: 14px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
          <td style="padding: 14px 0; color: #e5e7eb; line-height: 1.7; font-size: 14px;">${message}</td>
        </tr>
      </table>
      <a href="mailto:${email}" style="display: block; text-align: center; background: #f5c518; color: #040810; padding: 14px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 14px; margin-bottom: 20px;">
        Reply to ${name}
      </a>
      <p style="color: #374151; font-size: 11px; text-align: center; margin: 0;">Codizzz AI Solutions &bull; Est. 2025 &bull; Pakistan</p>
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
        subject: `New Lead: ${name} — ${service}`,
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
