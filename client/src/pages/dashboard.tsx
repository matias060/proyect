
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Download, Bot } from "lucide-react";

export default function Dashboard() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFiles[0]);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);
        // Actualizar lista de archivos
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">DocuNinja Dashboard</h1>
        
        {/* Upload Section */}
        <Card className="bg-gray-900 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Subir Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-400 mb-4">Arrastra archivos aquí o haz clic para seleccionar</p>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
              />
              <label htmlFor="file-upload">
                <Button className="bg-blue-600 hover:bg-blue-700" disabled={uploading}>
                  {uploading ? 'Subiendo...' : 'Seleccionar Archivo'}
                </Button>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Documentos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Example document items */}
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="font-medium">Documento ejemplo.pdf</p>
                    <p className="text-sm text-gray-400">Subido hace 2 horas</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Bot className="h-4 w-4 mr-2" />
                    Resumir
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
