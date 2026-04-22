import Navbar from "@/components/Navbar";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "AgentHub — Our Product",
  description:
    "AgentHub is Codizzz's flagship AI product — a powerful platform for building, deploying, and managing AI agents for your business.",
  alternates: {
    canonical: "https://codizzz.com/product",
  },
  openGraph: {
    title: "AgentHub | AI Agent Platform by Codizzz",
    description:
      "Meet AgentHub — the AI agent platform built by Codizzz to automate your business workflows intelligently.",
    url: "https://codizzz.com/product",
  },
};

const features = [
  {
    icon: "⚡",
    title: "Deploy Agents Instantly",
    desc: "Launch AI agents in minutes — no complex setup, no infrastructure headaches. Just connect and go.",
  },
  {
    icon: "🧠",
    title: "Intelligent Automation",
    desc: "Agents that think, plan, and act autonomously to handle repetitive tasks across your business.",
  },
  {
    icon: "🔗",
    title: "Seamless Integrations",
    desc: "Connect with your existing tools — CRMs, databases, APIs, and more with zero friction.",
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    desc: "Monitor agent performance, track tasks completed, and get insights in a clean dashboard.",
  },
  {
    icon: "🔒",
    title: "Enterprise-Grade Security",
    desc: "Your data stays yours. End-to-end encryption and full access controls built in from day one.",
  },
  {
    icon: "🌐",
    title: "Multi-Channel Support",
    desc: "Deploy agents across web, WhatsApp, email, and more — wherever your customers are.",
  },
];

export default function ProductPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-24 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, var(--bg-1) 0%, var(--bg-3) 100%)" }}
      >
        <div
          className="orb w-[500px] h-[500px] -top-32 left-1/2 -translate-x-1/2 opacity-10"
          style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="badge mb-5">Our Product</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Meet <span className="gradient-text">AgentHub</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            The AI agent platform built by Codizzz to automate your business workflows — intelligently, reliably, and at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://agenthubpk.site"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base w-full sm:w-auto text-center"
            >
              Visit AgentHub →
            </a>
            <Link href="/contact" className="btn-outline text-base w-full sm:w-auto text-center">
              Get Early Access
            </Link>
          </div>
        </div>
      </section>

      {/* What is AgentHub */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, var(--bg-3) 0%, var(--bg-2) 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="badge mb-5">What is AgentHub?</span>
            <h2 className="text-4xl font-black text-white mb-6">
              Your Business on <span className="gradient-text">Autopilot</span>
            </h2>
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                AgentHub is Codizzz's flagship product — a platform designed to make AI agents accessible to every business, regardless of technical expertise.
              </p>
              <p>
                From customer support to lead generation, from data processing to workflow automation —{" "}
                <span className="text-gold-500 font-semibold">AgentHub handles it all so your team can focus on what truly matters.</span>
              </p>
              <p>
                Built with the same cutting-edge AI technology we use for our clients, AgentHub is the fastest way to bring intelligent automation into your business.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="https://agenthubpk.site"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm inline-block"
              >
                Explore agenthubpk.site →
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {[
              { label: "Tasks Automated", value: "10K+" },
              { label: "Agents Deployed", value: "100+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Businesses Served", value: "20+" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center hover:border-gold-500/20 transition-all duration-300"
              >
                <div className="stat-number mb-1">{item.value}</div>
                <p className="text-gray-500 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="badge mb-5">Features</span>
            <h2 className="text-4xl font-black text-white mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Automate</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              AgentHub is packed with powerful features designed to make AI automation simple and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold-500/20 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gold-500 transition-colors duration-200">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to AgentHub */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--bg-2) 0%, var(--bg-3) 100%)" }}
      >
        <div
          className="orb w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
          style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="badge mb-6">Try AgentHub</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Ready to Put Your Business on{" "}
            <span className="gradient-text">Autopilot?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            Visit AgentHub and start automating your workflows with AI agents today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://agenthubpk.site"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base w-full sm:w-auto text-center"
            >
              Go to agenthubpk.site →
            </a>
            <Link href="/contact" className="btn-outline text-base w-full sm:w-auto text-center">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
