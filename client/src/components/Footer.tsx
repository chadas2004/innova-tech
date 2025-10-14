import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card/50 border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/attached_assets/télécharger_1760454303431.jpeg" 
                alt="Africa Infotech Innovation" 
                className="h-10 w-10 object-contain rounded-md"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%23006db3' width='40' height='40' rx='5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='18' font-weight='bold'%3EA%3C/text%3E%3C/svg%3E";
                }}
              />
              <span className="font-display font-bold text-foreground">
                Africa Infotech
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Solutions informatiques professionnelles pour propulser votre entreprise dans l'ère numérique.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-md bg-muted hover-elevate flex items-center justify-center" data-testid="link-facebook">
                <Facebook className="w-4 h-4 text-foreground" />
              </a>
              <a href="#" className="w-9 h-9 rounded-md bg-muted hover-elevate flex items-center justify-center" data-testid="link-twitter">
                <Twitter className="w-4 h-4 text-foreground" />
              </a>
              <a href="#" className="w-9 h-9 rounded-md bg-muted hover-elevate flex items-center justify-center" data-testid="link-linkedin">
                <Linkedin className="w-4 h-4 text-foreground" />
              </a>
              <a href="#" className="w-9 h-9 rounded-md bg-muted hover-elevate flex items-center justify-center" data-testid="link-instagram">
                <Instagram className="w-4 h-4 text-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary">Développement Web</button></li>
              <li><button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary">Applications Mobiles</button></li>
              <li><button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary">Référencement SEO</button></li>
              <li><button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary">Hébergement</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection("apropos")} className="text-sm text-muted-foreground hover:text-primary">À Propos</button></li>
              <li><button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary">Nos Services</button></li>
              <li><button onClick={() => scrollToSection("contact")} className="text-sm text-muted-foreground hover:text-primary">Contact</button></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Carrières</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Cotonou, Bénin</li>
              <li><a href="tel:+22995792329" className="text-sm text-muted-foreground hover:text-primary">+229 95 79 23 29</a></li>
              <li><a href="tel:+22991142478" className="text-sm text-muted-foreground hover:text-primary">+229 91 14 24 78</a></li>
              <li><a href="mailto:contact@africainfotech.com" className="text-sm text-muted-foreground hover:text-primary">contact@africainfotech.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Africa Infotech Innovation. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Politique de confidentialité</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
