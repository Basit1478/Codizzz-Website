"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import BrandMark from "./BrandMark";
import { MoonIcon, SunIcon } from "./StudioIcons";
import { useTheme } from "./ThemeProvider";
import MagneticLink from "./MagneticLink";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 18;
    setScrolled((current) => current === next ? current : next);
  });

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <BrandMark />
      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <span className="site-status" aria-label="Codizzz studio location: Karachi, Pakistan">
          <i aria-hidden="true" /> KHI / PK
        </span>
        <button className="theme-button" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
          <span className="theme-button__moon"><MoonIcon /></span>
          <span className="theme-button__sun"><SunIcon /></span>
        </button>
        <MagneticLink className="button--compact" href="/contact" label="Start a build" />
        <button className={open ? "menu-button is-open" : "menu-button"} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          <span /><span />
        </button>
      </div>
    </header>
  );
}
