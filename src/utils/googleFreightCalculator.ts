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

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  // Aplica multiplicador diferenciado baseado na distância
  const multiplier = distance > 150 ? 1.22 : 1.3;
  const adjustedDistance = distance * multiplier;
  
  console.log(`🔢 Google Maps - Multiplicador aplicado: ${multiplier}x (${distance.toFixed(1)}km -> ${adjustedDistance.toFixed(1)}km)`);
  
  return { 
    straight: distance, 
    adjusted: adjustedDistance 
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

    // 2) Cálculo de distância com multiplicador diferenciado para rotas reais
    const { straight, adjusted } = haversineKm(
      whCoords.lat, whCoords.lng,
      custCoords.lat, custCoords.lng
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

// Tabela de distâncias conhecidas por região/estado
const DISTANCE_TABLE: { [key: string]: number } = {
  // São Paulo - Região Metropolitana
  "01": 40,   // São Paulo - Centro
  "02": 45,   // São Paulo - Zona Norte
  "03": 50,   // São Paulo - Zona Leste
  "04": 35,   // São Paulo - Zona Sul
  "05": 45,   // São Paulo - Zona Oeste
  "06": 25,   // Osasco
  "07": 30,   // Guarulhos
  "08": 20,   // Franco da Rocha
  "09": 15,   // Santo André (nossa região)
  
  // São Paulo - Interior
  "11": 60,   // Santos
  "12": 150,  // São José dos Campos
  "13": 70,   // Campinas
  "14": 350,  // Bauru
  "15": 200,  // Sorocaba
  "16": 300,  // Ribeirão Preto
  "17": 400,  // São José do Rio Preto
  "18": 450,  // Presidente Prudente
  "19": 180,  // Americana
  
  // Outros Estados
  "20": 450,  // Rio de Janeiro
  "21": 450,  // Rio de Janeiro
  "22": 500,  // Campos/RJ
  "23": 500,  // Nova Iguaçu/RJ
  "24": 550,  // Volta Redonda/RJ
  "25": 600,  // São Gonçalo/RJ
  "26": 650,  // Nova Friburgo/RJ
  "27": 700,  // Cachoeiro/ES
  "28": 750,  // Campos/ES
  "29": 800,  // Vitória/ES
  
  "30": 600,  // Belo Horizonte/MG
  "31": 600,  // Belo Horizonte/MG
  "32": 650,  // Juiz de Fora/MG
  "33": 700,  // Governador Valadares/MG
  "34": 750,  // Uberlândia/MG
  "35": 500,  // Poços de Caldas/MG
  "36": 550,  // Uberaba/MG
  "37": 600,  // Divinópolis/MG
  "38": 650,  // Montes Claros/MG
  "39": 700,  // Patos de Minas/MG
  
  "40": 600,  // Curitiba/PR
  "41": 600,  // Curitiba/PR
  "42": 650,  // Ponta Grossa/PR
  "43": 700,  // Apucarana/PR
  "44": 750,  // Maringá/PR
  "45": 800,  // Londrina/PR
  "46": 850,  // Francisco Beltrão/PR
  "47": 400,  // Joinville/SC
  "48": 450,  // Florianópolis/SC
  "49": 500,  // Criciúma/SC
  
  "50": 1200, // Recife/PE
  "51": 900,  // Porto Alegre/RS
  "52": 1150, // Maceió/AL
  "53": 1250, // João Pessoa/PB
  "54": 1300, // Natal/RN
  "55": 1100, // Petrolina/PE
  "56": 1350, // Campina Grande/PB
  "57": 1200, // Arapiraca/AL
  "58": 1300, // Sousa/PB
  "59": 1350, // Mossoró/RN
  
  "60": 1450, // Teresina/PI
  "61": 883, // Brasília/DF
  "62": 1500, // Goiânia/GO
  "63": 1400, // Palmas/TO
  "64": 1600, // Parnaíba/PI
  "65": 1000, // Cuiabá/MT
  "66": 2200, // Rio Branco/AC
  "67": 1100, // Campo Grande/MS
  "68": 1800, // Porto Velho/RO
  "69": 2400, // Manaus/AM
  
  "70": 883, // Brasília/DF
  "71": 883, // Brasília/DF
  "72": 883, // Brasília/DF
  "73": 883, // Brasília/DF
  
  "74": 1500, // Goiânia/GO
  "75": 1550, // Anápolis/GO
  "76": 1600, // Caldas Novas/GO
  "77": 1000, // Cuiabá/MT
  "78": 1050, // Várzea Grande/MT
  "79": 1100, // Campo Grande/MS
  
  "80": 700,  // Aracaju/SE
  "81": 650,  // Recife/PE
  "82": 1150, // Maceió/AL
  "83": 1200, // João Pessoa/PB
  "84": 1300, // Natal/RN
  "85": 1800, // Fortaleza/CE
  "86": 1450, // Teresina/PI
  "87": 1350, // Garanhuns/PE
  "88": 1400, // Petrolina/PE
  "89": 1500, // Picos/PI
  
  "90": 1800, // São Luís/MA
  "91": 2600, // Belém/PA
  "92": 2800, // Manaus/AM
  "93": 2700, // Santarém/PA
  "94": 2900, // Marabá/PA
  "95": 3000, // Boa Vista/RR
  "96": 2500, // Macapá/AP
  "97": 2400, // Coari/AM
  "98": 1900, // São Luís/MA
  "99": 1950, // Imperatriz/MA
};

// Sistema de fallback usando tabela de distâncias conhecidas
async function calculateFreightFallback(customerCep: string, cart: CartItem[]): Promise<FreightBreakdown> {
  console.log('🔄 Usando sistema de fallback para CEP:', customerCep);
  
  // Pega os primeiros 2 dígitos do CEP para determinar a região
  const cepPrefix = customerCep.substring(0, 2);
  let estimatedDistance = DISTANCE_TABLE[cepPrefix] || 1000; // padrão para CEPs não mapeados
  
  console.log(`📍 CEP ${customerCep} -> Região ${cepPrefix} -> Distância: ${estimatedDistance}km`);
  
  // Casos específicos para nossa região (Santo André)
  if (customerCep.startsWith("09041")) {
    estimatedDistance = 4.0; // Vila Bastos - distância conhecida
    console.log('🎯 CEP Vila Bastos detectado, usando distância conhecida:', estimatedDistance, 'km');
  } else if (customerCep.startsWith("0913")) {
    estimatedDistance = 2.0; // Centro de Santo André
    console.log('🎯 CEP Centro Santo André detectado:', estimatedDistance, 'km');
  } else if (customerCep.startsWith("091")) {
    estimatedDistance = 8.0; // Outras regiões de Santo André
    console.log('🎯 CEP Santo André detectado:', estimatedDistance, 'km');
  }
  
  // Aplica multiplicador diferenciado baseado na distância
  const multiplier = estimatedDistance > 150 ? 1.22 : 1.3;
  const adjustedDistance = estimatedDistance * multiplier;
  
  console.log(`🔢 Multiplicador aplicado: ${multiplier}x (${estimatedDistance}km -> ${adjustedDistance.toFixed(1)}km)`);
  
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
