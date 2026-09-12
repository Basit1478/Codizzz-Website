import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { InteriorHero, StudioCta } from "@/components/StudioSections";
import { ArrowIcon, ServiceIcon } from "@/components/StudioIcons";
import { services } from "@/data/services";
import Link from "next/link";
import {createPageMetadata} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Automation & Software Development Services",
  description: "Explore Codizzz services: AI Agents, AI Automation, Digital FTEs, custom software, mobile app development and custom web development.",
  path: "/services",
  keywords: ["AI Automation services", "AI agent development", "n8n automation", "software development services"],
});

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <InteriorHero title="The right build starts with the right need." body="We combine product thinking, AI and software engineering to create systems that fit the people and processes already inside your business." />
      <section className="service-index section-shell" data-reveal>
        {services.map((service) => (
          <article id={service.type} key={service.title}>
            <ServiceIcon type={service.type} />
            <h2>{service.title}</h2>
            <p>{service.short}</p>
            <Link href={`/contact?service=${encodeURIComponent(service.title)}`} aria-label={`Discuss ${service.title}`}>Discuss this build <ArrowIcon /></Link>
          </article>
        ))}
      </section>
      <section className="fit-check section-shell" data-reveal>
        <h2>Not sure which service fits?</h2>
        <p>That is a useful place to begin. Bring us the bottleneck, desired outcome or unfinished idea. We will help identify the right product shape before defining the build.</p>
      </section>
      <StudioCta /><Footer />
    </main>
  );
}
