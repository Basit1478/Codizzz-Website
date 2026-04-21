"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const preview = [
  { icon: "🤖", title: "AI Development", desc: "Custom LLM apps, RAG systems, AI chatbots and automation pipelines.", color: "from-yellow-500/20 to-orange-500/10" },
  { icon: "💻", title: "Full Stack Development", desc: "Next.js, FastAPI, PostgreSQL — complete web applications end to end.", color: "from-blue-500/20 to-cyan-500/10" },
  { icon: "🧠", title: "AI Agent", desc: "Autonomous agents that research, reason, and execute tasks 24/7.", color: "from-emerald-500/20 to-teal-500/10" },
  { icon: "👤", title: "AI Digital Employee", desc: "AI that handles emails, reports, CRM, and business ops round the clock.", color: "from-violet-500/20 to-indigo-500/10" },
];

export default function ServicesPreview() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => {
      el.classList.add("hidden-init");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24"
      style={{ background: "linear-gradient(180deg, #0a1020 0%, #070d1a 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 reveal">
          <span className="badge mb-4">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Our <span className="gradient-text">Core Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Eight AI-powered services to grow, automate, and scale your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {preview.map((s, i) => (
            <div
              key={s.title}
              className="service-card reveal rounded-2xl p-6"
              style={{ background: "rgba(10,16,32,0.8)", transitionDelay: `${i * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 bg-gradient-to-br ${s.color}`}>
                {s.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center reveal">
          <Link href="/services" className="btn-outline inline-block">
            View All 8 Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
