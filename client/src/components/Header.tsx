import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import logoImage from "@assets/generated_images/Africa_Infotech_Innovation_logo_d714841a.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const whatsappLink = "https://wa.me/22995792329?text=Bonjour,%20je%20suis%20intéressé%20par%20vos%20services%20informatiques";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Africa Infotech Innovation" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-display font-bold text-foreground">
              Africa Infotech Innovation
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("accueil")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="nav-accueil"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="nav-services"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("apropos")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="nav-apropos"
            >
              À Propos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-whatsapp hover:bg-whatsapp/90 text-white" data-testid="button-whatsapp-header">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col p-6 gap-4">
            <button
              onClick={() => scrollToSection("accueil")}
              className="text-left text-foreground font-medium hover-elevate px-3 py-2 rounded-md"
              data-testid="nav-mobile-accueil"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-left text-foreground font-medium hover-elevate px-3 py-2 rounded-md"
              data-testid="nav-mobile-services"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("apropos")}
              className="text-left text-foreground font-medium hover-elevate px-3 py-2 rounded-md"
              data-testid="nav-mobile-apropos"
            >
              À Propos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-foreground font-medium hover-elevate px-3 py-2 rounded-md"
              data-testid="nav-mobile-contact"
            >
              Contact
            </button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-2">
              <Button className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white" data-testid="button-whatsapp-mobile">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
