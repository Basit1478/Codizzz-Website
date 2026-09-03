import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const baseUrl = "https://codizzz.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Codizzz | Digital Products Built Around Your Need", template: "%s | Codizzz" },
  description: "Codizzz builds AI agents, automation, Digital FTEs, custom software, mobile apps and web platforms around how your business works.",
  alternates: { canonical: baseUrl },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "Codizzz",
    title: "Codizzz | Digital Products Built Around Your Need",
    description: "AI, automation and custom software shaped around your business.",
  },
  icons: { icon: "/favicon.svg" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codizzz",
  url: baseUrl,
  logo: `${baseUrl}/brand/codizzz-mark-orange.png`,
  description: "A digital product agency building AI systems, automation and custom software.",
  founder: { "@type": "Person", name: "Basit Ali Baloch", url: "https://www.linkedin.com/in/basit-ali-baloch-738285253/" },
  areaServed: "Worldwide",
  serviceType: ["AI Agents", "Automation", "Digital FTE", "Custom Software", "Mobile App Development", "Custom Web Development"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
