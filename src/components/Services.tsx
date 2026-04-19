"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    icon: "🤖",
    title: "AI Development",
    subtitle: "Custom AI Systems",
    description:
      "We build custom AI models, LLM integrations, and intelligent automation systems tailored to your business needs.",
    features: ["LLM Fine-tuning", "RAG Systems", "AI Chatbots", "Custom Models"],
    color: "from-yellow-500/20 to-orange-500/10",
    border: "hover:border-yellow-500/50",
  },
  {
    icon: "💻",
    title: "Full Stack Development",
    subtitle: "End-to-End Web Apps",
    description:
      "Modern, scalable web applications built with Next.js, React, FastAPI, and cloud-native architectures.",
    features: ["Next.js / React", "FastAPI / Node.js", "PostgreSQL / MongoDB", "AWS / GCP"],
    color: "from-blue-500/20 to-cyan-500/10",
    border: "hover:border-blue-500/50",
  },
  {
    icon: "🎨",
    title: "Graphic Designing",
    subtitle: "Brand & Visual Identity",
    description:
      "Stunning brand identities, UI/UX designs, social media graphics, and visual content that stands out.",
    features: ["Logo & Branding", "UI/UX Design", "Social Media Kit", "Motion Graphics"],
    color: "from-pink-500/20 to-purple-500/10",
    border: "hover:border-pink-500/50",
  },
  {
    icon: "🧠",
    title: "AI Agent",
    subtitle: "Autonomous AI Workers",
    description:
      "Deploy intelligent AI agents that research, analyze, write, and execute multi-step tasks fully autonomously.",
    features: ["Multi-step Reasoning", "Tool Use & APIs", "Memory & Context", "Auto-execution"],
    color: "from-emerald-500/20 to-teal-500/10",
    border: "hover:border-emerald-500/50",
  },
  {
    icon: "👤",
    title: "AI Digital Employee",
    subtitle: "24/7 AI Workforce",
    description:
      "Your always-on AI team member — handles emails, reports, customer queries, and business ops round the clock.",
    features: ["Email Automation", "Report Generation", "CRM Integration", "24/7 Operation"],
    color: "from-violet-500/20 to-indigo-500/10",
    border: "hover:border-violet-500/50",
  },
  {
    icon: "🎬",
    title: "AI Video Editing",
    subtitle: "Smart Video Production",
    description:
      "AI-powered video editing, auto-captioning, voice cloning, faceless content, and YouTube automation.",
    features: ["Auto-editing", "AI Captions", "Voice Cloning", "Faceless Videos"],
    color: "from-red-500/20 to-rose-500/10",
    border: "hover:border-red-500/50",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    subtitle: "iOS & Android Apps",
    description:
      "Cross-platform mobile applications with React Native and Flutter — smooth, performant, and production-ready.",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Launch"],
    color: "from-sky-500/20 to-blue-500/10",
    border: "hover:border-sky-500/50",
  },
  {
    icon: "📊",
    title: "MS Office & Automation",
    subtitle: "Productivity Systems",
    description:
      "Excel macros, Power BI dashboards, Word templates, automated reports, and complete Microsoft ecosystem solutions.",
    features: ["Excel & VBA", "Power BI", "SharePoint", "Office Automation"],
    color: "from-green-500/20 to-lime-500/10",
    border: "hover:border-green-500/50",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => {
      el.classList.add("hidden-init");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1020 0%, #070d1a 100%)" }}
    >
      {/* Background orb */}
      <div
        className="orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"
        style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="badge mb-4">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Eight specialized services powered by cutting-edge AI to accelerate
            your growth.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`service-card reveal rounded-2xl p-6 cursor-pointer ${service.border}`}
              style={{
                background: "rgba(10, 16, 32, 0.8)",
                animationDelay: `${i * 0.1}s`,
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 bg-gradient-to-br ${service.color}`}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-1">{service.title}</h3>
              <p className="text-gold-500 text-xs font-semibold tracking-wide uppercase mb-3">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
