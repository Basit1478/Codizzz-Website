import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Services",
  description:
    "Explore Codizzz services: AI Development, AI Agents, AI Digital Employees, Full Stack Web Apps, Mobile App Development, Graphic Design, AI Video Editing, and MS Office Automation.",
  alternates: {
    canonical: "https://codizzz.com/services",
  },
  openGraph: {
    title: "Services | Codizzz AI Solutions Agency",
    description:
      "From AI Agents to Full Stack Apps — explore all 8 services offered by Codizzz for businesses worldwide.",
    url: "https://codizzz.com/services",
  },
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
