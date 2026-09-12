import type {Metadata} from "next";

export const siteUrl = "https://codizzz.com";
export const siteName = "Codizzz";
export const defaultTitle = "Codizzz | AI Automation & Custom Software Agency";
export const defaultDescription =
  "Codizzz engineers AI Agents, AI Automation, Digital FTEs, custom software, mobile apps and web platforms around real business needs.";

const defaultKeywords = [
  "AI automation agency",
  "AI agents",
  "Digital FTE",
  "custom software development",
  "mobile app development",
  "custom web development",
  "Karachi software agency",
  "Codizzz",
];

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  keywords?: string[];
};

export function createPageMetadata({title, description, path, keywords = []}: PageMetadata): Metadata {
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const socialTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    keywords: [...keywords, ...defaultKeywords],
    alternates: {canonical},
    openGraph: {
      type: "website",
      locale: "en_PK",
      url: canonical,
      siteName,
      title: socialTitle,
      description,
      images: [{url: "/opengraph-image", width: 1200, height: 630, alt: "Codizzz — digital products engineered around real business needs"}],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
      creator: "@basitali2405",
    },
  };
}
