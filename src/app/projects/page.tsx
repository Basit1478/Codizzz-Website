import Navbar from "@/components/Navbar";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects",
  description:
    "Explore the portfolio of projects built by the Codizzz team — from AI-powered apps to full-stack web solutions.",
  alternates: {
    canonical: "https://codizzz.com/projects",
  },
  openGraph: {
    title: "Our Projects | Codizzz",
    description:
      "Explore the portfolio of projects built by the Codizzz team — from AI-powered apps to full-stack web solutions.",
    url: "https://codizzz.com/projects",
  },
};

const projects = [
  {
    title: "TodoApp — Task Manager",
    description:
      "A cloud-based task management platform for team collaboration. Features task creation, assignment, priority tracking, color-coded categories, real-time dashboard with analytics, and email notifications. Built for teams to organize work and meet deadlines seamlessly.",
    tech: ["Next.js", "FastAPI", "Python"],
    link: "https://todo-app-cc.vercel.app/",
    member: "Umer Ali",
    category: "Full Stack",
  },
  {
    title: "Todo AI Chatbot",
    description:
      "An AI-powered task management app that lets users manage tasks through natural language commands. Simply type conversational commands like 'Add buy groceries' or 'Show my pending tasks' — no complex UI needed. Includes a productivity dashboard with 7-day activity tracking.",
    tech: ["Next.js", "FastAPI", "AI/NLP"],
    link: "https://hackathon-ii-phase3.vercel.app/",
    member: "Umer Ali",
    category: "AI App",
  },
  {
    title: "TaskMaster Pro",
    description:
      "A modern, minimal task management application with a sleek gradient-based UI. Features light and dark mode with system preference detection, responsive design, and smooth theme transitions. Focused on clean UX and efficient task organization.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    link: "https://phase2todo.vercel.app/",
    member: "Basit Ali",
    category: "Full Stack",
  },
  {
    title: "TaskMaster Pro AI",
    description:
      "An AI-powered task management assistant that combines intelligent planning with project management. Features include an authentication system, AI-driven task organization, a guided workflow, and full dark/light mode support.",
    tech: ["Next.js", "FastAPI", "AI"],
    link: "https://phase-3-ai-assistant.vercel.app/",
    member: "Basit Ali",
    category: "AI App",
  },
  {
    title: "Cloud Deployed App",
    description:
      "A full-stack application deployed on AWS EC2, demonstrating cloud infrastructure skills including server setup, deployment pipelines, and production-level hosting on Amazon Web Services.",
    tech: ["AWS EC2", "Cloud", "DevOps"],
    link: "http://ec2-13-201-0-57.ap-south-1.compute.amazonaws.com/",
    member: "Basit Ali",
    category: "Cloud/DevOps",
  },
  {
    title: "Infology — Blog Platform",
    description:
      "A multi-category blog platform for discovering articles on technology, lifestyle, and wellness. Features organized content sections (New, Latest, Informative), newsletter subscription, social media integration, and a responsive card-based UI with an orange accent theme.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    link: "https://infology.vercel.app/",
    member: "Basit Ali",
    category: "Full Stack",
  },
  {
    title: "Avion — Furniture E-Commerce",
    description:
      "A luxury furniture and homeware e-commerce store featuring product categories like ceramics, furniture, tableware, and plant pots. Includes product listings with pricing, brand storytelling, newsletter signup, and a clean, elegant design emphasizing tasteful typography and modern aesthetics.",
    tech: ["Next.js", "React", "E-Commerce"],
    link: "https://avion-website.vercel.app/",
    member: "Basit Ali",
    category: "E-Commerce",
  },
];

const categoryColors: Record<string, string> = {
  "Full Stack": "from-blue-500 to-cyan-400",
  "AI App": "from-purple-500 to-pink-400",
  "Cloud/DevOps": "from-green-500 to-emerald-400",
  "E-Commerce": "from-orange-500 to-yellow-400",
};

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-20 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-1) 0%, var(--bg-3) 100%)",
        }}
      >
        <div
          className="orb w-80 h-80 -top-20 left-1/2 -translate-x-1/2 opacity-10"
          style={{
            background:
              "radial-gradient(circle, #f5c518 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge mb-5">Our Work</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Our <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            A showcase of real-world projects built by our team — from
            AI-powered applications and cloud deployments to full-stack web
            solutions and e-commerce platforms.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-3) 0%, var(--bg-2) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Category + Member */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full text-white bg-gradient-to-r ${
                      categoryColors[project.category] ||
                      "from-gold-500 to-orange-500"
                    }`}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    by {project.member}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-500 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link indicator */}
                <div className="flex items-center gap-2 text-gold-500 text-sm font-semibold">
                  <span>View Live</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Total Projects", value: "7+" },
              { label: "AI-Powered Apps", value: "2" },
              { label: "Team Members", value: "3" },
              { label: "Technologies Used", value: "10+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center"
              >
                <div className="stat-number mb-1">{stat.value}</div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
