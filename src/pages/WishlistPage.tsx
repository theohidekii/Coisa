import { useState } from "react";
import { Heart, Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Cimento Portland CP-II",
      price: 25.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Cimentos",
      description: "Cimento Portland de alta resistência para construções"
    },
    {
      id: 2,
      name: "Tijolo Cerâmico 6 Furos",
      price: 0.85,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tijolos",
      description: "Tijolo cerâmico de 6 furos para alvenaria"
    },
    {
      id: 3,
      name: "Areia Média Lavada",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Areias",
      description: "Areia média lavada para argamassas"
    },
    {
      id: 4,
      name: "Tinta Acrílica Branca",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tintas",
      description: "Tinta acrílica branca de alta cobertura"
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-3">
          <Link to="/">
            <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Lista de Desejos</h1>
            <p className="text-slate-600">Seus produtos favoritos salvos para compra futura</p>
          </div>

          {wishlistItems.length === 0 ? (
            /* Empty Wishlist */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Sua lista de desejos está vazia</h2>
              <p className="text-slate-600 mb-8">Adicione produtos que você gostaria de comprar no futuro</p>
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                  Explorar Produtos
                </Button>
              </Link>
            </div>
          ) : (
            /* Wishlist Content */
            <div>
              {/* Header with Actions */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Meus Desejos</h2>
                  <p className="text-slate-600">{wishlistItems.length} produto{wishlistItems.length !== 1 ? 's' : ''} na lista</p>
                </div>
                <Button 
                  onClick={clearWishlist}
                  variant="outline" 
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Lista
                </Button>
              </div>

                                            {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
                  {wishlistItems.map((item) => (
                    <Card key={item.id} className="border-0 shadow-sm bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow h-[450px] flex flex-col">
                      <div className="relative">
                        {/* Product Image */}
                        <div className="w-full h-48 bg-slate-100 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-2 right-2 w-6 h-6 p-0 bg-white/90 hover:bg-white text-red-500 hover:text-red-700 rounded-full"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>

                      <CardContent className="p-3 flex-1 flex flex-col">
                        {/* Category Badge */}
                        <Badge variant="secondary" className="mb-2 text-xs w-fit">
                          {item.category}
                        </Badge>

                        {/* Product Info */}
                        <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-slate-600 mb-3 line-clamp-3 flex-1">{item.description}</p>
                        
                        {/* Price */}
                        <p className="text-lg font-bold text-blue-600 mb-4">{formatPrice(item.price)}</p>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 mt-auto">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm">
                            <ShoppingCart className="h-3 w-3 mr-2" />
                            Adicionar ao Carrinho
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

              {/* Summary Card */}
              <div className="mt-12">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Resumo da Lista de Desejos</h3>
                      <p className="text-slate-600 mb-6">
                        Valor total dos produtos: <span className="font-bold text-blue-600">
                          {formatPrice(wishlistItems.reduce((total, item) => total + item.price, 0))}
                        </span>
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Adicionar Todos ao Carrinho
                        </Button>
                                                 <Link to="/">
                           <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 px-6 py-3 rounded-lg transition-colors">
                             Continuar Comprando
                           </Button>
                         </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
