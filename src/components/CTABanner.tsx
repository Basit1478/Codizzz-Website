import Link from "next/link";

export default function CTABanner() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #070d1a 0%, #0a1020 100%)" }}
    >
      {/* Glow orb */}
      <div
        className="orb w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="badge mb-6">Ready to Start?</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
          Build Something <span className="gradient-text">Amazing</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          Join 30+ businesses that trust Codizzz to power their AI transformation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services" className="btn-primary text-base w-full sm:w-auto text-center">
            Explore Services
          </Link>
          <Link href="/contact" className="btn-outline text-base w-full sm:w-auto text-center">
            Book a Free Call
          </Link>
        </div>
      </div>
    </section>
  );
}
