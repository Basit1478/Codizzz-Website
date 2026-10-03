import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import NotFoundExperience from "@/components/NotFoundExperience";
import { ArrowIcon } from "@/components/StudioIcons";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <header className="not-found-page__header">
        <BrandMark />
        <span>Route not found</span>
      </header>

      <section className="not-found-page__body" aria-labelledby="not-found-title">
        <div className="not-found-page__copy">
          <span className="not-found-page__number" aria-hidden="true">404</span>
          <h1 id="not-found-title">This route lost the brief.</h1>
          <p>The page you asked for is not in this build. Head home or explore what Codizzz can engineer for you.</p>
          <div className="not-found-page__actions">
            <Link className="button button--solid" href="/">Back to home <ArrowIcon /></Link>
            <Link className="text-link" href="/services">Explore services <ArrowIcon /></Link>
          </div>
        </div>

        <NotFoundExperience />
      </section>

      <nav className="not-found-page__links" aria-label="Useful destinations">
        <Link href="/work"><span>Selected work</span><ArrowIcon /></Link>
        <Link href="/careers"><span>Careers</span><ArrowIcon /></Link>
        <Link href="/contact"><span>Contact</span><ArrowIcon /></Link>
      </nav>
    </main>
  );
}
