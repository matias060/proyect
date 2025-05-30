
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  FileText,
  Calendar,
  Clock
} from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensaje enviado",
        description: "Te contactaremos pronto.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el mensaje",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "hola@docuninja.com",
      description: "Respuesta en 24h"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Teléfono",
      value: "+1 (555) 123-4567",
      description: "Lun-Vie 9AM-6PM"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Oficina",
      value: "San Francisco, CA",
      description: "Estados Unidos"
    }
  ];

  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-pink-600 hover:bg-pink-700">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contáctanos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Tienes alguna <span className="text-pink-400">pregunta?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Asunto
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Cuéntanos más detalles..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {contactMutation.isPending ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Información de contacto</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-600 p-2 rounded-lg text-white">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{info.title}</div>
                        <div className="text-blue-400">{info.value}</div>
                        <div className="text-gray-400 text-sm">{info.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-gradient-to-r from-green-900 to-blue-900 border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Horarios de atención
                </h3>
                <div className="space-y-2 text-white">
                  <div className="flex justify-between">
                    <span>Lun - Vie</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">¿Necesitas ayuda inmediata?</h3>
                <p className="text-blue-100 mb-6">
                  Consulta nuestra documentación o únete a la comunidad Discord para obtener ayuda rápida.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-white text-blue-900 hover:bg-gray-100">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver Documentación
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Unirse a Discord
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Aquí implementarías el envío real del formulario
    alert('¡Mensaje enviado! Te contactaremos pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            ¿Tienes preguntas? Estamos aquí para ayudarte
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl border border-gray-700">
            <div className="mb-6">
              <label htmlFor="name" className="block text-white font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Tu nombre"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-white font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors resize-none"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
