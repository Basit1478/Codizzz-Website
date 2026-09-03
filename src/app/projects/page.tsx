import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MotionRig from "@/components/MotionRig";
import Navbar from "@/components/Navbar";
import { InteriorHero, StudioCta } from "@/components/StudioSections";
import { ArrowIcon } from "@/components/StudioIcons";

export const metadata: Metadata = { title: "Public Demonstrations", description: "Public products and experiments from the existing Codizzz project archive." };

const work = [
  { name: "TodoApp", type: "Team task platform", detail: "Task creation, assignment, priority and team workflow in one web product.", tools: "Next.js · FastAPI · Python", href: "https://todo-app-cc.vercel.app/" },
  { name: "Todo AI Chatbot", type: "Conversational task product", detail: "A natural-language interface for creating, finding and organizing tasks.", tools: "Next.js · FastAPI · AI", href: "https://hackathon-ii-phase3.vercel.app/" },
  { name: "TaskMaster Pro", type: "Productivity web app", detail: "A focused task-management experience with responsive light and dark interfaces.", tools: "Next.js · React · Tailwind", href: "https://phase2todo.vercel.app/" },
  { name: "Infology", type: "Editorial web platform", detail: "A multi-category publishing interface for discovering and organizing articles.", tools: "Next.js · React · Tailwind", href: "https://infology.vercel.app/" },
  { name: "Avion", type: "Commerce experience", detail: "A product-led storefront with collections, product details and brand storytelling.", tools: "Next.js · React · E-commerce", href: "https://avion-website.vercel.app/" },
];

export default function ProjectsPage() {
  return (
    <main>
      <MotionRig /><Navbar />
      <InteriorHero title="Public demonstrations and product experiments." body="A view into public interfaces and experiments from the existing Codizzz project archive. These are demonstrations, not client claims." />
      <section className="work-index section-shell" data-reveal>
        {work.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noreferrer"><span>{item.type}</span><h2>{item.name}</h2><p>{item.detail}</p><small>{item.tools}</small><ArrowIcon /></a>)}
      </section>
      <StudioCta /><Footer />
    </main>
  );
}
