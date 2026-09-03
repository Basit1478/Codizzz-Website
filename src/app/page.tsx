import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FounderSection, ServicesRibbon, StudioCta, StudioProcess } from "@/components/StudioSections";
import { ArrowIcon } from "@/components/StudioIcons";
import MotionRig from "@/components/MotionRig";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <MotionRig />
      <Navbar />
      <section className="pattern-hero" aria-labelledby="home-title">
        <div className="pattern-hero__copy">
          <h1 id="home-title" data-hero-title>
            Your need.<br />Engineered into<br />a digital product.
          </h1>
          <p>
            Codizzz designs AI systems, automation and custom software around
            the way your business actually works.
          </p>
          <div className="action-row">
            <Link className="button button--solid" href="/contact">
              Start a build <ArrowIcon />
            </Link>
            <Link className="text-link" href="/services">
              Explore services <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="fabrication-frame" data-hero-media>
          <div className="fabrication-frame__image" role="img" aria-label="A maker shaping a paper pattern on a cutting table" />
          <svg className="cut-path" viewBox="0 0 800 430" aria-hidden="true">
            <path data-cut-path pathLength="1" d="M250 314h58l38-54h112l44-95h111l39 45h92" />
          </svg>
          <span className="fabrication-note fabrication-note--need">Need</span>
          <span className="fabrication-note fabrication-note--workflow">Workflow</span>
          <span className="fabrication-note fabrication-note--outcome">Outcome</span>
        </div>

        <aside className="requirement-ticket" aria-label="Requirement starter">
          <span className="ticket-label">Requirement intake</span>
          <Link href="/contact?need=change">What needs to change?<ArrowIcon /></Link>
          <Link href="/contact?need=friction">Where does work slow down?<ArrowIcon /></Link>
          <Link href="/contact?need=automation">What should run without you?<ArrowIcon /></Link>
        </aside>
      </section>

      <ServicesRibbon />

      <section className="manifesto section-shell" data-reveal>
        <h2>We start with the friction inside your business.</h2>
        <p className="manifesto__body">
          We do not start with a predetermined deliverable. We choose the right
          shape for the answer: an AI agent, an
          automated workflow, a digital teammate, or software built from the
          ground up.
        </p>
      </section>

      <StudioProcess />
      <FounderSection />
      <StudioCta />
      <Footer />
    </main>
  );
}
