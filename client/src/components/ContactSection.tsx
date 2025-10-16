import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("/api/contact", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi du message",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertContactMessage) => {
    createContactMutation.mutate(data);
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Votre nom"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="votre@email.com"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone (optionnel)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ""}
                              placeholder="+229 XX XX XX XX"
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entreprise (optionnel)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ""}
                              placeholder="Nom de votre entreprise"
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service intéressé (optionnel)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="Ex: Développement Web, SEO, etc."
                            data-testid="input-service"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Parlez-nous de votre projet..."
                            rows={6}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full" 
                    data-testid="button-submit-contact"
                    disabled={createContactMutation.isPending}
                  >
                    {createContactMutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </Form>
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
