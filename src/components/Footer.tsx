import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram,
  Send
} from "lucide-react";
import construlogicLogo from "@/assets/construlogic-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src={construlogicLogo} 
              alt="ConstruLogic" 
              className="h-12 w-auto"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              A ConstruLoc é especialista em locação de equipamentos para construção, 
              oferecendo soluções completas para sua obra com qualidade e segurança garantidas.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                onClick={() => window.open('https://www.instagram.com/para_fer_', '_blank')}
              >
                <Instagram className="h-5 w-5 mr-2" />
                Siga no Instagram
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/equipamentos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Equipment Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Produtos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/equipamentos#escavadeiras" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Escavadeiras
                </Link>
              </li>
              <li>
                <Link to="/equipamentos#betoneiras" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Betoneiras
                </Link>
              </li>
              <li>
                <Link to="/equipamentos#andaimes" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Andaimes
                </Link>
              </li>
              <li>
                <Link to="/equipamentos#compactadores" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Compactadores
                </Link>
              </li>
              <li>
                <Link to="/equipamentos#geradores" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Geradores
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">(17) 99731-0747</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">construloc.contato@gmail.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  R. Manoel de Lima, 233<br />
                  Paraíso - SP, 15825-000
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Segunda-Sexta: 07H-18H | Sábado: 07H-11H</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2 text-sm">Newsletter</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Receba ofertas especiais e novidades
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Seu e-mail" 
                  className="text-sm h-8"
                />
                <Button size="sm" className="bg-gradient-primary text-primary-foreground px-3">
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© {currentYear} ConstruLoc. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <a href="#privacidade" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#termos" className="hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm font-semibold">
              Desenvolvido por{" "}
              <a 
                href="https://gvsoftware.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-bold text-base"
              >
                GV Software
              </a>
            </p>
            <a 
              href="https://instagram.com/gv_software" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors flex items-center gap-1.5 font-medium"
            >
              <Instagram className="h-4 w-4" />
              @gv_software
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;