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
  Instagram,
  Facebook,
  Linkedin
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      title: "Mensagem enviada!",
      description: "Você será redirecionado para o WhatsApp para finalizar o contato.",
    });
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
      details: "R. Manoel de Lima, 233\nParaíso - SP",
      action: () => window.open('https://maps.google.com/?q=R.+Manoel+de+Lima+233+Paraíso+SP')
    },
    {
      icon: Clock,
      title: "Horário",
      details: "Seg-Sex: 7h às 18h\nSáb: 7h às 12h",
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
                  <div className="flex gap-3">
                    <Button size="icon" variant="outline" className="hover:bg-blue-600 hover:text-white">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="hover:bg-pink-600 hover:text-white">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="hover:bg-blue-700 hover:text-white">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.4!2d-46.6436!3d-23.5730!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x33737e0aefb4f1a1!2sR.%20Manoel%20de%20Lima%2C%20233%20-%20Para%C3%ADso%2C%20S%C3%A3o%20Paulo%20-%20SP!5e1!3m2!1spt-BR!2sbr!4v1234567890!5m2!1spt-BR!2sbr"
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