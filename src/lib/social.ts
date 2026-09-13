export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/codizzz/", platform: "linkedin" },
  { label: "Facebook", href: "https://web.facebook.com/codizzz2026/", platform: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/codi_zzz/", platform: "instagram" },
  { label: "X", href: "https://x.com/codizzz_AI", platform: "x" },
] as const;

export type SocialPlatform = (typeof socialLinks)[number]["platform"];
