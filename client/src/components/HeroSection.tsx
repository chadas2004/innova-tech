import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function HeroSection() {
  const whatsappLink = "https://wa.me/22995792329?text=Bonjour,%20je%20suis%20intéressé%20par%20vos%20services%20informatiques";

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Boostez la performance de votre entreprise grâce à la technologie
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Nous créons des solutions informatiques sur-mesure pour propulser la présence et la performance de votre entreprise dans l'ère numérique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                data-testid="button-hero-contact"
                className="text-base"
              >
                Parlez-nous de votre projet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline"
                  data-testid="button-hero-whatsapp"
                  className="w-full sm:w-auto text-base border-whatsapp text-whatsapp hover:bg-whatsapp/10"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactez-nous sur WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-primary via-primary/80 to-accent/80 flex items-center justify-center">
                <svg className="w-3/4 h-3/4 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
