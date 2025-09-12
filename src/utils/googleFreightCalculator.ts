// googleFreightCalculator.ts
// Sistema de frete com Google Maps API para máxima precisão
const GOOGLE_API_KEY = "AIzaSyAMPrCsvbfLFKAg4EHfvfDy5HbGDhbtnLE";
const WAREHOUSE_CEP = "09130-410, Santo André, SP";

export type CartItem = {
  sku: string;
  quantity: number;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  price: number;
};

export type FreightBreakdown = {
  distanceKm: number;
  adjustedDistanceKm: number;
  totalItems: number;
  totalWeightKg: number;
  volumetricWeightKg: number;
  actualWeightKg: number;
  orderValue: number;
  baseFee: number;
  distanceFee: number;
  weightFee: number;
  itemHandlingFee: number;
  valueInsuranceFee: number;
  finalFreight: number;
  freeShippingApplied: boolean;
  estimatedDeliveryDays: string;
  warehouseAddress: string;
  customerAddress: string;
  googleMapsUsed: boolean;
};

// Parâmetros de precificação
const PARAMS = {
  baseFee: 6.0,
  perKm: 1.1,
  perKg: 1.2,
  perItemHandling: 0.8,
  volumetricDivisor: 6000,
  valueInsurancePct: 0.003,
  freeShippingThreshold: 199.0,
  minFreight: 5.0,
  maxFreight: 50.0,
};

// Cache para coordenadas
const coordsCache = new Map<string, { lat: number; lng: number; address: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

// -------------------- FUNÇÕES AUXILIARES --------------------

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number; address: string }> {
  // Verifica cache primeiro
  const cached = coordsCache.get(address);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log('📍 Usando coordenadas do cache para:', address);
    return cached;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
    console.log('🌐 Fazendo requisição para Google Maps:', url);
    
    const resp = await fetch(url);
    const data = await resp.json();

    console.log('📡 Resposta Google Maps:', data);

    if (data.status !== "OK") {
      console.error('❌ Erro Google Maps:', data.status, data.error_message);
      throw new Error("Erro no Geocoding: " + data.status + (data.error_message ? " - " + data.error_message : ""));
    }

    if (!data.results || data.results.length === 0) {
      throw new Error("Nenhum resultado encontrado para: " + address);
    }

    const result = data.results[0];
    const location = result.geometry.location;
    
    const coordsResult = {
      lat: location.lat,
      lng: location.lng,
      address: result.formatted_address,
      timestamp: Date.now()
    };

    console.log('✅ Coordenadas obtidas:', coordsResult);

    // Salva no cache
    coordsCache.set(address, coordsResult);
    
    return coordsResult;
  } catch (error) {
    console.error('💥 Erro na geocodificação:', error);
    throw error;
  }
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number, multiplier = 1.3) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return { 
    straight: distance, 
    adjusted: distance * multiplier 
  };
}

// Calcula peso volumétrico
function volumetricWeightKg(lengthCm: number, widthCm: number, heightCm: number, divisor = PARAMS.volumetricDivisor): number {
  return (lengthCm * widthCm * heightCm) / divisor;
}

// Define prazo base por distância com os ajustes solicitados
function estimateDeliveryDays(distanceKm: number): string {
  if (distanceKm <= 10) return "1 - 3";   // para distâncias próximas
  if (distanceKm <= 50) return "3 - 5";   // para região metropolitana
  if (distanceKm <= 200) return "5 - 6";  // para região estadual
  return "6 - 8";                          // para regiões distantes
}

// Dimensões padrão para produtos sem especificações
const DEFAULT_PACKAGING = {
  weightKg: 0.5,
  lengthCm: 25,
  widthCm: 20,
  heightCm: 15,
};

// -------------------- CÁLCULO DE FRETE --------------------

