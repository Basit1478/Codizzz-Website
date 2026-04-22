"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "", label: "Core Services" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Startup Founder",
    content:
      "Codizzz built our entire AI chatbot system in 2 weeks. The quality was exceptional — it handles 90% of our customer queries automatically.",
    avatar: "AR",
  },
  {
    name: "Sara Khan",
    role: "E-commerce Owner",
    content:
      "The AI Digital Employee they built for us does the work of 3 full-time staff. We're saving thousands every month.",
    avatar: "SK",
  },
  {
    name: "Hassan Ali",
    role: "Marketing Director",
    content:
      "Their AI video editing service transformed our content pipeline. We now produce 10x more content with the same team.",
    avatar: "HA",
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1800, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center p-8">
      <div className="stat-number mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-400 font-medium">{label}</p>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
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
      id="stats"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #070d1a 0%, #0a1020 100%)" }}
    >
      {/* Stats bar */}
      <div
        className="reveal max-w-5xl mx-auto px-4 sm:px-6 mb-20 rounded-2xl border border-gold-500/20 gold-glow"
        style={{ background: "rgba(245,197,24,0.03)" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <span className="badge mb-4">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            What Clients <span className="gradient-text">Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="reveal p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold-500/20 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-gold-500 text-sm">★</span>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-orange-500 flex items-center justify-center text-sm font-bold text-navy-900">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
