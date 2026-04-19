import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import WhyUs from "@/components/WhyUs";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesPreview />
      <WhyUs />
      <Stats />
      <Footer />
    </main>
  );
}
