"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Kuch masla ho gaya. Seedha WhatsApp ya email par rabta karein.");
    } finally {
      setLoading(false);
    }
  };

  const services = [
    "AI Development",
    "Full Stack Development",
    "Graphic Designing",
    "AI Agent",
    "AI Digital Employee",
    "AI Video Editing",
    "Mobile App Development",
    "MS Office & Automation",
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1020 0%, #040810 100%)" }}
    >
      {/* Orbs */}
      <div
        className="orb w-96 h-96 -bottom-32 -left-32 opacity-10"
        style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
      />
      <div
        className="orb w-64 h-64 -top-16 right-0 opacity-10"
        style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — info */}
          <div className="reveal space-y-8">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h3 className="text-white font-bold text-xl mb-4">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: "📧", label: "Email", value: "teamcodizzz@gmail.com", href: "mailto:teamcodizzz@gmail.com" },
                  { icon: "📞", label: "Phone 1", value: "+92 333 2011256", href: "tel:+923332011256" },
                  { icon: "📲", label: "Phone 2", value: "+92 370 3168969", href: "tel:+923703168969" },
                  { icon: "📍", label: "Location", value: "Pakistan (Remote Worldwide)", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-gray-200 text-sm font-medium hover:text-gold-500 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-200 text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="p-6 rounded-2xl border border-gold-500/20 bg-gold-500/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">We&apos;re Available</span>
              </div>
              <p className="text-gray-400 text-sm">
                Typical response time: <span className="text-gold-500 font-semibold">Under 24 hours</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Free consultation for all new projects.
              </p>
            </div>

            {/* Social */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/basit-ali-baloch-738285253/" },
                { label: "GitHub", href: "https://github.com/Basit1478" },
                { label: "Twitter", href: "https://x.com/basitali2405" },
                { label: "Upwork", href: "https://www.upwork.com/freelancers/~01803d6a0410c278de" },
              ].map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-gold-500 hover:border-gold-500/30 text-xs font-medium transition-all duration-200"
                >
                  {platform.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal">
            {submitted ? (
              <div className="p-12 rounded-2xl border border-gold-500/30 bg-gold-500/5 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-white font-bold text-2xl mb-3">Message Sent!</h3>
                <p className="text-gray-400">
                  Thanks for reaching out! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
                    Service Needed
                  </label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    style={{ background: "rgba(10,16,32,0.9)" }}
                  >
                    <option value="" className="text-gray-600">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="text-white bg-navy-800">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                    placeholder="Describe your project, goals, timeline, and budget..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>

                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <p className="text-gray-600 text-xs text-center">
                  By submitting, you agree to our privacy policy. We never spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
