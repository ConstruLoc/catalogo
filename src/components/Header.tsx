import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import construlogicLogo from "@/assets/construlogic-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "Escavadeiras",
    "Betoneiras", 
    "Andaimes",
    "Compactadores",
    "Geradores",
    "Ferramentas Elétricas"
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-card">
      {/* Top bar */}
      <div className="bg-gradient-primary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-primary-foreground text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>São Paulo, SP</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="font-medium">Horário de Atendimento: Seg-Sex 7h-18h | Sáb 7h-12h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={construlogicLogo} 
              alt="ConstruLogic - Locações de Equipamentos" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
              Início
            </a>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors font-medium">
                Equipamentos
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-card border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`#${category.toLowerCase()}`}
                      className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href="#sobre" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre Nós
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors font-medium">
              Contato
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-gradient-primary hover:bg-gradient-hero text-primary-foreground shadow-primary">
              Solicitar Orçamento
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-card">
            <nav className="py-4 space-y-2">
              <a href="#inicio" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                Início
              </a>
              <div className="px-4 py-2">
                <div className="font-medium text-foreground mb-2">Equipamentos</div>
                <div className="pl-4 space-y-1">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`#${category.toLowerCase()}`}
                      className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
              <a href="#sobre" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                Sobre Nós
              </a>
              <a href="#contato" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                Contato
              </a>
              <div className="px-4 pt-2">
                <Button className="w-full bg-gradient-primary hover:bg-gradient-hero text-primary-foreground">
                  Solicitar Orçamento
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;