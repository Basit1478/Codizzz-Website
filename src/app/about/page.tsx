import Navbar from "@/components/Navbar";
import WhyUs from "@/components/WhyUs";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Codizzz — a Pakistan-based AI Solutions Agency founded in 2025. Meet our team of AI engineers, full stack developers, and designers building intelligent solutions for businesses worldwide.",
  alternates: {
    canonical: "https://codizzz.com/about",
  },
  openGraph: {
    title: "About Codizzz | AI Solutions Agency",
    description:
      "Meet the team behind Codizzz — AI engineers and developers building smart solutions for businesses worldwide.",
    url: "https://codizzz.com/about",
  },
};

const team = [
  {
    name: "Basit Ali", role: "Founder & AI Engineer", avatar: "BA",
    skills: ["LLM Systems", "Full Stack", "AI Agents", "Python", "Claude API", "RAG", "Graphic Design"],
    social: { github: "https://github.com/Basit1478", linkedin: "https://www.linkedin.com/in/basit-ali-baloch-738285253/", twitter: "https://x.com/basitali2405" }
  },
  {
    name: "Umer Ali", role: "Agentic Developer", avatar: "UA",
    skills: ["Next.js", "React", "Python", "TypeScript", "AI Agents"],
    social: { github: "https://github.com/umerali_4", linkedin: "https://www.linkedin.com/in/umer-ali-a962252ba/", twitter: "https://x.com/umerali4" }
  },
  {
    name: "Muhammad Anzal", role: "AI Developer", avatar: "MA",
    skills: ["Python", "Claude API", "RAG"],
    social: { github: "", linkedin: "https://www.linkedin.com/in/muhammad-anzal-035705348/", twitter: "" }
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #040810 0%, #0a1020 100%)" }}
      >
        <div
          className="orb w-80 h-80 -top-20 left-1/2 -translate-x-1/2 opacity-10"
          style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge mb-5">Est. 2025 — Pakistan</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            About <span className="gradient-text">Codizzz</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Codizzz is an AI Solutions Agency born in 2025 with a simple mission:
            make powerful AI accessible to every business. We combine deep
            technical expertise with creative design to deliver solutions that
            actually move the needle.
          </p>
        </div>
      </section>

      {/* Story */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, #0a1020 0%, #070d1a 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="badge mb-5">Our Story</span>
            <h2 className="text-4xl font-black text-white mb-6">
              Built by <span className="gradient-text">Builders</span>
            </h2>
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                Codizzz was founded by developers who were tired of seeing businesses
                struggle with outdated systems while AI was transforming everything
                around them.
              </p>
              <p>
                We started with a simple question: <span className="text-gold-500 font-semibold">what if every business had access to a dedicated AI team?</span>{" "}
                That question became Codizzz.
              </p>
              <p>
                Today we build AI Agents, Full Stack Apps, AI Digital Employees, and
                more — for startups, SMEs, and enterprises across the world. All
                remotely, all with the same passion for excellence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {[
              { label: "Founded", value: "2025" },
              { label: "Services", value: "8+" },
              { label: "Projects", value: "50+" },
              { label: "Countries Served", value: "10+" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center"
              >
                <div className="stat-number mb-1">{item.value}</div>
                <p className="text-gray-500 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, #070d1a 0%, #040810 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="badge mb-5">The Team</span>
            <h2 className="text-4xl font-black text-white mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              A small but mighty team of AI engineers, developers, and designers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold-500/20 transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-navy-900 mx-auto mb-5">
                  {member.avatar}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-gold-500 text-xs font-semibold tracking-wide uppercase mb-5">
                  {member.role}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-3">
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500/30 text-xs font-bold transition-all">
                    GH
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500/30 text-xs font-bold transition-all">
                    LI
                  </a>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500/30 text-xs font-bold transition-all">
                    TW
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <CTABanner />
      <Footer />
    </main>
  );
}