export async function calculateFreight(customerCep: string, cart: CartItem[]): Promise<FreightBreakdown> {
  try {
    // 1) Geocodificação usando Google Maps
    const whCoords = await geocodeAddress(WAREHOUSE_CEP);
    const custCoords = await geocodeAddress(customerCep);

    // 2) Cálculo de distância com multiplicador para rotas reais
    const { straight, adjusted } = haversineKm(
      whCoords.lat, whCoords.lng,
      custCoords.lat, custCoords.lng,
      1.3 // multiplicador para considerar rotas reais
    );

    // 3) Cálculo de pesos e valores
    let actualWeightKg = 0;
    let volumetricWeightTotal = 0;
    let totalValue = 0;
    let totalItems = 0;

    for (const item of cart) {
      totalItems += item.quantity;
      totalValue += item.price * item.quantity;
      
      // Calcula peso volumétrico por item
      const volKg = volumetricWeightKg(item.lengthCm, item.widthCm, item.heightCm);
      volumetricWeightTotal += volKg * item.quantity;
      actualWeightKg += item.weightKg * item.quantity;
    }

    // Considera o maior entre peso real e volumétrico (prática de marketplaces)
    const totalWeightKg = Math.max(actualWeightKg, volumetricWeightTotal);

    // 4) Cálculo das taxas
    const baseFee = PARAMS.baseFee;
    const distanceFee = parseFloat((adjusted * PARAMS.perKm).toFixed(2));
    const weightFee = parseFloat((totalWeightKg * PARAMS.perKg).toFixed(2));
    const itemHandlingFee = parseFloat((totalItems * PARAMS.perItemHandling).toFixed(2));
    const valueInsuranceFee = parseFloat((totalValue * PARAMS.valueInsurancePct).toFixed(2));

    // 5) Cálculo do frete final
    let finalFreight = baseFee + distanceFee + weightFee + itemHandlingFee + valueInsuranceFee;
    const freeShippingApplied = totalValue >= PARAMS.freeShippingThreshold;

    if (freeShippingApplied) {
      finalFreight = 0;
    } else {
      // Aplica limites mínimo e máximo
      finalFreight = Math.max(PARAMS.minFreight, Math.min(PARAMS.maxFreight, finalFreight));
    }

    // 6) Prazo estimado com os novos valores
    const estimatedDeliveryDays = estimateDeliveryDays(adjusted);

    return {
      distanceKm: parseFloat(straight.toFixed(2)),
      adjustedDistanceKm: parseFloat(adjusted.toFixed(2)),
      totalItems,
      totalWeightKg: parseFloat(totalWeightKg.toFixed(3)),
      volumetricWeightKg: parseFloat(volumetricWeightTotal.toFixed(3)),
      actualWeightKg: parseFloat(actualWeightKg.toFixed(3)),
      orderValue: parseFloat(totalValue.toFixed(2)),
      baseFee,
      distanceFee,
      weightFee,
      itemHandlingFee,
      valueInsuranceFee,
      finalFreight: parseFloat(finalFreight.toFixed(2)),
      freeShippingApplied,
      estimatedDeliveryDays,
      warehouseAddress: whCoords.address,
      customerAddress: custCoords.address,
      googleMapsUsed: true
    };
  } catch (error) {
    console.error('Erro no cálculo de frete:', error);
    throw new Error('Não foi possível calcular o frete. Verifique o CEP informado.');
  }
}

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

// Função para calcular frete do carrinho (integração com o sistema existente)
export async function calculateFreightForCart(
  customerCep: string, 
  cartItems: any[]
): Promise<FreightBreakdown> {
  const freightItems = convertCartItemsToFreightItems(cartItems);
  
  try {
    console.log('🚀 Tentando calcular frete com Google Maps...');
    return await calculateFreight(customerCep, freightItems);
  } catch (error) {
    console.warn('⚠️ Google Maps falhou, usando sistema fallback:', error);
    
    // Fallback para sistema simples
    return await calculateFreightFallback(customerCep, freightItems);
  }
}

