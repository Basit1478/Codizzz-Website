import type { CareerRole } from "@/types/content";

export const careerRoles: CareerRole[] = [
  {
    id: "career-mobile-app-developer",
    slug: "mobile-app-developer",
    title: "Mobile App Developer",
    focus: "Mobile product engineering",
    description: "Help turn product requirements into reliable, polished mobile experiences.",
    position: 1,
    published: true,
  },
  {
    id: "career-n8n-ai-automation",
    slug: "n8n-ai-automation",
    title: "n8n AI Automation",
    focus: "Workflows and integrations",
    description: "Design and build n8n workflows that connect tools and remove repetitive work.",
    position: 2,
    published: true,
  },
  {
    id: "career-backend-developer",
    slug: "backend-developer",
    title: "Backend Developer",
    focus: "Python and FastAPI",
    description: "Build clear, dependable backend services and APIs with Python and FastAPI.",
    position: 3,
    published: true,
  },
] as CareerRole[];

export type CareerRoleSlug = string;

export function getCareerRole(slug?: string) {
  return careerRoles.find((role) => role.slug === slug);
}
