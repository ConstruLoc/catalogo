import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, Clock } from "lucide-react";

const Sobre = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Maintenance Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Badge className="mb-6 bg-amber-500/10 text-amber-600 border-amber-500/20">
              Em Breve
            </Badge>
            <Construction className="h-24 w-24 text-primary mx-auto mb-8 animate-pulse" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Página em <span className="text-primary">Manutenção</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Estamos trabalhando para trazer conteúdo exclusivo sobre nossa história e valores.
            </p>
            
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="text-lg">
                    Em breve você poderá conhecer mais sobre a ConstruLoc
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;