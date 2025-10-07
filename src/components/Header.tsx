import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import construlogicLogo from "@/assets/construlogic-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
                <span>(17) 99731-0747</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>Paraíso, SP</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="font-medium">Horário de Atendimento: Segunda-Sexta 07H-18H | Sábado 07H-11H</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={construlogicLogo} 
              alt="ConstruLoc - Locações de Equipamentos" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                location.pathname === '/' ? 'text-primary' : ''
              }`}
            >
              Início
            </Link>
            <div className="relative group">
            <Link 
              to="/equipamentos"
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                location.pathname === '/equipamentos' ? 'text-primary' : ''
              }`}
            >
              Produtos
            </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg shadow-card border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/equipamentos#${category.toLowerCase()}`}
                      className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link 
              to="/sobre" 
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                location.pathname === '/sobre' ? 'text-primary' : ''
              }`}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contato" 
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                location.pathname === '/contato' ? 'text-primary' : ''
              }`}
            >
              Contato
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className="bg-gradient-primary hover:bg-gradient-hero text-primary-foreground shadow-primary"
              onClick={() => {
                const message = "Olá! Gostaria de solicitar um orçamento para locação de equipamentos. Podem me ajudar?";
                const whatsappUrl = `https://wa.me/5517997310747?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
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
              <Link 
                to="/" 
                className={`block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors ${
                  location.pathname === '/' ? 'text-primary bg-accent' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <div className="px-4 py-2">
                <Link 
                  to="/equipamentos"
                  className={`font-medium text-foreground hover:text-primary transition-colors ${
                    location.pathname === '/equipamentos' ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produtos
                </Link>
                <div className="pl-4 space-y-1 mt-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/equipamentos#${category.toLowerCase()}`}
                      className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              <Link 
                to="/sobre" 
                className={`block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors ${
                  location.pathname === '/sobre' ? 'text-primary bg-accent' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link 
                to="/contato" 
                className={`block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors ${
                  location.pathname === '/contato' ? 'text-primary bg-accent' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="px-4 pt-2">
                <Button 
                  className="w-full bg-gradient-primary hover:bg-gradient-hero text-primary-foreground"
                  onClick={() => {
                    const message = "Olá! Gostaria de solicitar um orçamento para locação de equipamentos. Podem me ajudar?";
                    const whatsappUrl = `https://wa.me/5517997310747?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                    setIsMenuOpen(false);
                  }}
                >
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