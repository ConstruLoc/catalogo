import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import { Search, Filter, Grid, List, Loader2 } from "lucide-react";
import { supabase, type ProdutoCatalogo } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  originalPrice?: string;
  description: string;
  rating: number;
  isPopular?: boolean;
  specifications: string[];
}

const ProductCatalog = ({ showViewAllButton = false }: { showViewAllButton?: boolean }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Todos"]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('produtos_catalogo')
          .select('*')
          .eq('disponivel', true)
          .order('destaque', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          // Transform Supabase data to Product format
          const transformedProducts: Product[] = data.map((item: ProdutoCatalogo) => ({
            id: item.id,
            name: item.nome,
            category: item.categoria || 'Outros',
            image: item.imagem_url || '',
            price: item.preco_diario 
              ? `R$ ${item.preco_diario.toFixed(2)}/dia` 
              : item.preco_normal 
                ? `R$ ${item.preco_normal.toFixed(2)}`
                : 'Consulte',
            originalPrice: item.preco_normal && item.preco_diario 
              ? `R$ ${item.preco_normal.toFixed(2)}` 
              : undefined,
            description: item.descricao || '',
            rating: 4.5, // Default rating
            isPopular: item.destaque,
            specifications: item.especificacoes && typeof item.especificacoes === 'string'
              ? item.especificacoes.split('\n').filter(s => s.trim()) 
              : []
          }));

          setProducts(transformedProducts);

          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(transformedProducts.map(p => p.category))
          ).filter(Boolean);
          setCategories(['Todos', ...uniqueCategories]);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        toast({
          title: "Erro ao carregar produtos",
          description: "Não foi possível carregar os produtos do catálogo.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    // Setup real-time subscription
    const channel = supabase
      .channel('produtos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'produtos_catalogo'
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    // Polling fallback (in case realtime isn't enabled on the DB)
    const visibilityHandler = () => {
      if (document.visibilityState === 'visible') fetchProducts();
    };
    document.addEventListener('visibilitychange', visibilityHandler);
    const intervalId = window.setInterval(fetchProducts, 5000);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener('visibilitychange', visibilityHandler);
      window.clearInterval(intervalId);
    };
  }, [toast]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  return (
    <section id="catalogo" className="py-20 bg-background">
      <div className="container mx-auto px-4">

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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Product Details Modal */}
        <ProductDetails
          product={selectedProduct}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />

        {/* Load More or No Results */}
        {filteredProducts.length > 0 ? (
          showViewAllButton && (
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
          )
        ) : (
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