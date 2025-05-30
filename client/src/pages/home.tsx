
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TechnologySection } from "@/components/technology-section";
import { SupportSection } from "@/components/support-section";
import { ContactSection } from "@/components/contact-section";
import { Navigation } from "@/components/navigation";

export default function Home() {
  function handleStartFree() {
    // Redirigir a una página de registro o dashboard
    window.location.href = "/register";
  }

  function handleViewDemo() {
    // Abrir demo en una nueva pestaña o mostrar modal
    window.open("https://demo.docuninja.com", "_blank");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TechnologySection />
        <SupportSection />
        <ContactSection />
      </main>
      <footer className="bg-black border-t border-ninja-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">DocuNinja Pro 🥋⚡</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                La navaja suiza definitiva para documentos. Convierte, edita, comprime y potencia cualquier archivo con el poder de la IA.
              </p>
              <div className="flex space-x-4">
                <button onClick={handleStartFree} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Prueba Gratuita
                </button>
                <button onClick={handleViewDemo} className="border border-gray-600 text-gray-300 hover:text-white hover:border-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Ver Demo
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#funciones" className="hover:text-white transition-colors">Funciones</a></li>
                <li><a href="#tecnologia" className="hover:text-white transition-colors">Tecnología</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#soporte" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Soporte</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 DocuNinja Pro. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Términos de Servicio</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Política de Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
