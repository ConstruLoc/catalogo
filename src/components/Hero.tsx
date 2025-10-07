import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import heroBg from "@/assets/construloc-hero-bg.png";
import { openWhatsApp } from "@/lib/whatsapp";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Equipamentos de construção" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Award className="w-4 h-4 mr-2" />
            Mais de 15 anos de experiência
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Equipamentos de
            <span className="text-primary block">Construção</span>
            em Locação
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A ConstruLoc oferece o melhor em equipamentos para sua obra. 
            Qualidade garantida, preços competitivos e atendimento especializado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:bg-gradient-hero text-primary-foreground shadow-primary group"
              onClick={() => (window.location.href = '/equipamentos')}
            >
              Ver Catálogo Completo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => openWhatsApp('5517997310747', 'Olá! Gostaria de falar com um especialista sobre locação de equipamentos.')}
            >
              Falar com Especialista
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold text-lg">100%</div>
                <div className="text-sm text-muted-foreground">Seguro</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold text-lg">24h</div>
                <div className="text-sm text-muted-foreground">Suporte</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold text-lg">500+</div>
                <div className="text-sm text-muted-foreground">Clientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;