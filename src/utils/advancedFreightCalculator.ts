// advancedFreightCalculator.ts
// Sistema de cálculo de frete avançado baseado em práticas de marketplaces
// Usa ViaCEP + Nominatim para geocodificação e cálculo preciso de distância

export type CartItem = {
  sku: string;
  quantity: number;
  weightKg: number;      // peso real por unidade em kg
  lengthCm: number;      // comprimento (cm)
  widthCm: number;       // largura (cm)
  heightCm: number;      // altura (cm)
  price: number;         // preço unitário em R$
};

export type FreightBreakdown = {
  distanceKm: number;
  totalItems: number;
  totalWeightKg: number;        // peso considerado (soma max(real, vol) por item)
  volumetricWeightKg: number;
  actualWeightKg: number;
  baseFee: number;
  distanceFee: number;
  weightFee: number;
  itemHandlingFee: number;
  valueInsuranceFee: number;
  voucherDiscount: number;
  finalFreight: number;
  freeShippingApplied: boolean;
  estimatedDays: number;
  warehouseAddress: string;
  customerAddress: string;
  addressPrecision: 'exact' | 'street' | 'neighborhood' | 'city';
};

// CEP do estoque (Santo André - SP)
const WAREHOUSE_CEP = "09130-410";

// Parâmetros de precificação (ajustáveis conforme necessidade)
const PARAMS = {
  baseFee: 8.0,             // tarifa fixa inicial em R$
  perKm: 0.8,               // R$ por km
  perKg: 1.5,               // R$ por kg considerado (peso efetivo)
  perItemHandling: 0.8,     // R$ por item (embalagem/manuseio)
  volumetricDivisor: 6000,  // divisor usado no Brasil (L*W*H / 6000) -> kg
  valueInsurancePct: 0.003, // 0.3% do valor do pedido como seguro
  freeShippingThreshold: 199.0, // pedido acima disso tem frete grátis
  minFreight: 5.0,          // frete mínimo
  maxFreight: 50.0,         // frete máximo
};

