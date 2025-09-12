import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ReviewSummary from "@/components/ReviewSummary";
import { useGlobalProductReviews } from "@/hooks/useGlobalProductReviews";
import { useCart } from "@/context/CartContext";

const FeaturedProducts = () => {
  // Hook para avaliações globais
  const { getProductReview } = useGlobalProductReviews();
  const { addToCart } = useCart();

  // Dados de exemplo - em produção virão do sistema de admin
  const products = [
    {
      id: 1,
      name: "Tinta Acrílica Premium",
      price: 89.90,
      originalPrice: 119.90,
      image: "/api/placeholder/300/300",
      category: "Tintas",
      badge: "Oferta"
    },
    {
      id: 2,
      name: "Furadeira Bosch Professional",
      price: 299.90,
      originalPrice: null,
      image: "/api/placeholder/300/300",
      category: "Ferramentas",
      badge: "Destaque"
    },
    {
      id: 3,
      name: "Cimento CPII 50kg",
      price: 24.90,
      originalPrice: 29.90,
      image: "/api/placeholder/300/300",
      category: "Cimentos",
      badge: "Promoção"
    },
    {
      id: 4,
      name: "Vaso Sanitário Completo",
      price: 189.90,
      originalPrice: null,
      image: "/api/placeholder/300/300",
      category: "Hidráulica",
      badge: "Novo"
    },
    {
      id: 5,
      name: "Piso Cerâmico 60x60",
      price: 45.90,
      originalPrice: 55.90,
      image: "/api/placeholder/300/300",
      category: "Pisos",
      badge: "Oferta"
    },
    {
      id: 6,
      name: "Kit Ferramentas 100 Peças",
      price: 149.90,
      originalPrice: null,
      image: "/api/placeholder/300/300",
      category: "Ferramentas",
      badge: "Kit"
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Oferta":
      case "Promoção":
        return "destructive";
      case "Destaque":
        return "default";
      case "Novo":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecionamos os melhores produtos com os melhores preços para você
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="border-0 shadow-sm bg-white rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out h-[450px] flex flex-col group">
              <div className="relative">
                {/* Product Image */}
                <div className="w-full h-48 bg-slate-100 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-in-out">
                    <span className="text-4xl text-muted-foreground group-hover:scale-110 transition-transform duration-300">📦</span>
                  </div>
                </div>
                
                {/* Badge */}
                <Badge 
                  variant={getBadgeVariant(product.badge)}
                  className="absolute top-2 left-2 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                >
                  {product.badge}
                </Badge>
              </div>

              <CardContent className="p-3 flex-1 flex flex-col">
                {/* Category Badge */}
                <Badge variant="secondary" className="mb-2 text-xs w-fit">
                  {product.category}
                </Badge>

                {/* Product Info */}
                <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
                <p className="text-xs text-slate-600 mb-3 line-clamp-3 flex-1">
                  {product.name} de alta qualidade para suas construções
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {(() => {
                    const reviewData = getProductReview(product.id.toString());
                    return reviewData ? (
                      <ReviewSummary 
                        rating={reviewData.averageRating} 
                        reviewCount={reviewData.totalReviews} 
                        size="sm" 
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-gray-300" />
                        <span className="text-xs text-gray-500">Sem avaliações</span>
                      </div>
                    );
                  })()}
                </div>
                
                {/* Price */}
                <p className="text-lg font-bold text-blue-600 mb-4 group-hover:scale-105 transition-transform duration-300">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-auto">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm group-hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                    onClick={() => addToCart({
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      image: product.image,
                      category: product.category
                    })}
                  >
                    <ShoppingCart className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/produtos">
            <Button variant="outline" size="lg">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;