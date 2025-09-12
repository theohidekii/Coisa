import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const TesteCarrinho = () => {
  const { cartItems, addToCart, clearCart, getCartTotal, getCartItemCount } = useCart();

  // Produtos de teste para facilitar o desenvolvimento
  const testProducts = [
    {
      id: 'test-1',
      name: 'Cimento Portland CP-II 50kg',
      price: 25.90,
      originalPrice: 29.90,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Cimentos e Argamassas',
      weight: 50
    },
    {
      id: 'test-2',
      name: 'Tijolo Cerâmico 6 Furos',
      price: 0.85,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Tijolos e Blocos',
      weight: 2.5
    },
    {
      id: 'test-3',
      name: 'Areia Média Lavada',
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Areias e Britas',
      weight: 50
    },
    {
      id: 'test-4',
      name: 'Porcelanato 60x60cm',
      price: 35.90,
      originalPrice: 42.90,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Pisos e Revestimentos',
      weight: 15
    },
    {
      id: 'test-5',
      name: 'Tinta Branca 18L',
      price: 89.90,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Tintas e Acabamentos',
      weight: 18
    },
    {
      id: 'test-6',
      name: 'Furadeira 13mm',
      price: 120.00,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Ferramentas',
      weight: 2.8
    },
    {
      id: 'test-7',
      name: 'Argamassa Colante',
      price: 15.90,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Cimentos e Argamassas',
      weight: 20
    },
    {
      id: 'test-8',
      name: 'Bloco de Concreto 14x19x39cm',
      price: 1.20,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Tijolos e Blocos',
      weight: 12
    },
    {
      id: 'test-9',
      name: 'Brita 1',
      price: 55.00,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Areias e Britas',
      weight: 50
    },
    {
      id: 'test-10',
      name: 'Azulejo 20x30cm',
      price: 12.90,
      originalPrice: 16.90,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Pisos e Revestimentos',
      weight: 8
    },
    {
      id: 'test-11',
      name: 'Tinta Esmalte 3,6L',
      price: 45.90,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Tintas e Acabamentos',
      weight: 3.6
    },
    {
      id: 'test-12',
      name: 'Serra Circular',
      price: 180.00,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop',
      category: 'Ferramentas',
      weight: 4.2
    }
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category
    });
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
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/">
              <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Package className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Teste do Carrinho</h1>
            <p className="text-sm md:text-base text-slate-600">Adicione produtos rapidamente para testar o checkout</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Produtos de Teste */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm bg-white rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-3 md:space-x-4 text-slate-800">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Produtos de Teste</h3>
                      <p className="text-sm md:text-base text-slate-600">Clique para adicionar ao carrinho</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {testProducts.map((product) => (
                      <div key={product.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-slate-900 mb-1 line-clamp-2">
                              {product.name}
                            </h4>
                            <Badge variant="outline" className="text-xs mb-2">
                              {product.category}
                            </Badge>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-blue-600 text-sm">
                                {formatPrice(product.price)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-slate-500 line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumo do Carrinho */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden sticky top-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-3 md:space-x-4 text-slate-800">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Carrinho Atual</h3>
                      <p className="text-sm md:text-base text-slate-600">{getCartItemCount()} itens</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 text-sm">Carrinho vazio</p>
                      <p className="text-slate-500 text-xs">Adicione produtos para testar</p>
                    </div>
                  ) : (
                    <>
                      {/* Itens do Carrinho */}
                      <div className="space-y-3 mb-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-sm text-slate-900 line-clamp-1">
                                {item.name}
                              </h5>
                              <p className="text-xs text-slate-600">
                                {item.quantity}x {formatPrice(item.price)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm text-blue-600">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="border-t border-slate-200 pt-4 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-slate-900">Total</span>
                          <span className="text-2xl font-bold text-blue-600">{formatPrice(getCartTotal())}</span>
                        </div>
                      </div>

                      {/* Botões de Ação */}
                      <div className="space-y-3">
                        <Link to="/carrinho">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                            Ver Carrinho Completo
                          </Button>
                        </Link>
                        
                        {getCartTotal() > 0 && (
                          <Link to="/checkout">
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold">
                              Ir para Checkout
                            </Button>
                          </Link>
                        )}
                        
                        <Button 
                          variant="outline" 
                          onClick={clearCart}
                          className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Limpar Carrinho
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TesteCarrinho;
