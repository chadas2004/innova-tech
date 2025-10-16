import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContactMessage } from "@shared/schema";
import { Mail, Phone, Building2, Tag, Clock, Trash2, CheckCircle, LogOut, MessageSquare, Settings } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logoImage from "@assets/generated_images/Africa_Infotech_Innovation_logo_d714841a.png";
import AdminFeaturesPage from "./AdminFeaturesPage";

export default function AdminPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, logout, user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("messages");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
    enabled: isAuthenticated,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/contact/${id}/read`, "PATCH", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Message marqué comme lu",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/contact/${id}`, "DELETE", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Message supprimé",
      });
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Déconnexion réussie",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erreur lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      <header className="border-b bg-card/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Africa Infotech Innovation" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  Administration
                </h1>
                <p className="text-sm text-muted-foreground">
                  Connecté en tant que {user?.username}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="messages" data-testid="tab-messages">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
              {messages.filter(m => !m.isRead).length > 0 && (
                <Badge className="ml-2" variant="default">
                  {messages.filter(m => !m.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="features" data-testid="tab-features">
              <Settings className="w-4 h-4 mr-2" />
              Fonctionnalités
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Messages de contact
              </h2>
              <p className="text-muted-foreground">
                {messages.length} message{messages.length > 1 ? "s" : ""} au total
                {messages.filter(m => !m.isRead).length > 0 && (
                  <> • <span className="text-primary font-medium">{messages.filter(m => !m.isRead).length} non lu{messages.filter(m => !m.isRead).length > 1 ? "s" : ""}</span></>
                )}
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Aucun message pour le moment</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card 
                    key={message.id} 
                    className={`p-6 ${!message.isRead ? "border-primary/50 bg-primary/5" : ""}`}
                    data-testid={`card-message-${message.id}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {message.name}
                          </h3>
                          {!message.isRead && (
                            <Badge variant="default" className="text-xs">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${message.email}`} className="hover:text-primary">
                              {message.email}
                            </a>
                          </div>
                          {message.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${message.phone}`} className="hover:text-primary">
                                {message.phone}
                              </a>
                            </div>
                          )}
                          {message.company && (
                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              <span>{message.company}</span>
                            </div>
                          )}
                          {message.service && (
                            <div className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              <span>{message.service}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {format(new Date(message.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!message.isRead && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => markAsReadMutation.mutate(message.id)}
                            disabled={markAsReadMutation.isPending}
                            data-testid={`button-mark-read-${message.id}`}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteMutation.mutate(message.id)}
                          disabled={deleteMutation.isPending}
                          data-testid={`button-delete-${message.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="features">
            <AdminFeaturesPage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
