import { useState } from "react";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const WishlistPage = () => {
  const { favoriteItems, removeFromFavorites, addToCart, isFavorite } = useCart();
  const [sortBy, setSortBy] = useState("recent");

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const sortFavorites = (items: typeof favoriteItems) => {
    switch (sortBy) {
      case "recent":
        return [...items].sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
      case "name":
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case "price-low":
        return [...items].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...items].sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  };

  const sortedFavorites = sortFavorites(favoriteItems);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
            {/* Page Header */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <Heart className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3" />
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
                Meus Favoritos
              </h1>
            </div>
            <p className="text-base md:text-xl lg:text-2xl text-pink-100 mb-6 md:mb-8">
              Produtos que você adicionou aos favoritos
            </p>
            <div className="flex items-center justify-center space-x-4 md:space-x-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-sm md:text-base">{favoriteItems.length} produtos favoritados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6 md:mb-8">
            <Link to="/">
              <Button variant="outline" className="flex items-center space-x-2 text-sm md:text-base">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
          </div>

          {favoriteItems.length === 0 ? (
            /* Empty Wishlist */
            <div className="text-center py-12 md:py-16">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Heart className="h-10 w-10 md:h-12 md:w-12 text-pink-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3 md:mb-4">Sua lista de favoritos está vazia</h2>
              <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8">Adicione produtos aos favoritos para vê-los aqui</p>
              <Link to="/produtos">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base">
                  Explorar Produtos
                </Button>
              </Link>
            </div>
          ) : (
            /* Wishlist Content */
            <div className="space-y-6 md:space-y-8">
              {/* Header with Sort */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                    Produtos Favoritados
                  </h2>
                  <p className="text-sm md:text-base text-slate-600">
                    {favoriteItems.length} produtos encontrados
                  </p>
                </div>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <span className="text-sm text-slate-600">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 flex-1 md:flex-none"
                  >
                    <option value="recent">Mais Recentes</option>
                    <option value="name">Nome A-Z</option>
                    <option value="price-low">Menor Preço</option>
                    <option value="price-high">Maior Preço</option>
                  </select>
                </div>
              </div>

              {/* Grid de Produtos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {sortedFavorites.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="p-3 md:p-4 pb-2">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 md:h-48 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-pink-600 text-white text-xs">
                          Favorito
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                          onClick={() => removeFromFavorites(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-3 md:p-4 pt-2">
                      <div className="space-y-2 md:space-y-3">
                        {/* Categoria */}
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          {item.category}
                        </div>
                        
                        {/* Nome do Produto */}
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors text-sm md:text-base">
                          {item.name}
                        </h3>
                        
                        {/* Preços */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-base md:text-lg font-bold text-pink-600">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-xs md:text-sm text-gray-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="text-xs text-green-600">
                              Economia de {formatPrice(item.originalPrice - item.price)}
                            </div>
                          )}
                        </div>
                        
                        {/* Data de Adição */}
                        <div className="text-xs text-gray-500">
                          Adicionado em {item.addedAt.toLocaleDateString('pt-BR')}
                        </div>
                        
                        {/* Botões */}
                        <div className="flex space-x-2 pt-2">
                          <Button 
                            className="flex-1 bg-pink-600 hover:bg-pink-700 text-sm"
                            onClick={() => addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              originalPrice: item.originalPrice,
                              image: item.image,
                              category: item.category
                            })}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Adicionar ao Carrinho
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center pt-6 md:pt-8 space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/produtos">
                  <Button variant="outline" className="w-full sm:w-auto text-sm md:text-base">
                    Continuar Comprando
                  </Button>
                </Link>
                <Link to="/carrinho">
                  <Button className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto text-sm md:text-base">
                    Ver Carrinho
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
