import { Card } from "@/components/ui/card";
import { Target, Users, Award, TrendingUp } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: Target,
      title: "Expertise du marché africain",
      description: "Une compréhension approfondie des besoins spécifiques des entreprises africaines"
    },
    {
      icon: Users,
      title: "Support 24/7",
      description: "Une équipe dédiée disponible pour vous accompagner à tout moment"
    },
    {
      icon: Award,
      title: "Solutions de pointe",
      description: "Technologies modernes et innovantes adaptées à vos objectifs"
    },
    {
      icon: TrendingUp,
      title: "Résultats prouvés",
      description: "Un historique de projets réussis et de clients satisfaits"
    }
  ];

  return (
    <section id="apropos" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Africa Infotech Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nous existons pour informer, conseiller et mettre à la disposition des entreprises ambitieuses qui souhaitent se démarquer, des solutions digitales spécifiques, performantes et rentables.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover-elevate transition-all" data-testid={`card-feature-${index}`}>
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
            Notre Mission
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Africa Infotech Innovation est née dans l'optique d'aider et d'accompagner les entreprises à passer efficacement le cap du digital. Nous associons une stratégie numérique optimale pour vous permettre de vous démarquer, devenir plus efficaces, produire de meilleurs résultats et atteindre efficacement vos objectifs de croissance.
          </p>
        </div>
      </div>
    </section>
  );
}
