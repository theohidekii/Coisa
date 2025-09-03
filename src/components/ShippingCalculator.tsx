import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, Package, Calculator, CheckCircle } from "lucide-react";

interface ShippingCalculation {
  cep: string;
  distance: number;
  weight: number;
  subtotal: number;
  shippingCost: number;
  total: number;
  freeShipping: boolean;
  estimatedDelivery: string;
}

const ShippingCalculator = () => {
  const [cep, setCep] = useState("");
  const [cepInfo, setCepInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calculation, setCalculation] = useState<ShippingCalculation | null>(null);

  // Configurações do frete
  const SHIPPING_CONFIG = {
    baseRate: 7.90,
    distanceRate: 1.20, // por km acima de 5km
    freeShippingThreshold: 150.00,
    storeCep: "09130-410", // CEP da loja COISA
    weightRates: {
      "1-5": 5.00,
      "5-10": 10.00,
      "10+": "personalizado"
    }
  };

  // Dados de exemplo (simulando carrinho)
  const cartData = {
    items: [
      { name: "Tinta Branca 18L", weight: 2.5, price: 45.00 },
      { name: "Cimento CP-II 50kg", weight: 50, price: 25.00 },
      { name: "Furadeira 13mm", weight: 1.8, price: 120.00 }
    ],
    totalWeight: 54.3,
    subtotal: 190.00
  };

  const fetchCepInfo = async (cepValue: string) => {
    if (cepValue.length !== 8) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setCepInfo(data);
        calculateShipping(cepValue, data);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setIsLoading(false);
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

  const calculateWeightCost = (weight: number): number => {
    if (weight <= 1) return 0;
    if (weight <= 5) return SHIPPING_CONFIG.weightRates["1-5"];
    if (weight <= 10) return SHIPPING_CONFIG.weightRates["5-10"];
    return 15.00; // Para pesos acima de 10kg
  };

  const calculateShipping = (cepValue: string, cepData: any) => {
    const distance = calculateDistance(SHIPPING_CONFIG.storeCep, cepValue);
    const weightCost = calculateWeightCost(cartData.totalWeight);
    
    let shippingCost = SHIPPING_CONFIG.baseRate;
    
    // Adicional por distância
    if (distance > 5) {
      shippingCost += (distance - 5) * SHIPPING_CONFIG.distanceRate;
    }
    
    // Adicional por peso
    shippingCost += weightCost;
    
    // Frete grátis
    const freeShipping = cartData.subtotal >= SHIPPING_CONFIG.freeShippingThreshold;
    if (freeShipping) {
      shippingCost = 0;
    }
    
         // O frete não é adicionado ao total, apenas informativo
     const total = cartData.subtotal;
    
    // Estimativa de entrega
    const estimatedDelivery = distance <= 10 ? "1-2 dias úteis" : 
                             distance <= 30 ? "2-3 dias úteis" : 
                             "3-5 dias úteis";
    
    setCalculation({
      cep: cepValue,
      distance,
      weight: cartData.totalWeight,
      subtotal: cartData.subtotal,
      shippingCost,
      total,
      freeShipping,
      estimatedDelivery
    });
  };

  const handleCepChange = (value: string) => {
    const cleanCep = value.replace(/\D/g, "");
    setCep(cleanCep);
    
    if (cleanCep.length === 8) {
      fetchCepInfo(cleanCep);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculadora de Frete
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Distância:</span>
                  <p className="font-medium">{calculation.distance} km</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Peso total:</span>
                  <p className="font-medium">{calculation.weight} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Prazo estimado:</span>
                  <p className="font-medium">{calculation.estimatedDelivery}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Subtotal:</span>
                  <p className="font-medium">R$ {calculation.subtotal.toFixed(2)}</p>
                </div>
              </div>

              {/* Custo do frete */}
              <div className="border-t pt-4">
                                 <div className="flex justify-between items-center">
                   <span className="text-muted-foreground">Custo do frete:</span>
                   <div className="flex items-center gap-2">
                     {calculation.freeShipping ? (
                       <>
                         <Badge variant="secondary" className="bg-green-100 text-green-800">
                           <CheckCircle className="h-3 w-3 mr-1" />
                           Grátis
                         </Badge>
                         <span className="font-bold text-lg">Grátis</span>
                       </>
                     ) : (
                       <span className="font-bold text-lg">
                         R$ {calculation.shippingCost.toFixed(2)}
                       </span>
                     )}
                   </div>
                 </div>
                
                <div className="flex justify-between items-center mt-2 pt-2 border-t">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-xl text-primary">
                    R$ {calculation.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Opções de frete */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button className="w-full" variant="outline">
                  <Truck className="h-4 w-4 mr-2" />
                  Econômico
                </Button>
                <Button className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  Expresso
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingCalculator;