// Cache para coordenadas (evita chamadas repetidas)
const coordsCache = new Map<string, { lat: number; lon: number; address: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Busca coordenadas do CEP usando ViaCEP + Nominatim com fallback de precisão
async function getCoordsFromCep(cep: string, addressNumber?: string): Promise<{ lat: number; lon: number; address: string; precision: 'exact' | 'street' | 'neighborhood' | 'city' } | null> {
  const cepSanitized = cep.replace(/\D/g, "");
  const cacheKey = `${cepSanitized}-${addressNumber || 'no-number'}`;
  
  // Verifica cache primeiro
  const cached = coordsCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached;
  }

  try {
    // ViaCEP para buscar endereço
    const viaCepUrl = `https://viacep.com.br/ws/${cepSanitized}/json/`;
    const resp = await fetch(viaCepUrl);
    if (!resp.ok) throw new Error(`ViaCEP error: ${resp.status}`);
    const data = await resp.json();
    if (data.erro) return null;

    // Tenta diferentes níveis de precisão
    const addressAttempts = [
      // Tentativa 1: Endereço completo com número (mais preciso)
      addressNumber ? `${data.logradouro}, ${addressNumber}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil` : null,
      // Tentativa 2: Apenas logradouro + bairro (precisão média)
      `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`,
      // Tentativa 3: Apenas bairro + cidade (menos preciso)
      `${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`,
      // Tentativa 4: Apenas cidade (fallback)
      `${data.localidade}, ${data.uf}, Brasil`
    ].filter(Boolean);

    for (let i = 0; i < addressAttempts.length; i++) {
      const addressQuery = addressAttempts[i];
      const precision = i === 0 ? 'exact' : i === 1 ? 'street' : i === 2 ? 'neighborhood' : 'city';
      
      try {
        // Nominatim para geocodificação
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery!)}&limit=1&addressdetails=1`;
        const resp2 = await fetch(nominatimUrl, { 
          headers: { 
            "User-Agent": "COISA-FreightCalc/1.0 (contato@coisa.com.br)" 
          } 
        });
        
        if (!resp2.ok) continue;
        const places = await resp2.json();
        
        if (places && places.length > 0) {
          const result = {
            lat: parseFloat(places[0].lat),
            lon: parseFloat(places[0].lon),
            address: addressQuery!,
            precision: precision as 'exact' | 'street' | 'neighborhood' | 'city',
            timestamp: Date.now()
          };

          // Salva no cache
          coordsCache.set(cacheKey, result);
          
          return result;
        }
      } catch (error) {
        console.warn(`Tentativa ${i + 1} de geocodificação falhou:`, error);
        continue;
      }
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error);
    return null;
  }
}

// Calcula peso volumétrico
function volumetricWeightKg(lengthCm: number, widthCm: number, heightCm: number, divisor = PARAMS.volumetricDivisor): number {
  return (lengthCm * widthCm * heightCm) / divisor;
}

// Estima prazo de entrega baseado na distância
function estimateDeliveryDays(distanceKm: number): number {
  if (distanceKm <= 10) return 1; // Entrega no mesmo dia para região próxima
  if (distanceKm <= 50) return 2; // 1-2 dias para região metropolitana
  if (distanceKm <= 200) return 3; // 2-3 dias para região estadual
  if (distanceKm <= 500) return 5; // 3-5 dias para região nacional
  return 7; // 5-7 dias para regiões distantes
}

// Função principal de cálculo de frete
export async function calculateFreightForCart(
  customerCep: string, 
  cart: CartItem[], 
  voucherDiscount = 0,
  addressNumber?: string
): Promise<FreightBreakdown> {
  
  // 1) Busca coordenadas do estoque e do cliente
  const whCoords = await getCoordsFromCep(WAREHOUSE_CEP);
  if (!whCoords) throw new Error("Não foi possível geocodificar o CEP do estoque.");
  
  const custCoords = await getCoordsFromCep(customerCep, addressNumber);
  if (!custCoords) throw new Error("Não foi possível geocodificar o CEP do cliente.");

  // 2) Calcula distância em km
  const distanceKm = parseFloat(haversineKm(whCoords.lat, whCoords.lon, custCoords.lat, custCoords.lon).toFixed(2));

  // 3) Calcula pesos e valores
  let actualWeightKg = 0;
  let volumetricWeightTotal = 0;
  let totalItems = 0;
  let orderValue = 0;

  for (const item of cart) {
    totalItems += item.quantity;
    orderValue += item.price * item.quantity;
    
    const volKg = volumetricWeightKg(item.lengthCm, item.widthCm, item.heightCm);
    volumetricWeightTotal += volKg * item.quantity;
    actualWeightKg += item.weightKg * item.quantity;
  }

  // Considera o maior entre peso real e volumétrico (prática de marketplaces)
  const totalWeightKg = Math.max(actualWeightKg, volumetricWeightTotal);

  // 4) Calcula componentes do frete
  const baseFee = PARAMS.baseFee;
  const distanceFee = parseFloat((PARAMS.perKm * distanceKm).toFixed(2));
  const weightFee = parseFloat((PARAMS.perKg * totalWeightKg).toFixed(2));
  const itemHandlingFee = parseFloat((PARAMS.perItemHandling * totalItems).toFixed(2));
  const valueInsuranceFee = parseFloat((orderValue * PARAMS.valueInsurancePct).toFixed(2));

  // 5) Calcula frete final
  let finalFreight = baseFee + distanceFee + weightFee + itemHandlingFee + valueInsuranceFee;
  finalFreight = Math.max(0, finalFreight - voucherDiscount);

  // 6) Aplica frete grátis se necessário
  const freeShippingApplied = orderValue >= PARAMS.freeShippingThreshold;
  if (freeShippingApplied) {
    finalFreight = 0;
  } else {
    // Aplica limites mínimo e máximo
    finalFreight = Math.max(PARAMS.minFreight, Math.min(PARAMS.maxFreight, finalFreight));
  }

  // 7) Estima prazo de entrega
  const estimatedDays = estimateDeliveryDays(distanceKm);

  return {
    distanceKm,
    totalItems,
    totalWeightKg: parseFloat(totalWeightKg.toFixed(3)),
    volumetricWeightKg: parseFloat(volumetricWeightTotal.toFixed(3)),
    actualWeightKg: parseFloat(actualWeightKg.toFixed(3)),
    baseFee,
    distanceFee,
    weightFee,
    itemHandlingFee,
    valueInsuranceFee,
    voucherDiscount: parseFloat(voucherDiscount.toFixed(2)),
    finalFreight: parseFloat(finalFreight.toFixed(2)),
    freeShippingApplied,
    estimatedDays,
    warehouseAddress: whCoords.address,
    customerAddress: custCoords.address,
    addressPrecision: custCoords.precision
  };
}

// Dimensões padrão para produtos sem especificações
const DEFAULT_PACKAGING = {
  weightKg: 0.5,    // 500g padrão
  lengthCm: 25,     // 25cm comprimento
  widthCm: 20,      // 20cm largura  
  heightCm: 15,     // 15cm altura
};

// Função para converter produtos do carrinho para o formato CartItem
export function convertCartItemsToFreightItems(cartItems: any[]): CartItem[] {
  return cartItems.map(item => ({
    sku: item.id || item.sku || `item-${item.name}`,
    quantity: item.quantity || 1,
    weightKg: item.weightKg || DEFAULT_PACKAGING.weightKg,
    lengthCm: item.lengthCm || DEFAULT_PACKAGING.lengthCm,
    widthCm: item.widthCm || DEFAULT_PACKAGING.widthCm,
    heightCm: item.heightCm || DEFAULT_PACKAGING.heightCm,
    price: item.price || 0
  }));
}

// Função para limpar cache (útil para desenvolvimento)
export function clearCoordsCache(): void {
  coordsCache.clear();
}

// Função para obter estatísticas do cache
export function getCacheStats(): { size: number; entries: string[] } {
  return {
    size: coordsCache.size,
    entries: Array.from(coordsCache.keys())
  };
}
