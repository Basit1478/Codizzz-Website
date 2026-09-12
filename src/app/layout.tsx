import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
// @ts-ignore -- Next.js loads this global stylesheet at runtime.
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MotionRig from "@/components/MotionRig";
import {defaultDescription, defaultTitle, siteName, siteUrl} from "@/lib/seo";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {default: defaultTitle, template: `%s | ${siteName}`},
  description: defaultDescription,
  keywords: ["AI Automation agency", "AI Agents", "Digital FTE", "custom software development", "mobile app development", "custom web development", "Karachi software agency", "Codizzz"],
  authors: [{name: "Codizzz", url: siteUrl}],
  creator: "Codizzz",
  publisher: "Codizzz",
  category: "technology",
  verification: {google: "QBTu-zyUMc-sQnK1gxe9fFZKjDpGxhyPiwu7bh4_SdE"},
  alternates: {canonical: siteUrl},
  robots: {
    index: true,
    follow: true,
    googleBot: {index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1},
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [{url: "/opengraph-image", width: 1200, height: 630, alt: "Codizzz — digital products engineered around real business needs"}],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/opengraph-image"],
    creator: "@basitali2405",
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
    shortcut: "/favicon.svg",
    apple: "/brand/codizzz-mark-orange.png",
  },
  formatDetection: {email: false, address: false, telephone: false},
  other: {"geo.region": "PK-SD", "geo.placename": "Karachi"},
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/brand/codizzz-mark-orange.png`,
      description: defaultDescription,
      email: "teamcodizzz@gmail.com",
      telephone: "+923703168969",
      founder: {"@type": "Person", name: "Basit Ali Baloch", url: "https://www.linkedin.com/in/basit-ali-baloch-738285253/"},
      address: {"@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK"},
      areaServed: "Worldwide",
      sameAs: ["https://x.com/basitali2405", "https://www.linkedin.com/in/basit-ali-baloch-738285253/"],
      knowsAbout: ["AI Agents", "AI Automation", "Digital FTE", "Custom Software", "Mobile App Development", "Custom Web Development"],
      contactPoint: {"@type": "ContactPoint", contactType: "sales", email: "teamcodizzz@gmail.com", telephone: "+923703168969", availableLanguage: ["English", "Urdu"]},
    },
    {"@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: siteName, publisher: {"@id": `${siteUrl}/#organization`}, inLanguage: "en"},
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
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
