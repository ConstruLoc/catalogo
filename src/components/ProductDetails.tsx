import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Heart, Share2, MessageCircle, Calendar, Shield, Truck, Clock } from "lucide-react";
import { useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    category: string;
    image: string;
    price: string;
    originalPrice?: string;
    description: string;
    rating: number;
    specifications: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails = ({ product, isOpen, onClose }: ProductDetailsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const handleWhatsAppRent = () => {
    const message = `Olá! Gostaria de alugar o equipamento: ${product.name} - ${product.price}. Podem me enviar mais informações?`;
    openWhatsApp('5517997310747', message);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Confira este equipamento: ${product.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? "text-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button size="icon" variant="secondary" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">(24 avaliações)</span>
                </div>
              </div>
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Specifications */}
            <div>
              <h3 className="font-semibold mb-3">Especificações Técnicas</h3>
              <ul className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Seguro Incluso</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-blue-500" />
                <span>Entrega Grátis</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-purple-500" />
                <span>Suporte 24h</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-orange-500" />
                <span>Disponível Hoje</span>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-primary hover:bg-gradient-hero text-primary-foreground shadow-primary"
                size="lg"
                onClick={handleWhatsAppRent}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Alugar via WhatsApp
              </Button>
            </div>

            {/* Contact Info */}
            <div className="bg-accent/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Fale Conosco</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>📞 (17) 99731-0747</p>
                <p>📧 construloc.contato@gmail.com</p>
                <p>⏰ Segunda-Sexta: 07H-18H | Sábado: 07H-11H</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;