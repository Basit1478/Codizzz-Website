"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandMark from "./BrandMark";
import { ArrowIcon, MoonIcon, SunIcon } from "./StudioIcons";
import { useTheme } from "./ThemeProvider";

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

  return (
    <header className="site-header">
      <BrandMark />
      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button className="theme-button" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
        <Link className="button button--compact" href="/contact">Start a build <ArrowIcon /></Link>
        <button className={open ? "menu-button is-open" : "menu-button"} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          <span /><span />
        </button>
      </div>
    </header>
  );
}
