import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertUserSchema, insertSiteFeatureSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import passport from "passport";
import { requireAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: "Erreur lors de l'authentification" });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "Authentification échouée" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Erreur lors de la connexion" });
        }
        const { password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Erreur lors de la déconnexion" });
      }
      res.json({ message: "Déconnexion réussie" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ error: "Non authentifié" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Cet utilisateur existe déjà" });
      }

      const user = await storage.createUser(validatedData);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    }
  });

  app.get("/api/contact", requireAuth, async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des messages" });
    }
  });

  app.get("/api/contact/:id", requireAuth, async (req, res) => {
    try {
      const message = await storage.getContactMessage(req.params.id);
      if (!message) {
        return res.status(404).json({ error: "Message non trouvé" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération du message" });
    }
  });

  app.patch("/api/contact/:id/read", requireAuth, async (req, res) => {
    try {
      const message = await storage.markMessageAsRead(req.params.id);
      if (!message) {
        return res.status(404).json({ error: "Message non trouvé" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du message" });
    }
  });

  app.delete("/api/contact/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteContactMessage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Message non trouvé" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression du message" });
    }
  });

  app.post("/api/features", requireAuth, async (req, res) => {
    try {
      const validatedData = insertSiteFeatureSchema.parse(req.body);
      const feature = await storage.createSiteFeature(validatedData);
      res.status(201).json(feature);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Erreur lors de la création de la fonctionnalité" });
    }
  });

  app.get("/api/features", async (req, res) => {
    try {
      const features = await storage.getSiteFeatures();
      res.json(features);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des fonctionnalités" });
    }
  });

  app.get("/api/features/:id", async (req, res) => {
    try {
      const feature = await storage.getSiteFeature(req.params.id);
      if (!feature) {
        return res.status(404).json({ error: "Fonctionnalité non trouvée" });
      }
      res.json(feature);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération de la fonctionnalité" });
    }
  });

  app.patch("/api/features/:id", requireAuth, async (req, res) => {
    try {
      const feature = await storage.updateSiteFeature(req.params.id, req.body);
      if (!feature) {
        return res.status(404).json({ error: "Fonctionnalité non trouvée" });
      }
      res.json(feature);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de la fonctionnalité" });
    }
  });

  app.delete("/api/features/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteSiteFeature(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Fonctionnalité non trouvée" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de la fonctionnalité" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
