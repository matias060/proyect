import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Cpu, 
  Database, 
  Shield, 
  Zap,
  Globe,
  Server,
  Code
} from "lucide-react";

export function TechnologySection() {
  const technologies = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "GPT-4 & Mistral",
      description: "Los mejores modelos de IA para procesamiento de texto",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Tesseract OCR",
      description: "Reconocimiento óptico de caracteres de última generación",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "PostgreSQL",
      description: "Base de datos robusta y escalable",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Seguridad",
      description: "Encriptación AES-256 y autenticación multifactor",
      color: "from-red-500 to-orange-500"
    }
  ];

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Framework" },
    { name: "OpenAI API", category: "AI" },
    { name: "Docker", category: "DevOps" },
    { name: "AWS", category: "Cloud" },
    { name: "Redis", category: "Cache" }
  ];

  return (
    <section id="tecnologia" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-green-600 hover:bg-green-700">
            <Code className="mr-2 h-4 w-4" />
            Tecnología de Vanguardia
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Construido con la mejor <span className="text-green-400">tecnología</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Utilizamos las herramientas más avanzadas para garantizar rendimiento, seguridad y escalabilidad
          </p>
        </div>

        {/* Main Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <Card key={index} className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className={`bg-gradient-to-r ${tech.color} p-4 rounded-full inline-block mb-4 text-white`}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{tech.title}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Server className="mr-3 h-6 w-6" />
            Stack Tecnológico Completo
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors duration-200">
                <div className="text-white font-semibold mb-1">{tech.name}</div>
                <div className="text-gray-400 text-sm">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">&lt;100ms</div>
            <div className="text-gray-400">Latencia API</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">ISO 27001</div>
            <div className="text-gray-400">Certificación</div>
          </div>
        </div>

      </div>
    </section>
  );
}
export function TechnologySection() {
  const technologies = [
    { name: "React", icon: "⚛️", description: "Frontend moderno y responsive" },
    { name: "Node.js", icon: "🟢", description: "Backend escalable y rápido" },
    { name: "OpenAI", icon: "🤖", description: "IA de última generación" },
    { name: "TypeScript", icon: "📘", description: "Código seguro y mantenible" }
  ];

  return (
    <section id="tecnologia" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tecnología de Vanguardia
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Construido con las mejores tecnologías para garantizar rendimiento y confiabilidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
