"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.4 + 0.05,
        opacity: Math.random(),
      });
    }

    let animId: number;
    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.opacity += s.speed * 0.015;
        if (s.opacity > 1) s.speed = -Math.abs(s.speed);
        if (s.opacity < 0) s.speed = Math.abs(s.speed);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 197, 24, ${Math.abs(s.opacity) * 0.55})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 60%, var(--bg-3) 100%)",
        paddingTop: "80px",
        paddingBottom: "40px",
      }}
    >
      {/* Stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,197,24,0.07) 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,197,24,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
          style={{
            background: "rgba(245,197,24,0.08)",
            borderColor: "rgba(245,197,24,0.25)",
            animation: "fadeIn 0.6s ease forwards",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">
            Est. 2025 &mdash; AI Solutions Agency
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-black leading-tight mb-6"
          style={{
            fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
            animation: "slideUp 0.7s ease 0.1s both",
          }}
        >
          <span className="text-white">We Build the</span>
          <br />
          <span className="gradient-text">Future with AI</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            animation: "slideUp 0.7s ease 0.2s both",
          }}
        >
          From AI Agents to Full Stack Apps — Codizzz delivers intelligent
          solutions that automate, scale, and transform your business.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          style={{ animation: "slideUp 0.7s ease 0.3s both" }}
        >
          <Link href="/services" className="btn-primary text-sm sm:text-base w-full sm:w-auto text-center">
            Explore Services
          </Link>
          <Link href="/contact" className="btn-outline text-sm sm:text-base w-full sm:w-auto text-center">
            Book a Free Call
          </Link>
        </div>

        {/* Tech chips */}
        <div
          className="flex flex-wrap justify-center gap-2"
          style={{ animation: "fadeIn 0.8s ease 0.5s both" }}
        >
          {["Claude AI", "Next.js", "React Native", "Python", "FastAPI", "n8n"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-medium text-gray-500 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] tracking-widest uppercase text-gray-600">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-yellow-500 to-transparent" />
      </div>
    </section>
  );
}
