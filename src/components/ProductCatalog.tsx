import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import { Search, Filter, Grid, List } from "lucide-react";

// Import equipment images
import equipment1 from "@/assets/equipment-1.jpg";
import equipment2 from "@/assets/equipment-2.jpg";
import equipment3 from "@/assets/equipment-3.jpg";
import equipment4 from "@/assets/equipment-4.jpg";
import equipment5 from "@/assets/equipment-5.jpg";
import equipment6 from "@/assets/equipment-6.jpg";

// Sample product data
const products = [
  {
    id: "1",
    name: "Escavadeira Hidráulica CAT 320D",
    category: "Escavadeiras",
    image: equipment1,
    price: "R$ 450",
    originalPrice: "R$ 520",
    description: "Escavadeira robusta para obras de grande porte com sistema hidráulico avançado e cabine climatizada.",
    rating: 4.8,
    isPopular: true,
    specifications: [
      "Peso operacional: 20.000 kg",
      "Potência: 122 kW (164 HP)",
      "Capacidade da caçamba: 1,2 m³"
    ]
  },
  {
    id: "2", 
    name: "Betoneira 400L Profissional",
    category: "Betoneiras",
    image: equipment2,
    price: "R$ 85",
    description: "Betoneira de alta capacidade ideal para obras residenciais e comerciais.",
    rating: 4.6,
    specifications: [
      "Capacidade: 400 litros",
      "Motor: 2 HP monofásico",
      "Produção: 6 m³/hora"
    ]
  },
  {
    id: "3",
    name: "Andaime Fachadeiro Completo",
    category: "Andaimes", 
    image: equipment3,
    price: "R$ 25",
    description: "Sistema completo de andaime para trabalhos em altura com total segurança.",
    rating: 4.9,
    specifications: [
      "Altura máxima: 40 metros",
      "Material: Aço galvanizado",
      "Carga máxima: 200 kg/m²"
    ]
  },
  {
    id: "4",
    name: "Rolo Compactador Vibratório",
    category: "Compactadores",
    image: equipment4,
    price: "R$ 320",
    description: "Compactador ideal para pavimentação e compactação de solos.",
    rating: 4.7,
    isPopular: true,
    specifications: [
      "Peso: 3.500 kg",
      "Largura: 1.680 mm",
      "Força centrífuga: 35 kN"
    ]
  },
  {
    id: "5",
    name: "Gerador Diesel 15kVA",
    category: "Geradores",
    image: equipment5,
    price: "R$ 180",
    description: "Gerador de energia confiável para obras que precisam de alimentação contínua.",
    rating: 4.5,
    specifications: [
      "Potência: 15 kVA",
      "Combustível: Diesel",
      "Autonomia: 8 horas"
    ]
  },
  {
    id: "6",
    name: "Furadeira de Impacto Profissional", 
    category: "Ferramentas Elétricas",
    image: equipment6,
    price: "R$ 35",
    description: "Furadeira robusta para trabalhos pesados em concreto e alvenaria.",
    rating: 4.4,
    specifications: [
      "Potência: 850W",
      "Impacto: 48.000 IPM",
      "Mandril: 13mm"
    ]
  }
];

const categories = ["Todos", "Escavadeiras", "Betoneiras", "Andaimes", "Compactadores", "Geradores", "Ferramentas Elétricas"];

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  return (
    <section id="catalogo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Nossos Produtos
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            Equipamentos em <span className="text-primary">Destaque</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Confira alguns dos nossos equipamentos mais procurados para locação.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar equipamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-primary text-primary-foreground" 
                  : "border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            {filteredProducts.length} equipamento{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avançados
          </Button>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              onViewDetails={() => handleViewDetails(product)}
            />
          ))}
        </div>

        {/* Product Details Modal */}
        <ProductDetails
          product={selectedProduct}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.location.href = '/equipamentos'}
            >
              Ver Todos os Produtos
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum equipamento encontrado</h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar seus filtros ou termo de busca
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory("Todos");
                setSearchTerm("");
              }}
              variant="outline"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;