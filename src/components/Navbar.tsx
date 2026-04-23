"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Product", href: "/product" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-white">
              Codi<span className="gradient-text">zzz</span>
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-gold-500 uppercase mt-0.5">
              AI Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-gold-500"
                  : "text-gray-300 hover:text-gold-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop: Theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            className="theme-toggle"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <Link href="/contact" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile: Theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gold-500 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gold-500 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gold-500 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        style={{ background: "var(--nav-glass-bg)" }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-medium py-2 border-b border-white/5 ${
                pathname === link.href ? "text-gold-500" : "text-gray-300 hover:text-gold-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary text-center text-sm mt-2"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
