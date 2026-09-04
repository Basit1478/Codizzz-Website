import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FounderSection, StudioCta, StudioProcess } from "@/components/StudioSections";
import { ArrowIcon } from "@/components/StudioIcons";
import MotionRig from "@/components/MotionRig";
import Link from "next/link";
import HeroExperience from "@/components/HeroExperience";
import KineticHeadline from "@/components/KineticHeadline";
import MagneticLink from "@/components/MagneticLink";
import ServicesRibbon from "@/components/ServicesRibbon";

export default function Home() {
  return (
    <main>
      <MotionRig />
      <Navbar />
      <section className="pattern-hero" aria-labelledby="home-title">
        <div className="pattern-hero__copy">
          <KineticHeadline />
          <p>
            Codizzz designs AI systems, automation and custom software around
            the way your business actually works.
          </p>
          <div className="action-row">
            <MagneticLink className="button--solid" href="/contact" label="Start a build" />
            <Link className="text-link" href="/services">
              Explore services <ArrowIcon />
            </Link>
          </div>
        </div>

        <HeroExperience />

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
