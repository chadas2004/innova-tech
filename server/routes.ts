import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
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

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des messages" });
    }
  });

  app.get("/api/contact/:id", async (req, res) => {
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

  app.patch("/api/contact/:id/read", async (req, res) => {
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

  app.delete("/api/contact/:id", async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}
