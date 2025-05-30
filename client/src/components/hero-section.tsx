
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/10 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <Badge className="mb-6 bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30">
          <Sparkles className="mr-2 h-4 w-4" />
          Potenciado por IA
        </Badge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transforma tus <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            documentos
          </span> <br />
          con IA
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          OCR, resúmenes inteligentes, traducción automática y edición colaborativa. 
          Todo en una plataforma revolucionaria.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
            Empezar Gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
            <Play className="mr-2 h-5 w-5" />
            Ver Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">99%</div>
            <div className="text-gray-400">Precisión OCR</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-gray-400">Idiomas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
            <div className="text-gray-400">Disponibilidad</div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            DocuNinja Pro
            <span className="text-4xl md:text-6xl ml-4">🥋⚡</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            La navaja suiza definitiva para documentos. Convierte, edita, comprime y potencia cualquier archivo con el poder de la IA.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Empezar Gratis
          </button>
          <button className="border border-gray-600 text-gray-300 hover:text-white hover:border-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300">
            Ver Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-white mb-2">Conversión Universal</h3>
            <p className="text-gray-400">Convierte entre más de 50 formatos de archivo</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">IA Integrada</h3>
            <p className="text-gray-400">Análisis y procesamiento inteligente de documentos</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Ultra Rápido</h3>
            <p className="text-gray-400">Procesamiento en segundos, no minutos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
