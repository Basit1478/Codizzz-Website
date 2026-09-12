import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { InteriorHero, StudioCta, StudioProcess } from "@/components/StudioSections";
import {createPageMetadata} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Digital Product Process",
  description: "See how Codizzz turns real business friction into a fitted digital product through discovery, system design, visible build passes and delivery.",
  path: "/product",
  keywords: ["digital product process", "software development process", "AI system design"],
});

export default function ProductPage() {
  return (
    <main>
      <Navbar />
      <InteriorHero title="A product is a fitted response, not a feature pile." body="We define the product around the work it needs to improve, the people who will use it and the systems it must connect." />
      <StudioProcess />
      <section className="fit-check section-shell" data-reveal><h2>What the build can become.</h2><p>An AI agent, a connected AI Automation, a Digital FTE, an internal tool, a mobile product or a custom web platform. The form follows the requirement.</p></section>
      <StudioCta /><Footer />
    </main>
  );
}
