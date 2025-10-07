import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Eye, MessageCircle } from "lucide-react";
import { useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

interface ProductCardProps {
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
  onViewDetails?: () => void;
}

const ProductCard = ({ 
  name, 
  category, 
  image, 
  price, 
  originalPrice, 
  description, 
  rating,
  isPopular = false,
  specifications,
  onViewDetails 
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleWhatsAppRent = () => {
    const message = `Olá! Gostaria de alugar o equipamento: ${name} - ${price}. Podem me enviar mais informações?`;
    openWhatsApp('5517997310747', message);
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-primary transition-all duration-300 hover:-translate-y-2 bg-gradient-card">
      <div className="relative overflow-hidden">
        {isPopular && (
          <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
            Popular
          </Badge>
        )}
        
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorite 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <div className="aspect-[4/3] overflow-hidden bg-muted">
          {!isImageLoaded && (
            <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-3 left-3 right-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button 
              size="sm" 
              className="w-full bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
              onClick={onViewDetails}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Button>
          </div>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Especificações:</div>
            <ul className="text-xs text-muted-foreground space-y-1">
              {specifications.slice(0, 3).map((spec, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-gradient-primary hover:bg-gradient-hero text-primary-foreground shadow-primary"
              onClick={handleWhatsAppRent}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Alugar Agora
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;