// Sistema de fallback usando cálculo simples
async function calculateFreightFallback(customerCep: string, cart: CartItem[]): Promise<FreightBreakdown> {
  console.log('🔄 Usando sistema de fallback para CEP:', customerCep);
  
  // Distância aproximada baseada em diferença de CEP
  const warehouseCep = "09130410";
  const customerCepNum = parseInt(customerCep.replace(/\D/g, ""));
  const warehouseCepNum = parseInt(warehouseCep);
  
  // Cálculo simplificado baseado na diferença de CEP
  const cepDiff = Math.abs(customerCepNum - warehouseCepNum);
  let estimatedDistance = 5; // distância padrão
  
  // Caso específico para Vila Bastos (09041xxx)
  if (customerCep.startsWith("09041")) {
    estimatedDistance = 4.0; // distância conhecida para Vila Bastos
    console.log('🎯 CEP Vila Bastos detectado, usando distância conhecida:', estimatedDistance, 'km');
  } else {
    // Estima distância baseada na diferença de CEP
    if (cepDiff < 1000) {
      estimatedDistance = 3 + (cepDiff / 1000) * 2; // 3-5km para CEPs próximos
    } else if (cepDiff < 5000) {
      estimatedDistance = 5 + (cepDiff / 5000) * 10; // 5-15km para CEPs da região
    } else {
      estimatedDistance = 15 + (cepDiff / 10000) * 20; // 15-35km para CEPs distantes
    }
    console.log('📏 Distância estimada por CEP diff:', estimatedDistance, 'km');
  }
  
  const adjustedDistance = estimatedDistance * 1.3; // aplica o multiplicador
  
  // Cálcula pesos
  let actualWeightKg = 0;
  let volumetricWeightTotal = 0;
  let totalValue = 0;
  let totalItems = 0;

  for (const item of cart) {
    totalItems += item.quantity;
    totalValue += item.price * item.quantity;
    
    const volKg = volumetricWeightKg(item.lengthCm, item.widthCm, item.heightCm);
    volumetricWeightTotal += volKg * item.quantity;
    actualWeightKg += item.weightKg * item.quantity;
  }

  const totalWeightKg = Math.max(actualWeightKg, volumetricWeightTotal);

  // Calcula taxas
  const baseFee = PARAMS.baseFee;
  const distanceFee = parseFloat((adjustedDistance * PARAMS.perKm).toFixed(2));
  const weightFee = parseFloat((totalWeightKg * PARAMS.perKg).toFixed(2));
  const itemHandlingFee = parseFloat((totalItems * PARAMS.perItemHandling).toFixed(2));
  const valueInsuranceFee = parseFloat((totalValue * PARAMS.valueInsurancePct).toFixed(2));

  let finalFreight = baseFee + distanceFee + weightFee + itemHandlingFee + valueInsuranceFee;
  const freeShippingApplied = totalValue >= PARAMS.freeShippingThreshold;

  if (freeShippingApplied) {
    finalFreight = 0;
  } else {
    finalFreight = Math.max(PARAMS.minFreight, Math.min(PARAMS.maxFreight, finalFreight));
  }

  const estimatedDeliveryDays = estimateDeliveryDays(adjustedDistance);

  console.log('📦 Resultado fallback:', {
    distanceKm: estimatedDistance,
    adjustedDistanceKm: adjustedDistance,
    finalFreight,
    estimatedDeliveryDays
  });

  return {
    distanceKm: parseFloat(estimatedDistance.toFixed(2)),
    adjustedDistanceKm: parseFloat(adjustedDistance.toFixed(2)),
    totalItems,
    totalWeightKg: parseFloat(totalWeightKg.toFixed(3)),
    volumetricWeightKg: parseFloat(volumetricWeightTotal.toFixed(3)),
    actualWeightKg: parseFloat(actualWeightKg.toFixed(3)),
    orderValue: parseFloat(totalValue.toFixed(2)),
    baseFee,
    distanceFee,
    weightFee,
    itemHandlingFee,
    valueInsuranceFee,
    finalFreight: parseFloat(finalFreight.toFixed(2)),
    freeShippingApplied,
    estimatedDeliveryDays,
    warehouseAddress: "Estoque - Santo André, SP",
    customerAddress: `CEP ${customerCep} (estimado)`,
    googleMapsUsed: false
  };
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
