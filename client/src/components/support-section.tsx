
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  MessageCircle, 
  Video, 
  Users, 
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
  Globe
} from "lucide-react";
import { useState } from "react";

export function SupportSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const supportOptions = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Documentación",
      description: "Guías completas y referencias de API",
      action: "Ver Docs",
      color: "blue"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Chat en Vivo",
      description: "Soporte instantáneo 24/7",
      action: "Iniciar Chat",
      color: "green"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Tutoriales",
      description: "Videos paso a paso",
      action: "Ver Videos",
      color: "purple"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Comunidad",
      description: "Foro de usuarios activos",
      action: "Unirse",
      color: "orange"
    }
  ];

  const faqItems = [
    {
      question: "¿Cómo funciona el OCR de DocuNinja?",
      answer: "Utilizamos Tesseract.js combinado con modelos de IA para extraer texto de imágenes y PDFs con una precisión del 99%. El proceso es automático y toma solo unos segundos.",
      isOpen: false
    },
    {
      question: "¿Mis documentos están seguros?",
      answer: "Sí, todos los documentos se encriptan con AES-256 tanto en tránsito como en reposo. Además, implementamos autenticación multifactor y auditorías de seguridad regulares.",
      isOpen: false
    },
    {
      question: "¿Puedo usar DocuNinja sin conexión?",
      answer: "Algunas funciones básicas están disponibles offline, pero las características de IA requieren conexión a internet para acceder a nuestros modelos en la nube.",
      isOpen: false
    },
    {
      question: "¿Hay límites en el tamaño de archivos?",
      answer: "El límite actual es de 50MB por archivo. Soportamos PDF, Word, Excel, PowerPoint, imágenes y archivos de texto.",
      isOpen: false
    },
    {
      question: "¿Cómo funciona la colaboración?",
      answer: "Como Google Docs, múltiples usuarios pueden editar documentos simultáneamente con cambios en tiempo real, comentarios y control de versiones.",
      isOpen: false
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="soporte" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Soporte y <span className="text-green-400">Documentación</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Recursos completos para aprovechar al máximo DocuNinja
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportOptions.map((option, index) => (
            <Card key={index} className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className={`bg-${option.color}-600 p-4 rounded-full inline-block mb-4 text-white`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-gray-400 mb-4">{option.description}</p>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <HelpCircle className="mr-3 h-8 w-8" />
            Preguntas Frecuentes
          </h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-gray-800 border border-gray-700">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-white">{item.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-0">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-white mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">API Reference</h4>
              <p className="text-blue-100 mb-4">Documentación completa para desarrolladores</p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Ver API Docs
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900 to-blue-900 border-0">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-white mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Blog Técnico</h4>
              <p className="text-green-100 mb-4">Artículos y casos de uso</p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-900">
                Leer Blog
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900 to-pink-900 border-0">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-white mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Discord</h4>
              <p className="text-purple-100 mb-4">Únete a nuestra comunidad</p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                Unirse
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
export function SupportSection() {
  return (
    <section id="soporte" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Soporte 24/7
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Nuestro equipo está aquí para ayudarte en cualquier momento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-black/50 p-8 rounded-xl border border-gray-700">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-white mb-4">Chat en Vivo</h3>
              <p className="text-gray-400 mb-6">Respuesta inmediata a tus consultas</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Iniciar Chat
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-black/50 p-8 rounded-xl border border-gray-700">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-white mb-4">Email</h3>
              <p className="text-gray-400 mb-6">Soporte técnico especializado</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Enviar Email
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-black/50 p-8 rounded-xl border border-gray-700">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-4">Documentación</h3>
              <p className="text-gray-400 mb-6">Guías completas y tutoriales</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Ver Docs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
