import { Button } from "@/components/ui/button";
import { Menu, X, FileText } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#funciones", label: "Funciones" },
    { href: "#tecnologia", label: "Tecnología" },
    { href: "#soporte", label: "Soporte" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-400 mr-2" />
            <span className="text-xl font-bold text-white">DocuNinja</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Empezar Gratis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="px-3 py-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Empezar Gratis
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
import { useState } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              DocuNinja Pro <span className="text-lg">🥋⚡</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#funciones" className="text-gray-300 hover:text-white transition-colors">
                Funciones
              </a>
              <a href="#tecnologia" className="text-gray-300 hover:text-white transition-colors">
                Tecnología
              </a>
              <a href="#soporte" className="text-gray-300 hover:text-white transition-colors">
                Soporte
              </a>
              <a href="#contacto" className="text-gray-300 hover:text-white transition-colors">
                Contacto
              </a>
              <a href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Dashboard
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 rounded-lg mt-2">
              <a href="#funciones" className="block text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Funciones
              </a>
              <a href="#tecnologia" className="block text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Tecnología
              </a>
              <a href="#soporte" className="block text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Soporte
              </a>
              <a href="#contacto" className="block text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Contacto
              </a>
              <a href="/dashboard" className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors">
                Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
