import type { Metadata } from "next";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Codizzz | AI Solutions Agency",
  description:
    "Codizzz — AI Solutions Agency. We build AI Agents, Full Stack Apps, Mobile Apps, Graphic Designs, and Digital Employees. Est. 2025.",
  keywords:
    "AI agency, full stack development, AI agents, digital employee, mobile app development, graphic design, AI video editing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
