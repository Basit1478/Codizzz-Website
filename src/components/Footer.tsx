import Link from "next/link";
import BrandMark from "./BrandMark";
import { ArrowIcon } from "./StudioIcons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <BrandMark />
        <p>Digital products shaped around how your business works.</p>
      </div>
      <div className="site-footer__links">
        <Link href="/services">Services</Link>
        <Link href="/projects">Work</Link>
        <Link href="/about">Team</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <a className="site-footer__contact" href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com <ArrowIcon /></a>
      <div className="site-footer__base">
        <span>© {new Date().getFullYear()} Codizzz</span>
        <span>Karachi, Pakistan</span>
      </div>
    </footer>
  );
}
