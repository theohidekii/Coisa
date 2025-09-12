// googleMapsFreightCalculator.ts
// Versão com Google Maps API para máxima precisão
// Requer chave de API do Google Maps

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
  totalItems: number;
  totalWeightKg: number;
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
  googleMapsUsed: boolean;
};

// CEP do estoque
const WAREHOUSE_CEP = "09130-410";

// Parâmetros de precificação
const PARAMS = {
  baseFee: 8.0,
  perKm: 0.8,
  perKg: 1.5,
  perItemHandling: 0.8,
  volumetricDivisor: 6000,
  valueInsurancePct: 0.003,
  freeShippingThreshold: 199.0,
  minFreight: 5.0,
  maxFreight: 50.0,
};

// Cache para coordenadas
const coordsCache = new Map<string, { lat: number; lon: number; address: string; precision: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000;

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Geocodificação com Google Maps API
async function getCoordsFromGoogleMaps(address: string, apiKey: string): Promise<{ lat: number; lon: number; address: string; precision: string } | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      const location = result.geometry.location;
      
      // Determina precisão baseada no tipo de resultado
      let precision = 'city';
      if (result.geometry.location_type === 'ROOFTOP') {
        precision = 'exact';
      } else if (result.geometry.location_type === 'RANGE_INTERPOLATED') {
        precision = 'street';
      } else if (result.geometry.location_type === 'GEOMETRIC_CENTER') {
        precision = 'neighborhood';
      }
      
      return {
        lat: location.lat,
        lon: location.lng,
        address: result.formatted_address,
        precision
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro na geocodificação Google Maps:', error);
    return null;
  }
}

// Fallback para ViaCEP + Nominatim (sem API key)
async function getCoordsFromCepFallback(cep: string, addressNumber?: string): Promise<{ lat: number; lon: number; address: string; precision: string } | null> {
  const cepSanitized = cep.replace(/\D/g, "");
  const cacheKey = `${cepSanitized}-${addressNumber || 'no-number'}`;
  
  const cached = coordsCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached;
  }

  try {
    const viaCepUrl = `https://viacep.com.br/ws/${cepSanitized}/json/`;
    const resp = await fetch(viaCepUrl);
    if (!resp.ok) throw new Error(`ViaCEP error: ${resp.status}`);
    const data = await resp.json();
    if (data.erro) return null;

    const addressAttempts = [
      addressNumber ? `${data.logradouro}, ${addressNumber}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil` : null,
      `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`,
      `${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`,
      `${data.localidade}, ${data.uf}, Brasil`
    ].filter(Boolean);

    for (let i = 0; i < addressAttempts.length; i++) {
      const addressQuery = addressAttempts[i];
      const precision = i === 0 ? 'exact' : i === 1 ? 'street' : i === 2 ? 'neighborhood' : 'city';
      
      try {
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
            precision,
            timestamp: Date.now()
          };

          coordsCache.set(cacheKey, result);
          return result;
        }
      } catch (error) {
        continue;
      }
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error);
    return null;
  }
}

function volumetricWeightKg(lengthCm: number, widthCm: number, heightCm: number, divisor = PARAMS.volumetricDivisor): number {
  return (lengthCm * widthCm * heightCm) / divisor;
}

function estimateDeliveryDays(distanceKm: number): number {
  if (distanceKm <= 10) return 1;
  if (distanceKm <= 50) return 2;
  if (distanceKm <= 200) return 3;
  if (distanceKm <= 500) return 5;
  return 7;
}

// Função principal com Google Maps
export async function calculateFreightWithGoogleMaps(
  customerCep: string, 
  cart: CartItem[], 
  voucherDiscount = 0,
  addressNumber?: string,
  googleMapsApiKey?: string
): Promise<FreightBreakdown> {
  
  // 1) Busca coordenadas do estoque
  const whCoords = await getCoordsFromCepFallback(WAREHOUSE_CEP);
  if (!whCoords) throw new Error("Não foi possível geocodificar o CEP do estoque.");
  
  // 2) Busca coordenadas do cliente (Google Maps ou fallback)
  let custCoords: { lat: number; lon: number; address: string; precision: string } | null = null;
  let googleMapsUsed = false;
  
  if (googleMapsApiKey) {
    // Monta endereço completo para Google Maps
    const viaCepUrl = `https://viacep.com.br/ws/${customerCep.replace(/\D/g, "")}/json/`;
    try {
      const resp = await fetch(viaCepUrl);
      const data = await resp.json();
      
      if (!data.erro) {
        const fullAddress = addressNumber 
          ? `${data.logradouro}, ${addressNumber}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`
          : `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`;
        
        custCoords = await getCoordsFromGoogleMaps(fullAddress, googleMapsApiKey);
        googleMapsUsed = true;
      }
    } catch (error) {
      console.warn('Erro ao buscar CEP para Google Maps, usando fallback');
    }
  }
  
  // Fallback se Google Maps falhar ou não estiver disponível
  if (!custCoords) {
    custCoords = await getCoordsFromCepFallback(customerCep, addressNumber);
    googleMapsUsed = false;
  }
  
  if (!custCoords) throw new Error("Não foi possível geocodificar o CEP do cliente.");

  // 3) Calcula distância
  const distanceKm = parseFloat(haversineKm(whCoords.lat, whCoords.lon, custCoords.lat, custCoords.lon).toFixed(2));

  // 4) Calcula pesos e valores
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

  const totalWeightKg = Math.max(actualWeightKg, volumetricWeightTotal);

  // 5) Calcula componentes do frete
  const baseFee = PARAMS.baseFee;
  const distanceFee = parseFloat((PARAMS.perKm * distanceKm).toFixed(2));
  const weightFee = parseFloat((PARAMS.perKg * totalWeightKg).toFixed(2));
  const itemHandlingFee = parseFloat((PARAMS.perItemHandling * totalItems).toFixed(2));
  const valueInsuranceFee = parseFloat((orderValue * PARAMS.valueInsurancePct).toFixed(2));

  // 6) Calcula frete final
  let finalFreight = baseFee + distanceFee + weightFee + itemHandlingFee + valueInsuranceFee;
  finalFreight = Math.max(0, finalFreight - voucherDiscount);

  const freeShippingApplied = orderValue >= PARAMS.freeShippingThreshold;
  if (freeShippingApplied) {
    finalFreight = 0;
  } else {
    finalFreight = Math.max(PARAMS.minFreight, Math.min(PARAMS.maxFreight, finalFreight));
  }

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
    addressPrecision: custCoords.precision as 'exact' | 'street' | 'neighborhood' | 'city',
    googleMapsUsed
  };
}

// Função para converter produtos do carrinho
export function convertCartItemsToFreightItems(cartItems: any[]): CartItem[] {
  const DEFAULT_PACKAGING = {
    weightKg: 0.5,
    lengthCm: 25,
    widthCm: 20,
    heightCm: 15,
  };

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
