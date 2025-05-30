import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Languages, 
  BarChart3, 
  Users, 
  Scissors, 
  Zap,
  FileText,
  Search,
  Shield,
  Cloud,
  Sparkles,
  Rocket
} from "lucide-react";

export function FeaturesSection() {
  const killerFeatures = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "OCR Avanzado",
      description: "Extrae texto de imágenes y PDFs con precisión del 99%",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Búsqueda Inteligente",
      description: "Encuentra contenido específico en todos tus documentos",
      gradient: "from-green-600 to-blue-600"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Seguridad Total",
      description: "Encriptación end-to-end para máxima protección",
      gradient: "from-red-600 to-pink-600"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Sync en la Nube",
      description: "Accede a tus documentos desde cualquier dispositivo",
      gradient: "from-purple-600 to-indigo-600"
    }
  ];

  const editingFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Editor Colaborativo",
      subtitle: "Como Google Docs pero con IA",
      features: ["Edición en tiempo real", "Comentarios y sugerencias", "Control de versiones"]
    },
    {
      icon: <Scissors className="h-6 w-6" />,
      title: "Manipulación de Archivos",
      subtitle: "Drag & Drop intuitivo",
      features: ["Extraer páginas específicas", "Unir/separar documentos", "Reorganizar contenido"]
    }
  ];

  const aiFeatures = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Resumen Inteligente",
      description: "Resumir documentos largos usando GPT-4 y Mistral",
      color: "purple"
    },
    {
      icon: <Languages className="h-6 w-6" />,
      title: "Traducción Automática",
      description: "Traducir a 50+ idiomas con DeepL API",
      color: "purple"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Informes Automáticos",
      description: "Generar reportes desde datos en Excel",
      color: "purple"
    }
  ];

  return (
    <section id="funciones" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
            <Sparkles className="mr-2 h-4 w-4" />
            Funciones Avanzadas
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Todo lo que necesitas para gestionar <span className="text-blue-400">documentos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Desde OCR hasta IA, DocuNinja tiene todas las herramientas para transformar tu flujo de trabajo
          </p>
        </div>

        {/* Editing Features */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-blue-400 mb-8 text-center flex items-center justify-center">
            <Users className="mr-3 h-8 w-8" />
            Edición y Colaboración
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editingFeatures.map((feature, index) => (
              <Card key={index} className="bg-gray-800 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-blue-500">
                <CardContent className="p-8">
                  <div className="bg-blue-600 p-4 rounded-full inline-block mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-blue-400 text-lg mb-4">{feature.subtitle}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="text-gray-300 flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Killer Features */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Zap className="mr-3 h-8 w-8" />
            Funciones <span className="text-orange-500">Killer</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {killerFeatures.map((feature, index) => (
              <Card key={index} className={`bg-gradient-to-br ${feature.gradient} text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0`}>
                <CardContent className="p-6">
                  <div className="text-white mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-white opacity-90 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Automation Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-purple-400 mb-8 text-center flex items-center justify-center">
            <Bot className="mr-3 h-8 w-8" />
            Automatización con IA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <Card key={index} className="bg-gray-800 text-center hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-purple-500">
                <CardContent className="p-6">
                  <div className="bg-purple-600 p-4 rounded-full inline-block mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
export function FeaturesSection() {
  const features = [
    {
      icon: "🔄",
      title: "Conversión Inteligente",
      description: "Convierte entre PDF, Word, Excel, PowerPoint, imágenes y más de 50 formatos"
    },
    {
      icon: "📝",
      title: "Edición IA",
      description: "Edita documentos con asistencia de inteligencia artificial"
    },
    {
      icon: "🗜️",
      title: "Compresión Avanzada",
      description: "Reduce el tamaño de archivos sin perder calidad"
    },
    {
      icon: "🔍",
      title: "Análisis de Contenido",
      description: "Extrae insights y resúmenes automáticos"
    },
    {
      icon: "🔒",
      title: "Seguridad Total",
      description: "Encriptación end-to-end para todos tus documentos"
    },
    {
      icon: "☁️",
      title: "Cloud Sync",
      description: "Sincronización automática en todos tus dispositivos"
    }
  ];

  return (
    <section id="funciones" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Funciones Poderosas
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Todo lo que necesitas para manejar documentos de manera profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-black/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
