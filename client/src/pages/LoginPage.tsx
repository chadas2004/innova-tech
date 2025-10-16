import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ThemeToggle from "@/components/ThemeToggle";
import logoImage from "@assets/generated_images/Africa_Infotech_Innovation_logo_d714841a.png";

const loginSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'espace administrateur",
      });
      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Nom d'utilisateur ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 flex items-center justify-center p-6">
      <ThemeToggle />
      
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <img 
            src={logoImage} 
            alt="Africa Infotech Innovation" 
            className="h-16 w-16 object-contain"
          />
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground">
              Africa Infotech
            </h1>
            <p className="text-sm text-muted-foreground">Administration</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="admin"
                      data-testid="input-username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      data-testid="input-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              data-testid="button-login"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            data-testid="button-back-home"
          >
            Retour à l'accueil
          </Button>
        </div>
      </Card>
    </div>
  );
}
