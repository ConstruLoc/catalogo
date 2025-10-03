import Header from "@/components/Header";
import ProductCatalog from "@/components/ProductCatalog";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const Equipamentos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-card border-b">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Produtos
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Nossos <span className="text-primary">Produtos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra nossa ampla gama de equipamentos de construção para locação. 
            Todos os equipamentos passam por rigorosa manutenção e inspeção de segurança.
          </p>
        </div>
      </section>

      <ProductCatalog showViewAllButton={false} />
      <Footer />
    </div>
  );
};

export default Equipamentos;