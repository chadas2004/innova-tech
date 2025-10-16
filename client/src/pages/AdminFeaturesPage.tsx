import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { SiteFeature, InsertSiteFeature } from "@shared/schema";
import { insertSiteFeatureSchema } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Plus, Trash2, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function AdminFeaturesPage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<SiteFeature | null>(null);

  const { data: features = [], isLoading } = useQuery<SiteFeature[]>({
    queryKey: ["/api/features"],
  });

  const form = useForm<InsertSiteFeature>({
    resolver: zodResolver(insertSiteFeatureSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      content: "",
      isEnabled: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertSiteFeature) => {
      return await apiRequest("/api/features", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/features"] });
      toast({
        title: "Fonctionnalité créée",
        description: "La fonctionnalité a été créée avec succès",
      });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la création de la fonctionnalité",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertSiteFeature> }) => {
      return await apiRequest(`/api/features/${id}`, "PATCH", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/features"] });
      toast({
        title: "Fonctionnalité mise à jour",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/features/${id}`, "DELETE", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/features"] });
      toast({
        title: "Fonctionnalité supprimée",
      });
    },
  });

  const handleSubmit = (data: InsertSiteFeature) => {
    if (editingFeature) {
      updateMutation.mutate({ id: editingFeature.id, data });
      setEditingFeature(null);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (feature: SiteFeature) => {
    setEditingFeature(feature);
    form.reset({
      name: feature.name,
      title: feature.title,
      description: feature.description || "",
      content: feature.content || "",
      isEnabled: feature.isEnabled,
    });
    setIsDialogOpen(true);
  };

  const toggleEnabled = (id: string, currentState: boolean) => {
    updateMutation.mutate({ id, data: { isEnabled: !currentState } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Gestion des fonctionnalités
          </h2>
          <p className="text-muted-foreground">
            Gérez les fonctionnalités et le contenu du site
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-feature">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une fonctionnalité
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingFeature ? "Modifier la fonctionnalité" : "Nouvelle fonctionnalité"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identifiant unique</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="announcement, promo, etc."
                          data-testid="input-feature-name"
                        />
                      </FormControl>
                      <FormDescription>
                        Utilisé en interne pour identifier la fonctionnalité
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Titre de la fonctionnalité"
                          data-testid="input-feature-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Description de la fonctionnalité"
                          data-testid="input-feature-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contenu</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          placeholder="Contenu de la fonctionnalité"
                          rows={6}
                          data-testid="input-feature-content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Activée</FormLabel>
                        <FormDescription>
                          La fonctionnalité sera visible sur le site
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-feature-enabled"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit-feature"
                  >
                    {editingFeature ? "Mettre à jour" : "Créer"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingFeature(null);
                      form.reset();
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      ) : features.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Aucune fonctionnalité pour le moment</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {features.map((feature) => (
            <Card key={feature.id} className="p-6" data-testid={`card-feature-${feature.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <Badge variant={feature.isEnabled ? "default" : "secondary"}>
                      {feature.isEnabled ? "Activée" : "Désactivée"}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-xs">
                      {feature.name}
                    </Badge>
                  </div>
                  {feature.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {feature.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>
                      Modifié le {format(new Date(feature.updatedAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(feature)}
                    data-testid={`button-edit-${feature.id}`}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleEnabled(feature.id, feature.isEnabled)}
                    disabled={updateMutation.isPending}
                    data-testid={`button-toggle-${feature.id}`}
                  >
                    <Switch checked={feature.isEnabled} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteMutation.mutate(feature.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-feature-${feature.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {feature.content && (
                <div className="bg-muted/50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {feature.content}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
