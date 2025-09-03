import { useState } from "react";
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus, MapPin, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  weight: number;
}

const Carrinho = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Cimento Portland CP-II",
      price: 25.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      quantity: 2,
      category: "Cimentos",
      weight: 50
    },
    {
      id: 2,
      name: "Tijolo Cerâmico 6 Furos",
      price: 0.85,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      quantity: 100,
      category: "Tijolos",
      weight: 2.5
    },
    {
      id: 3,
      name: "Areia Média Lavada",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      quantity: 1,
      category: "Areias",
      weight: 50
    }
  ]);

  const [cep, setCep] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [addressInfo, setAddressInfo] = useState<any>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // O frete não é adicionado ao total, apenas informativo
    return subtotal;
  };

  const calculateShipping = async (cepValue: string) => {
    if (cepValue.length !== 8) return;
    
    setIsCalculatingShipping(true);
    try {
      // Cálculo de frete baseado no modelo fornecido
      const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
      const subtotal = calculateSubtotal();
      
      // Cálculo de distância baseado no CEP
      const storeCep = "09130-410"; // CEP da loja COISA
      const distance = calculateDistance(storeCep, cepValue);
      
      // Taxa base
      let cost = 7.90;
      
      // Adicional por distância (acima de 5km)
      if (distance > 5) {
        cost += (distance - 5) * 1.20;
      }
      
      // Adicional por peso
      if (totalWeight > 1) {
        if (totalWeight <= 5) {
          cost += 5.00;
        } else if (totalWeight <= 10) {
          cost += 10.00;
        } else {
          cost += 15.00; // Para pesos acima de 10kg
        }
      }
      
      // Frete grátis para compras acima de R$ 150
      if (subtotal >= 150) {
        cost = 0;
      }
      
      console.log('Cálculo de frete:', {
        cep: cepValue,
        distance,
        totalWeight,
        subtotal,
        cost,
        freeShipping: subtotal >= 150
      });
      
      setShippingCost(cost);
      setShippingInfo({
        distance,
        estimatedDelivery: distance <= 10 ? "1-2 dias úteis" : "2-3 dias úteis"
      });
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const calculateDistance = (cepOrigin: string, cepDest: string): number => {
    // Cálculo de distância baseado em CEPs
    // CEP da loja: 09130-410 (Santo André - SP)
    const cepNumbers = {
      origin: parseInt(cepOrigin.replace("-", "")),
      dest: parseInt(cepDest.replace("-", ""))
    };
    
    // Cálculo mais preciso baseado na diferença dos CEPs
    const difference = Math.abs(cepNumbers.origin - cepNumbers.dest);
    
    // Mapeamento específico para CEPs da Grande São Paulo
    // Baseado na localização da loja em Santo André (09130-410)
    
    // Para CEPs da Grande São Paulo (mais preciso)
    if (difference < 1000) {
      return Math.max(1, Math.floor(difference / 100)); // 1-10 km
    } else if (difference < 5000) {
      return Math.max(3, Math.floor(difference / 200)); // 3-25 km
    } else if (difference < 20000) {
      return Math.max(8, Math.floor(difference / 500)); // 8-40 km
    } else if (difference < 50000) {
      return Math.max(15, Math.floor(difference / 1000)); // 15-50 km
    } else {
      return Math.max(25, Math.floor(difference / 2000)); // 25+ km
    }
  };

  const handleCepChange = (value: string) => {
    const cleanCep = value.replace(/\D/g, "");
    setCep(cleanCep);
    
    if (cleanCep.length === 8) {
      fetchAddressInfo(cleanCep);
      calculateShipping(cleanCep);
    } else {
      setAddressInfo(null);
    }
  };

  const fetchAddressInfo = async (cepValue: string) => {
    setIsLoadingAddress(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setAddressInfo(null);
        return;
      }
      
      setAddressInfo({
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        cep: data.cep
      });
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      setAddressInfo(null);
    } finally {
      setIsLoadingAddress(false);
    }
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
              <ShoppingCart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Carrinho de Compras</h1>
            <p className="text-slate-600">Revise seus itens antes de finalizar a compra</p>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-12 w-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Seu carrinho está vazio</h2>
              <p className="text-slate-600 mb-8">Adicione alguns produtos para começar suas compras</p>
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          ) : (
            /* Cart Content */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Itens no Carrinho ({cartItems.length})</h2>
                
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-0 shadow-sm bg-white rounded-xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                          <p className="text-xl font-bold text-blue-600">{formatPrice(item.price)}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0 border-slate-300 hover:bg-slate-50"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="text-lg font-semibold text-slate-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0 border-slate-300 hover:bg-slate-50"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden sticky top-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                    <CardTitle className="flex items-center space-x-3 text-slate-800">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Resumo do Pedido</h3>
                        <p className="text-slate-600 text-sm">Confirme seus itens</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Summary Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} itens)</span>
                        <span className="font-semibold text-slate-900">{formatPrice(calculateSubtotal())}</span>
                      </div>
                      
                      {/* Calculadora de Frete */}
                      <div className="border-t border-slate-200 pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-slate-600" />
                          <span className="text-sm font-medium text-slate-700">Calcular Frete</span>
                        </div>
                        <div className="flex gap-2 mb-3">
                          <Input
                            placeholder="CEP"
                            value={cep}
                            onChange={(e) => handleCepChange(e.target.value)}
                            maxLength={8}
                            className="flex-1"
                          />
                          <Button 
                            size="sm"
                            onClick={() => calculateShipping(cep)}
                            disabled={cep.length !== 8 || isCalculatingShipping}
                          >
                            {isCalculatingShipping ? "..." : "OK"}
                          </Button>
                        </div>
                        
                        {/* Informações do Endereço */}
                        {isLoadingAddress && (
                          <div className="p-3 bg-blue-50 rounded-lg text-sm">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              <span className="text-blue-700">Buscando endereço...</span>
                            </div>
                          </div>
                        )}
                        
                        {addressInfo && !isLoadingAddress && (
                          <div className="p-3 bg-green-50 rounded-lg text-sm mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-800">Endereço encontrado:</span>
                            </div>
                            <div className="text-green-700 space-y-1">
                              <div>{addressInfo.logradouro}</div>
                              <div>{addressInfo.bairro}</div>
                              <div>{addressInfo.localidade} - {addressInfo.uf}</div>
                              <div>CEP: {addressInfo.cep}</div>
                            </div>
                          </div>
                        )}
                        
                        {!addressInfo && !isLoadingAddress && cep.length === 8 && (
                          <div className="p-3 bg-red-50 rounded-lg text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-red-600" />
                              <span className="text-red-700">CEP não encontrado</span>
                            </div>
                          </div>
                        )}
                        
                        {shippingInfo && (
                          <div className="p-3 bg-slate-50 rounded-lg text-sm">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-slate-600">Distância:</span>
                              <span className="font-medium">{shippingInfo.distance} km</span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-slate-600">Prazo:</span>
                              <span className="font-medium">{shippingInfo.estimatedDelivery}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                                                                    <div className="flex justify-between items-center">
                         <span className="text-slate-600">Frete</span>
                         <div className="flex items-center gap-2">
                           {calculateSubtotal() >= 150 ? (
                             <>
                               <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                 Grátis
                               </Badge>
                               <span className="font-semibold text-slate-900">Grátis</span>
                             </>
                           ) : (
                             <span className="font-semibold text-slate-900">
                               {shippingCost > 0 ? formatPrice(shippingCost) : 'Calculando...'}
                             </span>
                           )}
                         </div>
                       </div>
                       
                       <div className="border-t border-slate-200 pt-4">
                         <div className="flex justify-between items-center">
                           <span className="text-lg font-bold text-slate-900">Total</span>
                           <span className="text-2xl font-bold text-blue-600">{formatPrice(calculateSubtotal())}</span>
                         </div>
                       </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link to="/checkout">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                          Finalizar Compra
                        </Button>
                      </Link>
                      
                      <Link to="/">
                        <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 py-3 rounded-xl transition-colors">
                          Continuar Comprando
                        </Button>
                      </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Informações Importantes</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Frete grátis para compras acima de R$ 100</li>
                        <li>• Entrega em até 3 dias úteis</li>
                        <li>• Pagamento seguro</li>
                      </ul>
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

export default Carrinho;
