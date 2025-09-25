import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Clock, Award, Target, Heart, Zap, Eye } from "lucide-react";

const Sobre = () => {
  const handleWhatsAppContact = () => {
    const message = "Olá! Gostaria de conhecer mais sobre a ConstruLoc e seus serviços. Podem me ajudar?";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const values = [
    {
      icon: Shield,
      title: "Segurança",
      description: "Todos os equipamentos passam por rigorosa inspeção de segurança"
    },
    {
      icon: Clock,
      title: "Pontualidade",
      description: "Entregamos sempre no prazo combinado, sem atrasos"
    },
    {
      icon: Heart,
      title: "Compromisso",
      description: "Comprometidos com o sucesso de cada projeto dos nossos clientes"
    },
    {
      icon: Zap,
      title: "Eficiência",
      description: "Soluções rápidas e eficazes para suas necessidades"
    }
  ];

  const stats = [
    { number: "15+", label: "Anos de Experiência" },
    { number: "500+", label: "Clientes Atendidos" },
    { number: "100+", label: "Equipamentos Disponíveis" },
    { number: "24/7", label: "Suporte Técnico" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card border-b">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Sobre Nós
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Construindo o Futuro
            <span className="text-primary block">Há Mais de 15 Anos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A ConstruLoc é referência em locação de equipamentos para construção, 
            oferecendo soluções completas e personalizadas para obras de todos os portes.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Fundada em 2008, a ConstruLoc nasceu da visão de democratizar o acesso 
                a equipamentos de construção de alta qualidade. Começamos com apenas 5 
                equipamentos e hoje somos uma das maiores locadoras da região.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nossa missão sempre foi clara: fornecer equipamentos confiáveis, 
                manutenção impecável e atendimento excepcional para impulsionar 
                o sucesso de cada projeto dos nossos clientes.
              </p>
              <Button 
                className="bg-gradient-primary hover:bg-gradient-hero text-primary-foreground shadow-primary"
                onClick={handleWhatsAppContact}
              >
                Fale Conosco
              </Button>
            </div>
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Award className="h-20 w-20 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Imagem da nossa história</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Números que Falam por Si</h2>
            <p className="text-muted-foreground">Resultados construídos com dedicação e qualidade</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam cada decisão e ação da ConstruLoc
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center shadow-card">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Missão</h3>
                <p className="text-muted-foreground">
                  Fornecer equipamentos de construção de alta qualidade com 
                  excelência em atendimento e suporte técnico especializado.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card">
              <CardContent className="p-8">
                <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Visão</h3>
                <p className="text-muted-foreground">
                  Ser a empresa de referência em locação de equipamentos, 
                  reconhecida pela inovação e compromisso com nossos clientes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Valores</h3>
                <p className="text-muted-foreground">
                  Integridade, qualidade, compromisso, inovação e respeito 
                  são os pilares que sustentam todas as nossas ações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos impulsionar seu projeto
          </p>
          <Button 
            size="lg"
            className="bg-gradient-primary hover:bg-gradient-hero text-primary-foreground shadow-primary"
            onClick={handleWhatsAppContact}
          >
            Solicitar Orçamento Agora
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;