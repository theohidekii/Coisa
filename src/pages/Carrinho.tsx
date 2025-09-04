import { useState } from "react";
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus, MapPin, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculateDistance, calculateShippingCost, getEstimatedDelivery, STORE_CEP } from "@/utils/distanceCalculator";
import { useCart } from "@/context/CartContext";

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
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [cep, setCep] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [addressInfo, setAddressInfo] = useState<any>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const calculateSubtotal = () => {
    return getCartTotal();
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
      const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight || 1 * item.quantity), 0);
      const subtotal = calculateSubtotal();
      
      // Cálculo de distância usando o novo utilitário
      const distance = calculateDistance(STORE_CEP, cepValue);
      
      // Calcular custo do frete
      const freeShipping = subtotal >= 150;
      const shippingCost = calculateShippingCost(distance, totalWeight, freeShipping);
      
      // Tempo estimado de entrega
      const estimatedDelivery = getEstimatedDelivery(distance);
      
      console.log('Cálculo de frete:', {
        cep: cepValue,
        distance,
        totalWeight,
        subtotal,
        shippingCost,
        freeShipping
      });
      
      setShippingCost(shippingCost);
      setShippingInfo({
        distance,
        estimatedDelivery
      });
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
    } finally {
      setIsCalculatingShipping(false);
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
              <ShoppingCart className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Carrinho de Compras</h1>
            <p className="text-sm md:text-base text-slate-600">Revise seus itens antes de finalizar a compra</p>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-12 md:py-16">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <ShoppingCart className="h-10 w-10 md:h-12 md:w-12 text-slate-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3 md:mb-4">Seu carrinho está vazio</h2>
              <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8">Adicione alguns produtos para começar suas compras</p>
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          ) : (
            /* Cart Content */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4 md:mb-6">Itens no Carrinho ({cartItems.length})</h2>
                
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-0 shadow-sm bg-white rounded-xl overflow-hidden">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start space-x-4 md:space-x-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 md:w-28 md:h-28 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info and Controls */}
                        <div className="flex-1 min-w-0">
                          {/* Product Header */}
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1 leading-tight">{item.name}</h3>
                              <p className="text-xs md:text-sm text-slate-500 mb-2">{item.category}</p>
                              <p className="text-base md:text-lg font-bold text-blue-600">{formatPrice(item.price)}</p>
                            </div>
                            
                            {/* Remove Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id.toString())}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>

                          {/* Quantity Controls and Total */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id.toString(), item.quantity - 1)}
                                className="w-10 h-10 md:w-12 md:h-12 p-0 border-slate-300 hover:bg-slate-50"
                              >
                                <Minus className="h-5 w-5" />
                              </Button>
                              
                              <span className="text-base md:text-lg font-semibold text-slate-900 min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id.toString(), item.quantity + 1)}
                                className="w-10 h-10 md:w-12 md:h-12 p-0 border-slate-300 hover:bg-slate-50"
                              >
                                <Plus className="h-5 w-5" />
                              </Button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <p className="text-base md:text-lg font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden sticky top-6">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-4 md:p-6">
                    <CardTitle className="flex items-center space-x-3 md:space-x-4 text-slate-800">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900">Resumo do Pedido</h3>
                        <p className="text-sm md:text-base text-slate-600">Confirme seus itens</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
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
                          <span className="text-xs md:text-sm font-medium text-slate-700">Calcular Frete</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mb-3">
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
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
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
                    <div className="space-y-3 md:space-y-4">
                      <Link to="/checkout">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 md:py-4 rounded-xl font-semibold text-base md:text-lg">
                          Finalizar Compra
                        </Button>
                      </Link>
                      
                      <Link to="/">
                        <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 py-4 md:py-4 rounded-xl transition-colors text-base md:text-lg">
                          Continuar Comprando
                        </Button>
                      </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 md:mt-8 p-4 md:p-5 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-3 text-base md:text-lg">Informações Importantes</h4>
                      <ul className="text-sm md:text-base text-slate-600 space-y-2">
                        <li>• Frete grátis para compras acima de R$ 150</li>
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
