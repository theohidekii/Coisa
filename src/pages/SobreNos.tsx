import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Users, Award, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SobreNos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre Nós
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Desde 1998 atendendo Santo André e região
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Desde 1998</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Referência na Região</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Nossa História */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Building2 className="h-6 w-6 mr-3 text-blue-600" />
                  Nossa História
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Desde 1998 em Santo André, somos referência no fornecimento de soluções completas para sua casa, obra ou empresa. Oferecemos uma ampla variedade de produtos de qualidade e com atendimento especializado.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Nosso portfólio inclui desde ferramentas manuais e elétricas, abrasivos, ferragens, até uma linha completa de materiais elétricos e hidráulicos, ideais para profissionais e entusiastas da reforma e manutenção.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Também contamos com uma seleção abrangente de materiais de construção, pisos e revestimentos, além de tintas para transformar qualquer ambiente. Para quem busca funcionalidade com estilo, oferecemos gabinetes e pias para cozinha e banheiro, além de organizadores que trazem praticidade para o dia a dia.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Pensando no conforto e no toque final de cada espaço, disponibilizamos ainda itens de decoração, garrafas térmicas, panelas de ferro e outros modelos, além de opções para quem valoriza momentos especiais com a família, como nossas churrasqueiras.
                </p>
                
                <p className="text-gray-600 leading-relaxed font-semibold">
                  Mais que uma loja, somos seu parceiro em cada projeto. Venha nos visitar e descubra por que somos sinônimo de confiança e variedade em Santo André.
                </p>
              </CardContent>
            </Card>

            {/* Nossos Valores */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Award className="h-6 w-6 mr-3 text-blue-600" />
                  Nossos Valores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Qualidade</h3>
                    <p className="text-sm text-gray-600">
                      Produtos de primeira linha com garantia de fábrica
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Atendimento</h3>
                    <p className="text-sm text-gray-600">
                      Equipe especializada e pronta para ajudar
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Confiança</h3>
                    <p className="text-sm text-gray-600">
                      Experiência consolidada no mercado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nossos Produtos */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Building2 className="h-6 w-6 mr-3 text-blue-600" />
                  Nossos Produtos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Ferramentas e Equipamentos</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ferramentas manuais e elétricas</li>
                      <li>• Abrasivos e ferragens</li>
                      <li>• Materiais elétricos e hidráulicos</li>
                      <li>• Equipamentos profissionais</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Materiais de Construção</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Pisos e revestimentos</li>
                      <li>• Tintas e vernizes</li>
                      <li>• Materiais de acabamento</li>
                      <li>• Produtos para decoração</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Cozinha e Banheiro</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gabinetes e pias</li>
                      <li>• Organizadores</li>
                      <li>• Acessórios para casa</li>
                      <li>• Itens de decoração</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Lazer e Conforto</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Churrasqueiras</li>
                      <li>• Garrafas térmicas</li>
                      <li>• Panelas de ferro</li>
                      <li>• Produtos para momentos especiais</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nossa Localização */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                  Nossa Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Endereço</h4>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-gray-600">Av. Dom Pedro I, 2275</p>
                        <p className="text-gray-600">Vila Vitória, Santo André - SP</p>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900">Horário de Funcionamento</h4>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-gray-600">Segunda a Sexta: 7h30 às 17h30</p>
                        <p className="text-gray-600">Sábados e Feriados: 7h30 às 13h</p>
                        <p className="text-gray-600">Domingos: Fechado</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Contato</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">(11) 4453-0253</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-600">coisa@coisacomercio.com.br</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Estacionamento:</strong> Disponível para clientes
                      </p>
                      <p className="text-sm text-blue-800">
                        <strong>Atendimento:</strong> Presencial e online
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Venha nos Conhecer!</h3>
                <p className="text-blue-100 mb-6">
                  Descubra por que somos referência em Santo André desde 1998. 
                  Nossa equipe está pronta para ajudá-lo a encontrar a solução perfeita para seu projeto.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://wa.me/551144530253" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a 
                    href="tel:1144530253" 
                    className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Ligar Agora
                  </a>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SobreNos;
