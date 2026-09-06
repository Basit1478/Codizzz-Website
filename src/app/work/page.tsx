import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { InteriorHero, StudioCta } from "@/components/StudioSections";
import { ArrowIcon } from "@/components/StudioIcons";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected live websites and public product experiments from Codizzz.",
};

const work = [
  { name: "Acmeem", type: "Corporate experience", detail: "A corporate presence connecting event management with strategic business consulting.", tools: "Live website · Public link", href: "https://acmeem.com/", image: "/brand/projects/acmeem.jpg" },
  { name: "Blazon 360", type: "Agency website", detail: "A full-service agency presentation spanning marketing, brand strategy and activations.", tools: "Live website · Public link", href: "https://blazon360agency.com/", image: "/brand/projects/blazon360.jpg" },
  { name: "Veyra Atelier", type: "Editorial commerce", detail: "An editorial commerce experience for a considered collection of hand-crafted objects.", tools: "Live website · Public link", href: "https://veyra-ecommerce-store.vercel.app/", image: "/brand/projects/veyra.jpg" },
  { name: "Velora", type: "Restaurant experience", detail: "A cinematic dining experience shaped around contemporary Pakistani cuisine.", tools: "Live website · Public link", href: "https://velora-restaurent.vercel.app/", image: "/brand/projects/velora-restaurant.jpg" },
  { name: "Morrow Dental", type: "Healthcare website", detail: "A calm healthcare interface covering preventive, cosmetic and emergency dental care.", tools: "Live website · Public link", href: "https://morrow-dental.vercel.app/", image: "/brand/projects/morrow-dental.jpg" },
  { name: "Karachi Brasserie", type: "Hospitality website", detail: "An all-day eatery experience pairing menus, venue storytelling and table booking.", tools: "Live website · Public link", href: "https://karachi-brasseriee.vercel.app/", image: "/brand/projects/karachi-brasserie.jpg" },
  { name: "TodoApp", type: "Team task platform", detail: "Task creation, assignment, priority and team workflow in one web product.", tools: "Next.js · FastAPI · Python", href: "https://todo-app-cc.vercel.app/", image: "/brand/projects/todoapp.jpg" },
  { name: "Todo AI Chatbot", type: "Conversational task product", detail: "A natural-language interface for creating, finding and organizing tasks.", tools: "Next.js · FastAPI · AI", href: "https://hackathon-ii-phase3.vercel.app/", image: "/brand/projects/todo-ai-chatbot.jpg" },
  { name: "TaskMaster Pro", type: "Productivity web app", detail: "A focused task-management experience with responsive light and dark interfaces.", tools: "Next.js · React · Tailwind", href: "https://phase2todo.vercel.app/", image: "/brand/projects/taskmaster-pro.jpg" },
  { name: "Infology", type: "Editorial web platform", detail: "A multi-category publishing interface for discovering and organizing articles.", tools: "Next.js · React · Tailwind", href: "https://infology.vercel.app/", image: "/brand/projects/infology.jpg" },
  { name: "Avion", type: "Commerce experience", detail: "A product-led storefront with collections, product details and brand storytelling.", tools: "Next.js · React · E-commerce", href: "https://avion-website.vercel.app/", image: "/brand/projects/avion.jpg" },
];

export default function WorkPage() {
  return (
    <main>
      <Navbar />
      <InteriorHero title="Selected work and public product experiments." body="A view into publicly accessible interfaces across business, commerce, hospitality and productivity." />
      <section className="work-index section-shell" data-reveal>
        {work.map((item) => (
          <a className="work-card" key={item.name} href={item.href} target="_blank" rel="noreferrer">
            <div className="work-card__media">
              <Image src={item.image} alt={`${item.name} website homepage`} fill sizes="(max-width: 760px) calc(100vw - 40px), 46vw" />
            </div>
            <div className="work-card__content">
              <span>{item.type}</span>
              <h2>{item.name}</h2>
              <p>{item.detail}</p>
              <div className="work-card__footer">
                <small>{item.tools}</small>
                <span className="work-card__visit">Visit project <ArrowIcon /></span>
              </div>
            </div>
          </a>
        ))}
      </section>
      <StudioCta /><Footer />
    </main>
  );
}
