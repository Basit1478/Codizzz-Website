import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | Codizzz AI Solutions",
  description: "Get in touch with Codizzz — free consultation for AI development, full stack apps, AI agents, and more.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section
        className="pt-32 pb-8 text-center"
        style={{ background: "linear-gradient(180deg, #040810 0%, #0a1020 100%)" }}
      >
        <span className="badge mb-5">Free Consultation</span>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
          Let&apos;s <span className="gradient-text">Talk</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto px-6">
          Tell us about your project and we&apos;ll get back to you within 24 hours
          with a tailored proposal.
        </p>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}
