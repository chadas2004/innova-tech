import { type User, type InsertUser, type ContactMessage, type InsertContactMessage, type SiteFeature, type InsertSiteFeature } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  markMessageAsRead(id: string): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: string): Promise<boolean>;
  
  createSiteFeature(feature: InsertSiteFeature): Promise<SiteFeature>;
  getSiteFeatures(): Promise<SiteFeature[]>;
  getSiteFeature(id: string): Promise<SiteFeature | undefined>;
  getSiteFeatureByName(name: string): Promise<SiteFeature | undefined>;
  updateSiteFeature(id: string, feature: Partial<InsertSiteFeature>): Promise<SiteFeature | undefined>;
  deleteSiteFeature(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private siteFeatures: Map<string, SiteFeature>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.siteFeatures = new Map();
    
    const adminId = randomUUID();
    const defaultAdmin: User = {
      id: adminId,
      username: "admin",
      password: "admin123",
    };
    this.users.set(adminId, defaultAdmin);
    
    const announcementId = randomUUID();
    const defaultAnnouncement: SiteFeature = {
      id: announcementId,
      name: "announcement",
      title: "Bienvenue sur notre site",
      description: "Annonce importante affichée sur la page d'accueil",
      content: "Profitez de nos services informatiques de qualité pour transformer votre entreprise digitalement !",
      isEnabled: true,
      updatedAt: new Date(),
    };
    this.siteFeatures.set(announcementId, defaultAnnouncement);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      phone: insertMessage.phone ?? null,
      company: insertMessage.company ?? null,
      service: insertMessage.service ?? null,
      message: insertMessage.message,
      isRead: false,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async markMessageAsRead(id: string): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (!message) return undefined;
    
    const updatedMessage: ContactMessage = { ...message, isRead: true };
    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    return this.contactMessages.delete(id);
  }

  async createSiteFeature(insertFeature: InsertSiteFeature): Promise<SiteFeature> {
    const id = randomUUID();
    const feature: SiteFeature = {
      id,
      name: insertFeature.name,
      title: insertFeature.title,
      description: insertFeature.description ?? null,
      isEnabled: insertFeature.isEnabled ?? true,
      content: insertFeature.content ?? null,
      updatedAt: new Date(),
    };
    this.siteFeatures.set(id, feature);
    return feature;
  }

  async getSiteFeatures(): Promise<SiteFeature[]> {
    return Array.from(this.siteFeatures.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async getSiteFeature(id: string): Promise<SiteFeature | undefined> {
    return this.siteFeatures.get(id);
  }

  async getSiteFeatureByName(name: string): Promise<SiteFeature | undefined> {
    return Array.from(this.siteFeatures.values()).find(
      (feature) => feature.name === name
    );
  }

  async updateSiteFeature(id: string, updates: Partial<InsertSiteFeature>): Promise<SiteFeature | undefined> {
    const feature = this.siteFeatures.get(id);
    if (!feature) return undefined;
    
    const updatedFeature: SiteFeature = {
      ...feature,
      ...updates,
      updatedAt: new Date(),
    };
    this.siteFeatures.set(id, updatedFeature);
    return updatedFeature;
  }

  async deleteSiteFeature(id: string): Promise<boolean> {
    return this.siteFeatures.delete(id);
  }
}

export const storage = new MemStorage();
