import type { TeamMember } from "@/types/content";

export const teamMembers: TeamMember[] = [
  {
    id: "team-umer-ali",
    slug: "umer-ali",
    name: "Umer Ali",
    role: "Co-founder & AI Engineer",
    image: "/brand/team-umer-ali.jpg",
    imagePath: "/brand/team-umer-ali.jpg",
    summary: "Builds agentic products and full-stack experiences with a focus on dependable, practical AI Automation.",
    skills: ["Next.js", "React", "Python", "TypeScript", "AI Agents", "Claude Code"],
    linkedinUrl: "https://www.linkedin.com/in/umer-ali-a962252ba/",
    xUrl: "https://x.com/Umerali_4",
    position: 1,
    published: true,
  },
  {
    id: "team-muhammad-anzal",
    slug: "muhammad-anzal",
    name: "Muhammad Anzal",
    role: "AI Developer",
    image: "/brand/team-muhammad-anzal.jpg",
    imagePath: "/brand/team-muhammad-anzal.jpg",
    summary: "Develops AI systems grounded in Python, retrieval workflows and production-ready model integrations.",
    skills: ["Python", "Claude Code", "RAG"],
    linkedinUrl: "https://www.linkedin.com/in/muhammad-anzal-035705348/",
    xUrl: "",
    position: 2,
    published: true,
  },
];
