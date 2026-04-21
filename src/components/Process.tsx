"use client";
import { useEffect, useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We jump on a free 30-minute call to understand your goals, challenges, and vision. No pressure, just clarity.",
    icon: "📞",
  },
  {
    step: "02",
    title: "Strategy & Proposal",
    description:
      "We craft a detailed technical roadmap with timelines, tech stack, and transparent pricing — tailored just for you.",
    icon: "📋",
  },
  {
    step: "03",
    title: "Build & Iterate",
    description:
      "Our team builds your solution in sprints, giving you regular updates and demos so you're always in the loop.",
    icon: "⚙️",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "We deploy your product and provide post-launch support to ensure everything runs smoothly at scale.",
    icon: "🚀",
  },
];

export default function Process() {
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
      id="process"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040810 0%, #070d1a 100%)" }}
    >
      {/* Decorative line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 reveal">
          <span className="badge mb-4">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Four simple steps from idea to a live, working AI solution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, i) => (
            <div
              key={step.step}
              className="reveal text-center group"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Step number circle */}
              <div className="relative mx-auto mb-6 w-20 h-20">
                <div className="absolute inset-0 rounded-full border-2 border-gold-500/30 group-hover:border-gold-500/70 transition-colors duration-300" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold-500/10 to-transparent flex items-center justify-center">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <span className="absolute -top-2 -right-2 text-xs font-bold text-gold-500 bg-navy-900 border border-gold-500/30 rounded-full px-2 py-0.5">
                  {step.step}
                </span>
              </div>

              <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
