import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MotionRig from "@/components/MotionRig";
import Navbar from "@/components/Navbar";
import { InteriorHero, StudioCta, StudioProcess } from "@/components/StudioSections";

export const metadata: Metadata = { title: "Product Process", description: "How Codizzz turns a business need into a useful digital product." };

export default function ProductPage() {
  return (
    <main>
      <MotionRig /><Navbar />
      <InteriorHero title="A product is a fitted response, not a feature pile." body="We define the product around the work it needs to improve, the people who will use it and the systems it must connect." />
      <StudioProcess />
      <section className="fit-check section-shell" data-reveal><h2>What the build can become.</h2><p>An AI agent, a connected automation, a Digital FTE, an internal tool, a mobile product or a custom web platform. The form follows the requirement.</p></section>
      <StudioCta /><Footer />
    </main>
  );
}
