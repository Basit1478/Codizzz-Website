import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Services | Codizzz AI Solutions",
  description: "AI Development, Full Stack, Graphic Design, AI Agents, Digital Employees, Video Editing, Mobile Apps, MS Office automation.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20" style={{ background: "#040810" }} />
      <Services />
      <Process />
      <CTABanner />
      <Footer />
    </main>
  );
}
