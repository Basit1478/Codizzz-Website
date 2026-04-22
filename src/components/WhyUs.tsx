"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const reasons = [
  {
    icon: "⚡",
    title: "AI-First Approach",
    description:
      "Every solution we build is designed with AI at its core — not as an afterthought but as the foundation.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    description:
      "We move with startup speed. From concept to deployment, we deliver production-ready solutions rapidly.",
  },
  {
    icon: "🎯",
    title: "Results-Driven",
    description:
      "We measure success by your ROI. Our solutions are built to solve real business problems, not just look good.",
  },
  {
    icon: "🔒",
    title: "Secure & Scalable",
    description:
      "Enterprise-grade security, cloud-native infrastructure, and architectures that grow with your business.",
  },
  {
    icon: "🤝",
    title: "Dedicated Support",
    description:
      "You get direct access to your team. No ticket queues — real humans who care about your project.",
  },
  {
    icon: "💡",
    title: "Cutting-Edge Stack",
    description:
      "We use the latest AI models, frameworks, and tools — Claude,  Next.js, and cloud platforms.",
  },
];

export default function WhyUs() {
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
      id="why-us"
      ref={sectionRef}
      className="relative py-24"
      style={{ background: "linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="badge mb-4">Why Codizzz</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Why Choose <span className="gradient-text">Us?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We combine deep technical expertise with genuine passion for AI to
            deliver solutions that actually work.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="reveal group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-gold-500/20 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{reason.title}</h3>
              <p className="text-gray-400 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center reveal">
          <p className="text-gray-400 mb-6 text-lg">
            Ready to transform your business with AI?
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Start Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}
