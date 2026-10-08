import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Calculator } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ShippingCalculator from "@/components/ShippingCalculator";
import type { CartItem } from "@/context/CartContext";

type TestProduct = Pick<CartItem, "id" | "name" | "price" | "weightKg" | "lengthCm" | "widthCm" | "heightCm"> & { description: string };

const TesteFrete = () => {
  const { cartItems, addToCart, getCartTotal } = useCart();

  // Produtos de teste com dimensões e pesos realistas
  const testProducts = [
    {
      id: "tinta-18l",
      name: "Tinta Branca 18L",
      price: 45.00,
      weightKg: 2.5,
      lengthCm: 30,
      widthCm: 20,
      heightCm: 25,
      description: "Tinta acrílica para parede"
    },
    {
      id: "cimento-50kg",
      name: "Cimento CP-II 50kg",
      price: 25.00,
      weightKg: 50,
      lengthCm: 40,
      widthCm: 30,
      heightCm: 15,
      description: "Cimento para construção"
    },
    {
      id: "furadeira-13mm",
      name: "Furadeira 13mm",
      price: 120.00,
      weightKg: 1.8,
      lengthCm: 25,
      widthCm: 15,
      heightCm: 8,
      description: "Furadeira elétrica"
    },
    {
      id: "tijolo-ceramico",
      name: "Tijolo Cerâmico (1000 un)",
      price: 180.00,
      weightKg: 1200,
      lengthCm: 100,
      widthCm: 50,
      heightCm: 30,
      description: "Tijolo cerâmico para construção"
    },
    {
      id: "produto-sem-dimensoes",
      name: "Produto Sem Dimensões",
      price: 35.00,
      description: "Este produto não tem dimensões especificadas - usará padrão"
    }
  ];

  const addTestProduct = (product: TestProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: "/placeholder.svg",
      category: "Teste",
      weightKg: product.weightKg,
      lengthCm: product.lengthCm,
      widthCm: product.widthCm,
      heightCm: product.heightCm
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Teste do Sistema de Frete Avançado
          </h1>
          <p className="text-gray-600">
            Adicione produtos ao carrinho e teste o cálculo de frete com peso volumétrico
          </p>
        </div>

        {/* Produtos de Teste */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produtos de Teste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {testProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="font-bold text-lg text-primary">R$ {product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Peso: {product.weightKg || 0.5} kg</p>
                    <p>Dimensões: {product.lengthCm || 25}×{product.widthCm || 20}×{product.heightCm || 15} cm</p>
                    <p>Volumétrico: {(((product.lengthCm || 25) * (product.widthCm || 20) * (product.heightCm || 15)) / 6000).toFixed(2)} kg</p>
                    {(!product.weightKg || !product.lengthCm || !product.widthCm || !product.heightCm) && (
                      <p className="text-orange-600 font-medium">⚠️ Usando dimensões padrão</p>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => addTestProduct(product)}
                    className="w-full"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carrinho Atual */}
        {cartItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrinho Atual ({cartItems.length} itens)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qtd: {item.quantity} | Peso: {item.weightKg || 0.5} kg
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total do Carrinho:</span>
                    <span className="font-bold text-xl text-primary">
                      R$ {getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calculadora de Frete */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculadora de Frete Avançada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ShippingCalculator />
          </CardContent>
        </Card>

        {/* Informações sobre o Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona o Sistema de Frete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Características Principais:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Google Maps API:</strong> Geocodificação precisa com coordenadas exatas</li>
                  <li>• <strong>Distância Ajustada:</strong> +30% sobre linha reta (simula rotas reais)</li>
                  <li>• <strong>Peso Volumétrico:</strong> (L × A × C) ÷ 6000 (padrão brasileiro)</li>
                  <li>• <strong>Peso Efetivo:</strong> Maior entre peso real e volumétrico</li>
                  <li>• <strong>Dimensões Padrão:</strong> 25×20×15cm, 0.5kg (quando não especificadas)</li>
                  <li>• <strong>Cache:</strong> Coordenadas em cache por 24h para performance</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Componentes do Frete:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Tarifa Base:</strong> R$ 6,00</li>
                  <li>• <strong>Por Distância:</strong> R$ 1,10/km ajustado</li>
                  <li>• <strong>Por Peso:</strong> R$ 1,20/kg efetivo</li>
                  <li>• <strong>Por Item:</strong> R$ 0,80/item (manuseio)</li>
                  <li>• <strong>Seguro:</strong> 0,3% do valor do pedido</li>
                  <li>• <strong>Frete Grátis:</strong> Acima de R$ 199,00</li>
                </ul>
                
                <h3 className="font-semibold mb-2 mt-4">Prazos de Entrega:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Até 10 km:</strong> 3 dias úteis</li>
                  <li>• <strong>Até 50 km:</strong> 5 dias úteis</li>
                  <li>• <strong>Até 200 km:</strong> 6 dias úteis</li>
                  <li>• <strong>Acima de 200 km:</strong> 8 dias úteis</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Exemplo Prático - CEP 09041-160 (Vila Bastos):</h4>
              <p className="text-sm text-blue-700">
                <strong>Distância:</strong> ~3.1km (linha reta) → ~4.0km (ajustado +30%)<br/>
                <strong>Prazo:</strong> 3 dias úteis (≤10km)<br/>
                <strong>Produto 2kg real / 5kg volumétrico:</strong> Considera 5kg para o frete<br/>
                <strong>Cálculo:</strong> R$ 6,00 (base) + R$ 4,40 (4km × R$ 1,10) + R$ 6,00 (5kg × R$ 1,20) = R$ 16,40
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Google Maps API Integrada:</h4>
              <p className="text-sm text-green-700">
                ✅ <strong>Geocodificação Precisa:</strong> Coordenadas exatas usando Google Maps<br/>
                ✅ <strong>Distância Real:</strong> Cálculo considerando rotas de trânsito (+30%)<br/>
                ✅ <strong>Cache Inteligente:</strong> Resultados salvos por 24h para performance<br/>
                💡 <strong>Inclua o número:</strong> Para máxima precisão do endereço
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Dimensões Padrão:</h4>
              <p className="text-sm text-orange-700">
                Quando um produto não possui dimensões especificadas, o sistema usa automaticamente:
                <strong> 25×20×15cm (7.500cm³) e 0.5kg</strong>. 
                O peso volumétrico padrão é <strong>1.25kg</strong>, então será considerado o peso volumétrico.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TesteFrete;
