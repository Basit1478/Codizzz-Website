import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = { title: "Start a Build", description: "Tell Codizzz what needs to change in your business or what you want to build." };

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="contact-layout">
        <div className="contact-layout__intro">
          <h1>Bring us the need.</h1>
          <p>Share the friction, workflow or product you are thinking about. You do not need a finished technical brief.</p>
          <div className="contact-direct">
            <a href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com</a>
            <a href="https://wa.me/923332011256" target="_blank" rel="noreferrer">WhatsApp · +92 333 2011256</a>
            <span>Karachi, Pakistan</span>
          </div>
        </div>
        <div className="contact-layout__ticket"><ContactForm /></div>
      </section>
      <Footer />
    </main>
  );
}
