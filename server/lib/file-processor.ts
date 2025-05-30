
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { parse } from 'node-html-parser';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

export interface ProcessingResult {
  text: string;
  metadata?: {
    pages?: number;
    words?: number;
    characters?: number;
    sheets?: string[];
    dimensions?: { width: number; height: number };
  };
}

export class FileProcessor {
  private static async processImage(filePath: string): Promise<ProcessingResult> {
    try {
      // Get image metadata
      const metadata = await sharp(filePath).metadata();
      
      // Perform OCR
      const worker = await createWorker('spa'); // Spanish language
      const { data: { text } } = await worker.recognize(filePath);
      await worker.terminate();

      return {
        text: text.trim(),
        metadata: {
          dimensions: {
            width: metadata.width || 0,
            height: metadata.height || 0
          },
          words: text.split(/\s+/).filter(word => word.length > 0).length,
          characters: text.length
        }
      };
    } catch (error) {
      throw new Error(`Error processing image: ${error}`);
    }
  }

  private static async processPDF(filePath: string): Promise<ProcessingResult> {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);

      return {
        text: data.text,
        metadata: {
          pages: data.numpages,
          words: data.text.split(/\s+/).filter(word => word.length > 0).length,
          characters: data.text.length
        }
      };
    } catch (error) {
      throw new Error(`Error processing PDF: ${error}`);
    }
  }

  private static async processWord(filePath: string): Promise<ProcessingResult> {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      const text = result.value;

      return {
        text,
        metadata: {
          words: text.split(/\s+/).filter(word => word.length > 0).length,
          characters: text.length
        }
      };
    } catch (error) {
      throw new Error(`Error processing Word document: ${error}`);
    }
  }

  private static async processExcel(filePath: string): Promise<ProcessingResult> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      let allText = '';
      
      sheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const sheetText = XLSX.utils.sheet_to_txt(worksheet);
        allText += `Hoja: ${sheetName}\n${sheetText}\n\n`;
      });

      return {
        text: allText,
        metadata: {
          sheets: sheetNames,
          words: allText.split(/\s+/).filter(word => word.length > 0).length,
          characters: allText.length
        }
      };
    } catch (error) {
      throw new Error(`Error processing Excel file: ${error}`);
    }
  }

  private static async processPowerPoint(filePath: string): Promise<ProcessingResult> {
    try {
      // Para PowerPoint, usaremos una aproximación similar a Word
      // En un entorno de producción, podrías usar librerías específicas como officegen
      const result = await mammoth.extractRawText({ path: filePath });
      const text = result.value;

      return {
        text,
        metadata: {
          words: text.split(/\s+/).filter(word => word.length > 0).length,
          characters: text.length
        }
      };
    } catch (error) {
      // Si mammoth falla, intentamos leer como texto plano
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        return {
          text: content,
          metadata: {
            words: content.split(/\s+/).filter(word => word.length > 0).length,
            characters: content.length
          }
        };
      } catch {
        throw new Error(`Error processing PowerPoint file: ${error}`);
      }
    }
  }

  private static async processText(filePath: string): Promise<ProcessingResult> {
    try {
      const text = fs.readFileSync(filePath, 'utf8');
      
      return {
        text,
        metadata: {
          words: text.split(/\s+/).filter(word => word.length > 0).length,
          characters: text.length
        }
      };
    } catch (error) {
      throw new Error(`Error processing text file: ${error}`);
    }
  }

  private static async processCSV(filePath: string): Promise<ProcessingResult> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const text = XLSX.utils.sheet_to_txt(worksheet);

      return {
        text,
        metadata: {
          words: text.split(/\s+/).filter(word => word.length > 0).length,
          characters: text.length
        }
      };
    } catch (error) {
      throw new Error(`Error processing CSV file: ${error}`);
    }
  }

  public static async processFile(filePath: string, mimeType: string): Promise<ProcessingResult> {
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    switch (mimeType) {
      case 'application/pdf':
        return this.processPDF(filePath);
      
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return this.processWord(filePath);
      
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return this.processExcel(filePath);
      
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return this.processPowerPoint(filePath);
      
      case 'text/plain':
        return this.processText(filePath);
      
      case 'text/csv':
        return this.processCSV(filePath);
      
      case 'image/jpeg':
      case 'image/png':
      case 'image/tiff':
      case 'image/bmp':
        return this.processImage(filePath);
      
      default:
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
  }

  public static getSupportedFormats(): string[] {
    return [
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
      'image/bmp'
    ];
  }
}
