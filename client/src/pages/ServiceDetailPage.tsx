import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ThemeToggle from "@/components/ThemeToggle";

import webDevImage from "@assets/generated_images/Web_development_service_image_a4093269.png";
import mobileDevImage from "@assets/generated_images/Mobile_app_development_image_af9df12f.png";
import seoImage from "@assets/generated_images/SEO_services_image_fb98810b.png";
import hostingImage from "@assets/generated_images/Hosting_infrastructure_image_47c6620f.png";
import securityImage from "@assets/generated_images/Security_audit_service_image_a3a0089b.png";
import maintenanceImage from "@assets/generated_images/Maintenance_support_service_image_4a9401bf.png";
import trainingImage from "@assets/generated_images/Training_consulting_service_image_2df3eaa0.png";
import customImage from "@assets/generated_images/Custom_solutions_service_image_c0c4bac8.png";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  process: string[];
}

const services: Record<string, ServiceDetail> = {
  "developpement-web": {
    id: "developpement-web",
    title: "Développement Web",
    description: "Nous vous concevons des sites Internet et des applications Web personnalisés, attrayants, fonctionnels et performants qui épousent totalement vos objectifs, votre vision et l'image de votre entreprise.",
    image: webDevImage,
    features: [
      "Sites Internet sur-mesure et responsive",
      "Applications Web progressives (PWA)",
      "E-commerce et plateformes de vente en ligne",
      "Systèmes de gestion de contenu (CMS)",
      "Tableaux de bord et interfaces d'administration",
      "Intégration d'API et services tiers"
    ],
    benefits: [
      "Design moderne et attrayant adapté à votre marque",
      "Performance optimale pour une expérience utilisateur fluide",
      "Compatible sur tous les appareils (desktop, tablette, mobile)",
      "Optimisé pour les moteurs de recherche (SEO)",
      "Sécurité renforcée et protection des données",
      "Maintenance et support technique continu"
    ],
    process: [
      "Analyse de vos besoins et définition du cahier des charges",
      "Conception de l'architecture et du design",
      "Développement et intégration des fonctionnalités",
      "Tests rigoureux et optimisation des performances",
      "Déploiement et mise en ligne",
      "Formation et accompagnement post-lancement"
    ]
  },
  "applications-mobiles": {
    id: "applications-mobiles",
    title: "Applications Mobiles",
    description: "Importez votre business dans le smartphone de vos prospects en concevant des applications mobiles (Android/iOS) de qualité supérieure, intuitive, performante et conforme aux normes du marché.",
    image: mobileDevImage,
    features: [
      "Applications natives pour iOS et Android",
      "Applications hybrides multi-plateformes",
      "Interface utilisateur intuitive et moderne",
      "Intégration avec les services cloud",
      "Notifications push et messages in-app",
      "Paiement mobile sécurisé"
    ],
    benefits: [
      "Présence directe dans la poche de vos clients",
      "Engagement utilisateur accru avec les notifications",
      "Fonctionnalités hors ligne disponibles",
      "Performance native optimale",
      "Utilisation des fonctionnalités du téléphone (caméra, GPS, etc.)",
      "Mise à jour régulière et évolutivité"
    ],
    process: [
      "Étude de marché et analyse concurrentielle",
      "Conception UX/UI et prototypage",
      "Développement natif ou hybride selon vos besoins",
      "Tests sur différents appareils et systèmes",
      "Publication sur App Store et Google Play",
      "Suivi des performances et mises à jour régulières"
    ]
  },
  "referencement-seo": {
    id: "referencement-seo",
    title: "Référencement SEO",
    description: "Retrouvez les premières places dans les moteurs de recherche (Google, Yahoo!, Bing, Baidu et Yandex) grâce à un service de référencement web complet, optimal, efficace, basé sur votre marché.",
    image: seoImage,
    features: [
      "Audit SEO complet de votre site",
      "Optimisation on-page et technique",
      "Recherche et stratégie de mots-clés",
      "Création de contenu optimisé",
      "Link building et netlinking",
      "SEO local pour votre zone géographique"
    ],
    benefits: [
      "Visibilité accrue sur les moteurs de recherche",
      "Trafic organique qualifié vers votre site",
      "Meilleur positionnement face à vos concurrents",
      "Retour sur investissement mesurable",
      "Autorité et crédibilité renforcées",
      "Résultats durables dans le temps"
    ],
    process: [
      "Audit SEO initial et analyse de la concurrence",
      "Définition de la stratégie de référencement",
      "Optimisation technique du site",
      "Création de contenu SEO-friendly",
      "Campagne de netlinking ciblée",
      "Reporting mensuel et ajustements continus"
    ]
  },
  "hebergement": {
    id: "hebergement",
    title: "Hébergement & Infrastructure",
    description: "Nous offrons des solutions d'hébergement et des serveurs Web rapides, fiables, sécurisés et personnalisables selon vos besoins avec des emails professionnels et des systèmes de sauvegarde permanente.",
    image: hostingImage,
    features: [
      "Hébergement Web haute performance",
      "Serveurs dédiés et VPS",
      "Emails professionnels personnalisés",
      "Certificats SSL et sécurité",
      "Sauvegarde automatique quotidienne",
      "Support technique 24/7"
    ],
    benefits: [
      "Temps de chargement ultra-rapide",
      "Disponibilité garantie 99.9%",
      "Protection contre les cyberattaques",
      "Scalabilité selon vos besoins",
      "Données sécurisées et sauvegardées",
      "Support réactif en français"
    ],
    process: [
      "Évaluation de vos besoins en infrastructure",
      "Choix de la solution d'hébergement adaptée",
      "Configuration et migration de vos données",
      "Installation des mesures de sécurité",
      "Configuration des emails professionnels",
      "Monitoring continu et maintenance proactive"
    ]
  },
  "securite-audit": {
    id: "securite-audit",
    title: "Sécurité & Audit",
    description: "Nous analysons vos applications et sites Web afin de déceler les insuffisances ainsi que les différentes failles et dysfonctionnements auxquelles nous apportons des solutions idoines.",
    image: securityImage,
    features: [
      "Audit de sécurité complet",
      "Test de pénétration (Pentest)",
      "Analyse des vulnérabilités",
      "Conformité RGPD et normes de sécurité",
      "Protection contre les attaques DDoS",
      "Chiffrement et sécurisation des données"
    ],
    benefits: [
      "Protection renforcée de vos données",
      "Conformité aux réglementations",
      "Détection précoce des failles de sécurité",
      "Confiance accrue de vos clients",
      "Réduction des risques cyber",
      "Rapport détaillé et recommandations"
    ],
    process: [
      "Analyse préliminaire de votre infrastructure",
      "Audit de sécurité approfondi",
      "Tests d'intrusion et de vulnérabilité",
      "Rapport complet avec recommandations",
      "Implémentation des correctifs de sécurité",
      "Surveillance continue et mises à jour"
    ]
  },
  "maintenance-support": {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description: "Nous apportons des solutions spécifiques à vos problèmes de performance, de bug, d'amélioration, de site Internet mal conçu ou de gestion de vos différents sites Internet, applications Web et solutions mobiles.",
    image: maintenanceImage,
    features: [
      "Maintenance préventive et corrective",
      "Support technique réactif",
      "Correction de bugs et erreurs",
      "Optimisation des performances",
      "Mises à jour régulières",
      "Monitoring 24/7"
    ],
    benefits: [
      "Disponibilité continue de vos services",
      "Performance optimale maintenue",
      "Résolution rapide des problèmes",
      "Coûts prévisibles et maîtrisés",
      "Tranquillité d'esprit totale",
      "Évolution constante de votre plateforme"
    ],
    process: [
      "Diagnostic initial de vos systèmes",
      "Mise en place du plan de maintenance",
      "Monitoring proactif et alertes",
      "Intervention rapide en cas de problème",
      "Rapports mensuels de performance",
      "Planification des améliorations futures"
    ]
  },
  "formation-consulting": {
    id: "formation-consulting",
    title: "Formation & Consulting",
    description: "Nous partageons avec vous notre expérience du métier à travers des formations et des séances de renforcement de capacité pour vous permettre de développer vos compétences et celles de votre personnel.",
    image: trainingImage,
    features: [
      "Formations sur-mesure adaptées",
      "Ateliers pratiques et interactifs",
      "Consulting stratégique IT",
      "Accompagnement à la transformation digitale",
      "Formation continue de vos équipes",
      "Certification et validation des acquis"
    ],
    benefits: [
      "Montée en compétence rapide de vos équipes",
      "Autonomie accrue dans la gestion IT",
      "Stratégie digitale optimisée",
      "Meilleure adoption des technologies",
      "ROI mesurable sur la formation",
      "Support personnalisé et suivi"
    ],
    process: [
      "Analyse de vos besoins en formation",
      "Conception du programme personnalisé",
      "Sessions de formation théorique et pratique",
      "Mise en pratique avec cas réels",
      "Évaluation et certification",
      "Suivi post-formation et accompagnement"
    ]
  },
  "solutions-sur-mesure": {
    id: "solutions-sur-mesure",
    title: "Solutions sur-mesure",
    description: "Développement de solutions informatiques personnalisées adaptées aux besoins spécifiques de votre entreprise et de votre secteur d'activité.",
    image: customImage,
    features: [
      "Analyse approfondie de vos besoins",
      "Architecture logicielle adaptée",
      "Intégration avec vos systèmes existants",
      "Solutions évolutives et scalables",
      "Interface utilisateur intuitive",
      "Documentation complète"
    ],
    benefits: [
      "Solution parfaitement adaptée à votre métier",
      "Avantage concurrentiel unique",
      "Processus métier optimisés",
      "Réduction des coûts opérationnels",
      "Productivité accrue",
      "Propriété complète du code source"
    ],
    process: [
      "Étude détaillée de vos processus métier",
      "Conception de l'architecture technique",
      "Développement itératif avec validations",
      "Tests fonctionnels et UAT",
      "Déploiement progressif",
      "Formation et transfert de compétences"
    ]
  }
};

export default function ServiceDetailPage() {
  const [, params] = useRoute("/service/:id");
  const serviceId = params?.id || "";
  const service = services[serviceId];

  const whatsappLink = "https://wa.me/22995792329?text=Bonjour,%20je%20suis%20intéressé%20par%20le%20service%20" + encodeURIComponent(service?.title || "");

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service non trouvé</h1>
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ThemeToggle />
      <WhatsAppButton />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <Link href="/">
            <Button variant="ghost" className="mb-8" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux services
            </Button>
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl">
              {service.description}
            </p>
          </div>

          <div className="mb-12">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Fonctionnalités
              </h2>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Avantages
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Notre Processus
              </h2>
              <ol className="space-y-4">
                {service.process.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Prêt à commencer votre projet ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToContact} data-testid="button-contact">
                Demander un devis
              </Button>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-whatsapp text-whatsapp hover:bg-whatsapp/10" data-testid="button-whatsapp-service">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Discuter sur WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
