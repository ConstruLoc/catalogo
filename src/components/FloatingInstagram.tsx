import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingInstagram = () => {
  const handleClick = () => {
    window.open("https://www.instagram.com/construloc_locacoes/", "_blank");
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 group">
      {/* Outer glow effect - pulsing */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 blur-2xl opacity-50 animate-[pulse_3s_ease-in-out_infinite]" />
      
      {/* Middle glow layer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 blur-xl opacity-40" />
      
      <Button
        onClick={handleClick}
        size="lg"
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-2xl hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-500 hover:scale-110 p-0 border-2 border-white/20"
      >
        {/* Icon */}
        <Instagram className="relative z-10 h-6 w-6 text-white drop-shadow-lg" strokeWidth={2.5} />
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
