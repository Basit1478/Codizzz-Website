import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Codizzz AI Solutions Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = readFileSync(join(process.cwd(), "public/logo.jpg"));
  const logoBase64 = `data:image/jpeg;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #040810 0%, #0a1020 60%, #040810 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%)",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          width={220}
          height={220}
          style={{ borderRadius: "24px", marginBottom: "32px", objectFit: "contain" }}
        />

        {/* Tagline */}
        <p
          style={{
            color: "#f5c518",
            fontSize: "18px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            margin: "0 0 12px 0",
            fontWeight: 600,
          }}
        >
          AI Solutions Agency
        </p>

        {/* Description */}
        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
            margin: 0,
            letterSpacing: "1px",
          }}
        >
          AI Agents · Full Stack · Mobile Apps · Graphic Design
        </p>

        {/* URL */}
        <p
          style={{
            position: "absolute",
            bottom: "28px",
            color: "#374151",
            fontSize: "14px",
            margin: 0,
            letterSpacing: "2px",
          }}
        >
          codizzz.com
        </p>
      </div>
    ),
    { ...size }
  );
}
