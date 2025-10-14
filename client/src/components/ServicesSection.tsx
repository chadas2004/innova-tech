import { Card } from "@/components/ui/card";
import { Code, Laptop, Server, Smartphone, Shield, Settings, GraduationCap, Globe } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Développement Web",
      description: "Sites Internet et applications Web personnalisés, attrayants, fonctionnels et performants qui épousent totalement vos objectifs et l'image de votre entreprise."
    },
    {
      icon: Smartphone,
      title: "Applications Mobiles",
      description: "Conception d'applications mobiles (Android/iOS) de qualité supérieure, intuitives, performantes et conformes aux normes du marché."
    },
    {
      icon: Globe,
      title: "Référencement SEO",
      description: "Service de référencement web complet pour retrouver les premières places dans les moteurs de recherche et augmenter votre visibilité en ligne."
    },
    {
      icon: Server,
      title: "Infrastructure & Hébergement",
      description: "Solutions d'hébergement et serveurs Web rapides, fiables, sécurisés avec emails professionnels et systèmes de sauvegarde permanente."
    },
    {
      icon: Shield,
      title: "Sécurité & Audit",
      description: "Analyse de vos applications et sites Web pour déceler les failles et dysfonctionnements avec des solutions de sécurité adaptées."
    },
    {
      icon: Settings,
      title: "Maintenance & Support",
      description: "Solutions spécifiques pour vos problèmes de performance, bugs, améliorations et gestion de vos sites Internet et applications."
    },
    {
      icon: GraduationCap,
      title: "Formation & Consulting",
      description: "Partage d'expérience à travers des formations et séances de renforcement de capacité pour développer les compétences de votre personnel."
    },
    {
      icon: Laptop,
      title: "Solutions sur-mesure",
      description: "Développement de solutions informatiques personnalisées adaptées aux besoins spécifiques de votre entreprise et de votre secteur."
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Nos Domaines de Compétences
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tout ce que nous pouvons faire pour vous et votre entreprise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer group" 
              data-testid={`card-service-${index}`}
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-block group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
