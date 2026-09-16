import type { ServiceRecord } from "@/types/content";

export const services: ServiceRecord[] = [
  { id: "service-ai-agents", slug: "ai-agents", iconKey: "agent", title: "AI Agents", short: "Agents that reason, coordinate tools and carry work forward with human oversight.", position: 1, published: true },
  { id: "service-ai-automation", slug: "ai-automation", iconKey: "automation", title: "AI Automation", short: "Connected workflows that remove repetitive handoffs and manual operations.", position: 2, published: true },
  { id: "service-digital-fte", slug: "digital-fte", iconKey: "fte", title: "Digital FTE", short: "Dedicated digital teammates shaped around a defined operational role.", position: 3, published: true },
  { id: "service-custom-software", slug: "custom-software", iconKey: "software", title: "Custom Software", short: "Purpose-built systems designed around your process, data and business logic.", position: 4, published: true },
  { id: "service-mobile-app-development", slug: "mobile-app-development", iconKey: "mobile", title: "Mobile App Development", short: "Mobile products designed for the people and context in which they are used.", position: 5, published: true },
  { id: "service-custom-web-development", slug: "custom-web-development", iconKey: "web", title: "Custom Web Development", short: "Fast, responsive web platforms built around your audience and operation.", position: 6, published: true },
];
