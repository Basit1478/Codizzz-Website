import Link from "next/link";
import BrandMark from "./BrandMark";
import { ArrowIcon } from "./StudioIcons";

type SocialPlatform = "linkedin" | "facebook" | "instagram" | "x";

const socialLinks: Array<{ label: string; href: string; platform: SocialPlatform }> = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/codizzz/", platform: "linkedin" },
  { label: "Facebook", href: "https://web.facebook.com/codizzz2026/", platform: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/codi_zzz/", platform: "instagram" },
  { label: "X", href: "https://x.com/codizzz_AI", platform: "x" },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle className="site-footer__social-dot" cx="17.35" cy="6.75" r="1" />
      </svg>
    );
  }

  const paths: Record<Exclude<SocialPlatform, "instagram">, string> = {
    linkedin: "M6.4 8.1H3.2V20h3.2V8.1ZM4.8 3a1.86 1.86 0 1 0 0 3.72A1.86 1.86 0 0 0 4.8 3Zm4.7 5.1V20h3.2v-5.9c0-1.56.3-3.07 2.23-3.07 1.9 0 1.93 1.78 1.93 3.17V20H20v-6.53c0-3.21-.69-5.68-4.45-5.68-1.8 0-3.01.99-3.5 1.93H12V8.1H9.5Z",
    facebook: "M13.8 21v-8h2.68l.4-3.12H13.8v-2c0-.9.25-1.52 1.55-1.52H17V3.57A22.2 22.2 0 0 0 14.6 3c-2.38 0-4.01 1.45-4.01 4.12v2.76H7.9V13h2.69v8h3.21Z",
    x: "M18.65 3H21l-5.13 5.86L21.9 21h-4.72l-3.7-4.84L9.25 21H6.9l5.48-6.27L6.6 3h4.84l3.34 4.42L18.65 3Zm-.83 15.86h1.3L10.73 5.03H9.34l8.48 13.83Z",
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[platform]} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <BrandMark />
        <p>Digital products shaped around how your business works.</p>
      </div>
      <div className="site-footer__links">
        <Link href="/services">Services</Link>
        <Link href="/work">Work</Link>
        <Link href="/team">Team</Link>
        <Link href="/careers">Careers</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <a className="site-footer__contact" href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com <ArrowIcon /></a>
      <div className="site-footer__base">
        <span>© {new Date().getFullYear()} Codizzz</span>
        <nav className="site-footer__socials" aria-label="Codizzz social media">
          {socialLinks.map(({ label, href, platform }) => (
            <a
              className="site-footer__social"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Codizzz on ${label}`}
              key={label}
            >
              <SocialIcon platform={platform} />
            </a>
          ))}
        </nav>
        <span>Karachi, Pakistan</span>
      </div>
    </footer>
  );
}
