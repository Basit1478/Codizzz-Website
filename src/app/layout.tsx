import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MotionRig from "@/components/MotionRig";

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
  description: "Codizzz builds AI agents, AI Automation, Digital FTEs, custom software, mobile apps and web platforms around how your business works.",
  alternates: { canonical: baseUrl },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "Codizzz",
    title: "Codizzz | Digital Products Built Around Your Need",
    description: "AI, AI Automation and custom software shaped around your business.",
  },
  icons: {
    icon: [
      {
        url: "/brand/codizzz-mark-orange.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/brand/codizzz-mark-red.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/brand/codizzz-mark-orange.png",
    apple: "/brand/codizzz-mark-orange.png",
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codizzz",
  url: baseUrl,
  logo: `${baseUrl}/brand/codizzz-mark-orange.png`,
  description: "A digital product agency building AI systems, AI Automation and custom software.",
  founder: { "@type": "Person", name: "Basit Ali Baloch", url: "https://www.linkedin.com/in/basit-ali-baloch-738285253/" },
  areaServed: "Worldwide",
  serviceType: ["AI Agents", "AI Automation", "Digital FTE", "Custom Software", "Mobile App Development", "Custom Web Development"],
};

const themeScript = `
  try {
    var savedTheme = localStorage.getItem('codizzz-theme');
    var theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (_) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body>
        <ThemeProvider>
          <MotionRig />
          {children}
          <WhatsAppWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
