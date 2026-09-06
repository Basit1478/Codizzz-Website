export const careerRoles = [
  {
    slug: "mobile-app-developer",
    title: "Mobile App Developer",
    focus: "Mobile product engineering",
    description: "Help turn product requirements into reliable, polished mobile experiences.",
  },
  {
    slug: "n8n-automation",
    title: "n8n Automation",
    focus: "Workflows and integrations",
    description: "Design and build n8n workflows that connect tools and remove repetitive work.",
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    focus: "Python and FastAPI",
    description: "Build clear, dependable backend services and APIs with Python and FastAPI.",
  },
] as const;

export type CareerRoleSlug = (typeof careerRoles)[number]["slug"];

export function getCareerRole(slug?: string) {
  return careerRoles.find((role) => role.slug === slug);
}
