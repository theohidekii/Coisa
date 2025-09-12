import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface TestProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  weight?: number;
}

const TestProducts = () => {
  const { addToCart } = useCart();

  // Produtos de teste para facilitar o desenvolvimento
  const testProducts: TestProduct[] = [
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
    }
  ];

  const handleAddToCart = (product: TestProduct) => {
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
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Package className="h-5 w-5" />
          Produtos de Teste
        </CardTitle>
        <p className="text-sm text-blue-600">
          Adicione produtos rapidamente para testar o carrinho e checkout
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
  );
};

export default TestProducts;
