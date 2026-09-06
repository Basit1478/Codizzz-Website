import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = { title: "Start a Build", description: "Tell Codizzz what needs to change in your business or what you want to build." };

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="contact-section" aria-labelledby="contact-title">
        <div className="contact-section__statement" aria-hidden="true">Let&apos;s build</div>
        <div className="contact-section__frame">
          <div className="contact-layout">
            <div className="contact-layout__intro">
              <div>
                <h1 id="contact-title">Bring us<br />the need.</h1>
                <p>Share the friction, workflow or product you are thinking about. You do not need a finished technical brief.</p>
              </div>
              <div className="contact-direct">
                <a href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com</a>
                <a href="https://wa.me/923703168969" target="_blank" rel="noreferrer">WhatsApp · +92 370 3168969</a>
                <span>Karachi, Pakistan</span>
              </div>
            </div>
            <div className="contact-layout__ticket"><ContactForm /></div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
