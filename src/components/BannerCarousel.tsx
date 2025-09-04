import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Materiais de Construção",
      subtitle: "Profissionais",
      description: "Transforme seus projetos em realidade com materiais de alta qualidade, preços competitivos e o melhor atendimento da região.",
      buttonText: "Explorar Catálogo",
      buttonLink: "#produtos",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-800"
    },
    {
      id: 2,
      title: "Ofertas Especiais",
      subtitle: "Até 50% de desconto",
      description: "Aproveite nossas promoções em materiais de construção com qualidade garantida e entrega rápida.",
      buttonText: "Ver Ofertas",
      buttonLink: "#ofertas",
      bgColor: "bg-gradient-to-r from-red-600 to-red-800"
    },
    {
      id: 3,
      title: "Entrega Rápida",
      subtitle: "Em até 24h",
      description: "Entregamos em toda a região com agilidade e segurança. Sua obra não para!",
      buttonText: "Saiba Mais",
      buttonLink: "#servicos",
      bgColor: "bg-gradient-to-r from-green-600 to-green-800"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {/* Banner Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`w-full h-full ${banner.bgColor} flex items-center`}>
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl text-white">
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6">
                    <span className="text-xs md:text-sm font-medium">Líder em Materiais de Construção</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                    <span className="text-gray-200">{banner.title}</span>
                    <br />
                    <span className="text-white">{banner.subtitle}</span>
                  </h1>
                  <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-100 max-w-2xl">
                    {banner.description}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 text-sm md:text-lg px-6 md:px-8 py-2 md:py-3"
                    onClick={() => window.location.href = banner.buttonLink}
                  >
                    {banner.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm h-8 w-8 md:h-10 md:w-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5 md:h-8 md:w-8" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm h-8 w-8 md:h-10 md:w-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5 md:h-8 md:w-8" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerCarousel;
