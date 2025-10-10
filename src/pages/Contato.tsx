import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  Instagram
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  // Webhook URL do Zapier - substitua pela sua URL
  const ZAPIER_WEBHOOK_URL = ""; // Cole aqui o webhook do Zapier quando criar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save to database
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      // Send notification via Zapier webhook if configured
      if (ZAPIER_WEBHOOK_URL) {
        try {
          await fetch(ZAPIER_WEBHOOK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
            body: JSON.stringify({
              nome: formData.name,
              email: formData.email,
              telefone: formData.phone,
              assunto: formData.subject,
              mensagem: formData.message,
              data: new Date().toISOString(),
              origem: "Site Construloc"
            }),
          });
          console.log("Notificação enviada via Zapier");
        } catch (webhookError) {
          console.error("Erro ao enviar webhook:", webhookError);
          // Continue mesmo se o webhook falhar
        }
      }

      // WhatsApp message with form data
      const whatsappMessage = `
Olá! Recebi um contato através do site:

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Assunto:* ${formData.subject}
*Mensagem:* ${formData.message}
      `.trim();
      
      const whatsappUrl = `https://wa.me/5517997310747?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Mensagem registrada!",
        description: "Você será redirecionado para o WhatsApp para finalizar o contato.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppDirect = () => {
    const message = "Olá! Gostaria de falar com vocês sobre locação de equipamentos.";
    const whatsappUrl = `https://wa.me/5517997310747?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      details: "(17) 99731-0747",
      action: () => window.open('tel:+5517997310747')
    },
    {
      icon: Mail,
      title: "Email",
      details: "construloc.contato@gmail.com",
      action: () => window.open('mailto:construloc.contato@gmail.com')
    },
    {
      icon: MapPin,
      title: "Endereço",
      details: "R. Manoel de Lima, 233\nParaíso - SP, 15825-000",
      action: () => window.open('https://maps.google.com/?q=R.+Manoel+de+Lima,+233,+Paraíso+-+SP,+15825-000')
    },
    {
      icon: Clock,
      title: "Horário",
      details: "Segunda-Sexta: 07H-18H\nSábado: 07H-11H",
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card border-b">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Contato
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Fale <span className="text-primary">Conosco</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos prontos para atender você! Entre em contato e descubra como 
            podemos ajudar no seu projeto de construção.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Envie sua Mensagem</h2>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Formulário de Contato</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: Orçamento para locação de escavadeira"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Descreva sua necessidade..."
                        rows={5}
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        className="flex-1 bg-gradient-primary hover:bg-gradient-hero text-primary-foreground shadow-primary"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handleWhatsAppDirect}
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Informações de Contato</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card 
                    key={index} 
                    className={`shadow-card transition-all duration-300 ${
                      info.action ? 'cursor-pointer hover:shadow-primary' : ''
                    }`}
                    onClick={info.action || undefined}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-muted-foreground whitespace-pre-line">
                            {info.details}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Contact */}
              <Card className="mt-8 shadow-card bg-gradient-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Atendimento Rápido</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleWhatsAppDirect}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp - Resposta Imediata
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('tel:+5517997310747')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Ligar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="mt-6 shadow-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Redes Sociais</h3>
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    onClick={() => window.open('https://www.instagram.com/para_fer_', '_blank')}
                  >
                    <Instagram className="h-5 w-5 mr-2" />
                    Siga no Instagram
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Nossa Localização</h2>
            <p className="text-muted-foreground">Venha nos visitar ou agende uma visita técnica</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-card">
            <iframe 
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=R.+Manoel+de+Lima,+233,+Paraíso+-+SP,+15825-000&zoom=18&maptype=satellite"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Construloc"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;