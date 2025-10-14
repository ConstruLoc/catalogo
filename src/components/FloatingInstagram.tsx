import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingInstagram = () => {
  const handleClick = () => {
    window.open("https://www.instagram.com/construloc_locacoes/", "_blank");
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 group">
      <Button
        onClick={handleClick}
        size="lg"
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none hover:scale-110 p-0"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse" />
        
        {/* Icon */}
        <Instagram className="relative z-10 h-6 w-6 text-white" strokeWidth={2.5} />
      </Button>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          Siga-nos no Instagram
        </div>
      </div>
    </div>
  );
};

export default FloatingInstagram;
