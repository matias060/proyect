import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDocumentSchema, insertConversionSchema } from "@shared/schema";
import { summarizeDocument, analyzeDocumentStructure } from "./lib/openai";
import { FileProcessor } from "./lib/file-processor";
import multer from "multer";
import path from "path";
import fs from "fs";

// Setup multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common document formats
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',
      'image/jpeg',
      'image/png',
      'image/tiff',
      'image/bmp',
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
  },
});

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload document
  app.post("/api/documents/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const document = await storage.createDocument({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        status: "pending",
        extractedText: null,
        summary: null,
        userId: null, // For now, not requiring authentication
      });

      res.json(document);
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Get all documents
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getUserDocuments();
      res.json(documents);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get specific document
  app.get("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      res.json(document);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Extract text from document using real processing
  app.post("/api/documents/:id/extract-text", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Update status to processing
      await storage.updateDocument(id, { status: "processing" });

      const filePath = path.join("uploads", document.filename);
      
      if (!fs.existsSync(filePath)) {
        throw new Error("File not found on disk");
      }

      // Process file using real file processor
      const result = await FileProcessor.processFile(filePath, document.mimeType);

      // Update document with extracted text and metadata
      const updatedDocument = await storage.updateDocument(id, {
        extractedText: result.text,
        status: "completed",
        processedAt: new Date(),
      });

      res.json({ 
        text: result.text, 
        metadata: result.metadata,
        document: updatedDocument 
      });
    } catch (error: any) {
      console.error("Text extraction error:", error);
      const documentId = parseInt(req.params.id);
      await storage.updateDocument(documentId, { status: "error" });
      res.status(500).json({ message: error.message });
    }
  });

  // Summarize document using AI
  app.post("/api/documents/:id/summarize", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      if (!document.extractedText) {
        return res.status(400).json({ message: "Document text must be extracted first" });
      }

      // Generate summary using OpenAI
      const summary = await summarizeDocument(document.extractedText);
      
      // Update document with summary
      const updatedDocument = await storage.updateDocument(id, { summary });

      res.json({ summary, document: updatedDocument });
    } catch (error: any) {
      console.error("Summarization error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Analyze document structure
  app.post("/api/documents/:id/analyze", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      if (!document.extractedText) {
        return res.status(400).json({ message: "Document text must be extracted first" });
      }

      const analysis = await analyzeDocumentStructure(document.extractedText);
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create conversion job
  app.post("/api/documents/:id/convert", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { toFormat } = req.body;
      
      const document = await storage.getDocument(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      const conversionData = insertConversionSchema.parse({
        documentId: id,
        fromFormat: document.mimeType,
        toFormat,
        status: "pending",
        outputFilename: null,
      });

      const conversion = await storage.createConversion(conversionData);
      
      // Simulate conversion process
      setTimeout(async () => {
        const outputFilename = `converted_${Date.now()}.${toFormat}`;
        await storage.updateConversion(conversion.id, {
          status: "completed",
          outputFilename,
          completedAt: new Date(),
        });
      }, 2000);

      res.json(conversion);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get conversion status
  app.get("/api/conversions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const conversion = await storage.getConversion(id);
      
      if (!conversion) {
        return res.status(404).json({ message: "Conversion not found" });
      }

      res.json(conversion);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // In a real application, this would send an email or save to a database
      console.log("Contact form submission:", { name, email, subject, message });
      
      res.json({ message: "Message sent successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
