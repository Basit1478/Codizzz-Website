import type { Metadata } from "next";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { ThemeProvider } from "@/components/ThemeProvider";

const baseUrl = "https://codizzz.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Codizzz | AI Solutions Agency — Pakistan",
    template: "%s | Codizzz",
  },
  description:
    "Codizzz is a Pakistan-based AI Solutions Agency. We build AI Agents, AI Digital Employees, Full Stack Web Apps, Mobile Apps, Graphic Designs & AI Video Editing for businesses worldwide.",
  keywords: [
    "AI agency Pakistan",
    "AI solutions agency",
    "AI agents development",
    "AI digital employee",
    "full stack development Pakistan",
    "Next.js development",
    "mobile app development Pakistan",
    "graphic design agency",
    "AI video editing",
    "LLM integration",
    "RAG systems",
    "chatbot development",
    "Codizzz",
  ],
  authors: [{ name: "Codizzz", url: baseUrl }],
  creator: "Codizzz",
  publisher: "Codizzz",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Codizzz",
    title: "Codizzz | AI Solutions Agency — Pakistan",
    description:
      "We build AI Agents, AI Digital Employees, Full Stack Apps, Mobile Apps & more. Pakistan-based, serving clients worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Codizzz AI Solutions Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codizzz | AI Solutions Agency",
    description:
      "We build AI Agents, AI Digital Employees, Full Stack Apps, Mobile Apps & more.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codizzz",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description:
    "AI Solutions Agency based in Pakistan, building AI Agents, Full Stack Apps, Mobile Apps and more.",
  foundingDate: "2025",
  founders: [{ "@type": "Person", name: "Basit Ali" }],
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-333-2011256",
    contactType: "customer service",
    availableLanguage: ["English", "Urdu"],
  },
  sameAs: [],
  areaServed: "Worldwide",
  serviceType: [
    "AI Development",
    "Full Stack Development",
    "Mobile App Development",
    "Graphic Design",
    "AI Agents",
    "AI Digital Employee",
    "AI Video Editing",
    "MS Office Automation",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <WhatsAppWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
