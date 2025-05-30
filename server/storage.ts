import { users, documents, conversions, type User, type InsertUser, type Document, type InsertDocument, type Conversion, type InsertConversion } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createDocument(document: InsertDocument): Promise<Document>;
  getDocument(id: number): Promise<Document | undefined>;
  updateDocument(id: number, updates: Partial<Document>): Promise<Document | undefined>;
  getUserDocuments(userId?: number): Promise<Document[]>;
  
  createConversion(conversion: InsertConversion): Promise<Conversion>;
  getConversion(id: number): Promise<Conversion | undefined>;
  updateConversion(id: number, updates: Partial<Conversion>): Promise<Conversion | undefined>;
  getDocumentConversions(documentId: number): Promise<Conversion[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documents: Map<number, Document>;
  private conversions: Map<number, Conversion>;
  private currentUserId: number;
  private currentDocumentId: number;
  private currentConversionId: number;

  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.conversions = new Map();
    this.currentUserId = 1;
    this.currentDocumentId = 1;
    this.currentConversionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const document: Document = {
      id,
      filename: insertDocument.filename,
      originalName: insertDocument.originalName,
      mimeType: insertDocument.mimeType,
      size: insertDocument.size,
      status: insertDocument.status ?? "pending",
      extractedText: insertDocument.extractedText ?? null,
      summary: insertDocument.summary ?? null,
      userId: insertDocument.userId ?? null,
      uploadedAt: new Date(),
      processedAt: null,
    };
    this.documents.set(id, document);
    return document;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async updateDocument(id: number, updates: Partial<Document>): Promise<Document | undefined> {
    const document = this.documents.get(id);
    if (!document) return undefined;
    
    const updatedDocument = { ...document, ...updates };
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }

  async getUserDocuments(userId?: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(
      (doc) => !userId || doc.userId === userId
    );
  }

  async createConversion(insertConversion: InsertConversion): Promise<Conversion> {
    const id = this.currentConversionId++;
    const conversion: Conversion = {
      id,
      documentId: insertConversion.documentId,
      fromFormat: insertConversion.fromFormat,
      toFormat: insertConversion.toFormat,
      status: insertConversion.status ?? "pending",
      outputFilename: insertConversion.outputFilename ?? null,
      createdAt: new Date(),
      completedAt: null,
    };
    this.conversions.set(id, conversion);
    return conversion;
  }

  async getConversion(id: number): Promise<Conversion | undefined> {
    return this.conversions.get(id);
  }

  async updateConversion(id: number, updates: Partial<Conversion>): Promise<Conversion | undefined> {
    const conversion = this.conversions.get(id);
    if (!conversion) return undefined;
    
    const updatedConversion = { ...conversion, ...updates };
    this.conversions.set(id, updatedConversion);
    return updatedConversion;
  }

  async getDocumentConversions(documentId: number): Promise<Conversion[]> {
    return Array.from(this.conversions.values()).filter(
      (conversion) => conversion.documentId === documentId
    );
  }
}

export const storage = new MemStorage();
