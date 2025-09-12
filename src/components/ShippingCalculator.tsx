import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Truck, Package, Calculator, CheckCircle, Clock, Weight, Route, DollarSign, AlertCircle } from "lucide-react";
import { calculateFreightForCart, FreightBreakdown } from "@/utils/googleFreightCalculator";
import { useCart } from "@/context/CartContext";

const ShippingCalculator = () => {
  const { cartItems, getCartTotal } = useCart();
  const [cep, setCep] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [cepInfo, setCepInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calculation, setCalculation] = useState<FreightBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCepInfo = async (cepValue: string) => {
    if (cepValue.length !== 8) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setCepInfo(data);
        await calculateAdvancedShipping(cepValue);
      } else {
        setError("CEP não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setError("Erro ao buscar informações do CEP");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAdvancedShipping = async (cepValue: string) => {
    try {
      // Monta endereço completo se número foi fornecido
      const fullAddress = addressNumber 
        ? `${cepValue}, ${addressNumber}` 
        : cepValue;
      
      // Calcula frete usando Google Maps API
      const freightBreakdown = await calculateFreightForCart(fullAddress, cartItems);
      
      setCalculation(freightBreakdown);
    } catch (error) {
      console.error("Erro no cálculo de frete:", error);
      setError("Erro ao calcular frete. Verifique o CEP informado.");
    }
  };

  const handleCepChange = (value: string) => {
    const cleanCep = value.replace(/\D/g, "");
    setCep(cleanCep);
    
    if (cleanCep.length === 8) {
      fetchCepInfo(cleanCep);
    } else {
      setCalculation(null);
      setCepInfo(null);
      setError(null);
    }
  };

  const formatCep = (cep: string) => {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculadora de Frete Avançada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input CEP */}
          <div className="space-y-2">
            <label className="text-sm font-medium">CEP de Destino</label>
            <div className="flex gap-2">
              <Input
                placeholder="00000-000"
                value={cep}
                onChange={(e) => handleCepChange(e.target.value)}
                maxLength={8}
                className="flex-1"
              />
              <Button 
                onClick={() => fetchCepInfo(cep)}
                disabled={cep.length !== 8 || isLoading}
              >
                {isLoading ? "Calculando..." : "Calcular"}
              </Button>
            </div>
          </div>

          {/* Input Número do Endereço */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Número do Endereço 
              <span className="text-xs text-gray-500 ml-1">(opcional - para maior precisão)</span>
            </label>
            <Input
              placeholder="Ex: 123, 456A, S/N"
              value={addressNumber}
              onChange={(e) => setAddressNumber(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              💡 Incluir o número melhora a precisão do cálculo de distância
            </p>
          </div>

          {/* Erro */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Informações do CEP */}
          {cepInfo && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">Endereço encontrado:</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {cepInfo.logradouro}, {cepInfo.bairro}
              </p>
              <p className="text-sm text-muted-foreground">
                {cepInfo.localidade} - {cepInfo.uf}
              </p>
            </div>
          )}

          {/* Resultado do cálculo */}
          {calculation && (
            <div className="space-y-6">
              {/* Resumo Principal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Route className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Distância</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{calculation.distanceKm} km</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Google Maps | Rota Ajustada (+30%)
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Prazo</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{calculation.estimatedDeliveryDays} dias úteis</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Peso Total</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">{calculation.totalWeightKg} kg</p>
                </div>
              </div>

              {/* Breakdown Detalhado */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Detalhamento do Frete</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Itens no carrinho:</span>
                      <span className="font-medium">{calculation.totalItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distância em linha reta:</span>
                      <span className="font-medium">{calculation.distanceKm} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distância ajustada (rota):</span>
                      <span className="font-medium">{calculation.adjustedDistanceKm} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peso real:</span>
                      <span className="font-medium">{calculation.actualWeightKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peso volumétrico:</span>
                      <span className="font-medium">{calculation.volumetricWeightKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peso considerado:</span>
                      <span className="font-medium">{calculation.totalWeightKg} kg</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tarifa base:</span>
                      <span className="font-medium">R$ {calculation.baseFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa por distância:</span>
                      <span className="font-medium">R$ {calculation.distanceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa por peso:</span>
                      <span className="font-medium">R$ {calculation.weightFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa por item:</span>
                      <span className="font-medium">R$ {calculation.itemHandlingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seguro:</span>
                      <span className="font-medium">R$ {calculation.valueInsuranceFee.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Total do Frete */}
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-lg">Custo do Frete:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {calculation.freeShippingApplied ? (
                      <>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Grátis
                        </Badge>
                        <span className="font-bold text-2xl text-green-600">Grátis</span>
                      </>
                    ) : (
                      <span className="font-bold text-2xl text-primary">
                        R$ {calculation.finalFreight.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• <strong>Google Maps:</strong> Geocodificação precisa de endereços</p>
                  <p>• <strong>Distância Ajustada:</strong> +30% sobre linha reta (rotas reais)</p>
                  <p>• <strong>Peso Volumétrico:</strong> (L × A × C) ÷ 6000</p>
                  <p>• <strong>Peso Efetivo:</strong> Maior entre peso real e volumétrico</p>
                  <p>• <strong>Frete Grátis:</strong> Pedidos acima de R$ 199,00</p>
                  <p>• <strong>Prazos Estendidos:</strong> Até 10km: 3 dias | Até 50km: 5 dias | Até 200km: 6 dias | Acima 200km: 8 dias</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingCalculator;
