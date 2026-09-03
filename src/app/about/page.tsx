import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MotionRig from "@/components/MotionRig";
import Navbar from "@/components/Navbar";
import { FounderSection, InteriorHero, StudioCta, TeamSection } from "@/components/StudioSections";

export const metadata: Metadata = { title: "Team", description: "Meet the founder and team behind Codizzz and learn how we approach useful digital products." };

export default function AboutPage() {
  return (
    <main>
      <MotionRig /><Navbar />
      <InteriorHero title="Founder-led. Need-first. Built to be useful." body="Codizzz is a digital product agency for organizations that need technology to fit their reality, not force them into somebody else’s template." />
      <FounderSection />
      <TeamSection />
      <section className="principles section-shell" data-reveal>
        <h2>How we think about the work.</h2>
        <div>
          <article><h3>Clarity before complexity</h3><p>We make the business need legible before choosing architecture, tooling or an AI model.</p></article>
          <article><h3>Fit over fashion</h3><p>The right product is the one that works inside your operation, not the one with the longest feature list.</p></article>
          <article><h3>Visible collaboration</h3><p>Working progress stays open to the people who understand the real-world context.</p></article>
        </div>
      </section>
      <StudioCta /><Footer />
    </main>
  );
}
