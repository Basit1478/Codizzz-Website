export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    "AI Development",
    "Full Stack Development",
    "Graphic Designing",
    "AI Agent",
    "AI Digital Employee",
    "AI Video Editing",
    "Mobile App Development",
    "MS Office & Automation",
  ];

  const links = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="relative pt-20 pb-8 border-t border-white/5"
      style={{ background: "#040810" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 leading-none">
              <span className="text-3xl font-black text-white">
                Codi<span className="gradient-text">zzz</span>
              </span>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-500 uppercase mt-1">
                AI Solutions &bull; Est. 2025
              </p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Building the future with AI — one intelligent solution at a time.
              Est. 2025, Pakistan.
            </p>
            <div className="flex gap-3">
              {[
                { label: "LI", href: "#" },
                { label: "GH", href: "#" },
                { label: "TW", href: "#" },
                { label: "UP", href: "https://www.upwork.com/freelancers/~01803d6a0410c278de" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500/30 text-xs font-bold transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 4).map((s) => (
                <li key={s}>
                  <a
                    href="/services"
                    className="text-gray-500 hover:text-gold-500 text-sm transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
              More Services
            </h4>
            <ul className="space-y-3">
              {services.slice(4).map((s) => (
                <li key={s}>
                  <a
                    href="/services"
                    className="text-gray-500 hover:text-gold-500 text-sm transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-gold-500 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-gray-600 text-xs mb-2">Have a project?</p>
              <a href="/contact" className="btn-primary text-sm inline-block py-2 px-5">
                Get a Quote
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Codizzz. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-600 text-xs">All systems operational</span>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
