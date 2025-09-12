// Teste da API do Google Maps
const GOOGLE_API_KEY = "AIzaSyAMPrCsvbfLFKAg4EHfvfDy5HbGDhbtnLE";

export async function testGoogleMapsAPI() {
  const testAddress = "09041-160, Santo André, SP";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(testAddress)}&key=${GOOGLE_API_KEY}`;
  
  console.log('🧪 Testando Google Maps API...');
  console.log('🔗 URL:', url);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('📊 Status da resposta:', response.status);
    console.log('📋 Dados da resposta:', data);
    
    if (data.status === "OK") {
      console.log('✅ API funcionando! Coordenadas:', data.results[0].geometry.location);
      return data.results[0].geometry.location;
    } else {
      console.error('❌ Erro na API:', data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error('💥 Erro na requisição:', error);
    return null;
  }
}

// Para testar no console do browser:
// import { testGoogleMapsAPI } from './testGoogleMaps'; testGoogleMapsAPI();
