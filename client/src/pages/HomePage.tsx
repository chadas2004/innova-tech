import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ThemeToggle from "@/components/ThemeToggle";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AnnouncementBanner />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <ThemeToggle />
    </div>
  );
}
