import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { formatFileSize, getFileIcon, isValidFileType } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  file: File;
  status: 'uploading' | 'completed' | 'error' | 'processing';
  progress: number;
  id?: number;
  error?: string;
  metadata?: {
    pages?: number;
    words?: number;
    characters?: number;
    sheets?: string[];
    dimensions?: { width: number; height: number };
  };
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiRequest('POST', '/api/documents/upload', formData);
      return response.json();
    },
    onSuccess: async (data, file) => {
      // Update status to completed
      setFiles(prev => prev.map(f => 
        f.file === file 
          ? { ...f, status: 'completed', progress: 100, id: data.id }
          : f
      ));
      
      // Start text extraction automatically
      try {
        setFiles(prev => prev.map(f => 
          f.file === file 
            ? { ...f, status: 'processing' }
            : f
        ));
        
        const extractResponse = await apiRequest('POST', `/api/documents/${data.id}/extract-text`);
        const extractResult = await extractResponse.json();
        
        setFiles(prev => prev.map(f => 
          f.file === file 
            ? { ...f, status: 'completed', metadata: extractResult.metadata }
            : f
        ));
        
        toast({
          title: "Procesamiento completado",
          description: `Texto extraído de ${file.name} correctamente.`,
        });
      } catch (error) {
        console.error('Text extraction failed:', error);
        setFiles(prev => prev.map(f => 
          f.file === file 
            ? { ...f, status: 'error', error: 'Error en el procesamiento' }
            : f
        ));
      }
      
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
    },
    onError: (error: any, file) => {
      setFiles(prev => prev.map(f => 
        f.file === file 
          ? { ...f, status: 'error', error: error.message }
          : f
      ));
      toast({
        title: "Error de subida",
        description: error.message || "No se pudo subir el archivo",
        variant: "destructive",
      });
    },
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFiles = (fileList: File[]) => {
    const validFiles = fileList.filter(file => {
      if (!isValidFileType(file)) {
        toast({
          title: "Tipo de archivo no válido",
          description: `${file.name} no es un tipo de archivo compatible.`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: `${file.name} supera el límite de 50MB.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      status: 'uploading',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Upload each file
    validFiles.forEach(file => {
      uploadMutation.mutate(file);
    });
  };

  const removeFile = (fileToRemove: UploadedFile) => {
    setFiles(prev => prev.filter(f => f !== fileToRemove));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="bg-gray-800 border border-gray-700">
        <CardContent className="p-8">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              dragActive 
                ? 'border-blue-400 bg-blue-50/5' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Arrastra archivos aquí o haz clic para seleccionar
            </h3>
            <p className="text-gray-400 mb-4">
              Soportamos PDF, Word, Excel, PowerPoint, imágenes y archivos de texto
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Máximo 50MB por archivo
            </p>

            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.jpg,.jpeg,.png,.tiff,.bmp"
            />
            <label htmlFor="file-upload">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Seleccionar archivos
              </Button>
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                Archivos ({files.length})
              </h4>
              <div className="space-y-3">
                {files.map((uploadedFile, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {getFileIcon(uploadedFile.file.type)}
                        </span>
                        <div>
                          <p className="text-white font-medium">
                            {uploadedFile.file.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {formatFileSize(uploadedFile.file.size)}
                            {uploadedFile.metadata && (
                              <span className="ml-2">
                                {uploadedFile.metadata.pages && ` • ${uploadedFile.metadata.pages} páginas`}
                                {uploadedFile.metadata.words && ` • ${uploadedFile.metadata.words} palabras`}
                                {uploadedFile.metadata.sheets && ` • ${uploadedFile.metadata.sheets.length} hojas`}
                                {uploadedFile.metadata.dimensions && 
                                  ` • ${uploadedFile.metadata.dimensions.width}x${uploadedFile.metadata.dimensions.height}px`}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {uploadedFile.status === 'completed' && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {uploadedFile.status === 'processing' && (
                          <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {uploadedFile.status === 'error' && (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadedFile)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {uploadedFile.status === 'uploading' && (
                      <Progress value={uploadedFile.progress} className="mt-2" />
                    )}
                    
                    {uploadedFile.status === 'processing' && (
                      <p className="text-blue-400 text-sm mt-2">
                        Procesando documento...
                      </p>
                    )}

                    {uploadedFile.status === 'error' && uploadedFile.error && (
                      <p className="text-red-400 text-sm mt-2">
                        Error: {uploadedFile.error}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}