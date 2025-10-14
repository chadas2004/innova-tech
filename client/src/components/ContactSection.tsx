import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const whatsapp1 = "https://wa.me/22995792329?text=Bonjour,%20je%20suis%20intéressé%20par%20vos%20services%20informatiques";
  const whatsapp2 = "https://wa.me/22991142478?text=Bonjour,%20je%20suis%20intéressé%20par%20vos%20services%20informatiques";

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Contactez-nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+229 XX XX XX XX"
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Parlez-nous de votre projet..."
                    rows={6}
                    required
                    data-testid="input-message"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" data-testid="button-submit-contact">
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Informations de contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Téléphone</p>
                    <a href="tel:+22995792329" className="text-sm text-muted-foreground hover:text-primary">
                      +229 95 79 23 29
                    </a>
                    <br />
                    <a href="tel:+22991142478" className="text-sm text-muted-foreground hover:text-primary">
                      +229 91 14 24 78
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a href="mailto:contact@africainfotech.com" className="text-sm text-muted-foreground hover:text-primary">
                      contact@africainfotech.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Adresse</p>
                    <p className="text-sm text-muted-foreground">Cotonou, Bénin</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-whatsapp/5 border-whatsapp/20">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-whatsapp" />
                <h3 className="text-lg font-semibold text-foreground">WhatsApp</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Contactez-nous directement sur WhatsApp pour une réponse rapide
              </p>
              <div className="space-y-2">
                <a href={whatsapp1} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white" data-testid="button-whatsapp-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    +229 95 79 23 29
                  </Button>
                </a>
                <a href={whatsapp2} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white" data-testid="button-whatsapp-2">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    +229 91 14 24 78
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
