import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, MapPin, Clock, Package, CheckCircle, Star, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Entrega = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
              Nossos Métodos de Entrega
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-blue-100 mb-6 md:mb-8">
              Escolha a opção que melhor atende suas necessidades
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a 
                href="https://wa.me/551144530253?text=Olá!%20Quero%20saber%20mais%20sobre%20as%20opções%20de%20entrega" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors text-sm md:text-base"
              >
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Consultar Entrega
              </a>
              <a 
                href="tel:+551144530253"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors text-sm md:text-base"
              >
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Métodos de Entrega */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Opções de Entrega Disponíveis
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos diferentes opções para atender suas necessidades de forma rápida e segura
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Retirada Local */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg md:text-2xl font-bold text-gray-900">Retirada Local</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2 text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  Retire seus produtos diretamente em nossa loja, com agilidade e sem custos adicionais.
                </p>
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <li className="flex items-center text-xs md:text-sm text-gray-600">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2 md:mr-3" />
                    Sem custo de entrega
                  </li>
                  <li className="flex items-center text-xs md:text-sm text-gray-600">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2 md:mr-3" />
                    Retirada imediata após pagamento
                  </li>
                  <li className="flex items-center text-xs md:text-sm text-gray-600">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2 md:mr-3" />
                    Verificação do produto na hora
                  </li>
                  <li className="flex items-center text-xs md:text-sm text-gray-600">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2 md:mr-3" />
                    Horário flexível de funcionamento
                  </li>
                </ul>
                <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                    <span className="font-semibold text-green-800 text-sm md:text-base">Localização</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Av. Dom Pedro I, 2275 - Vila Vitória<br />
                    Santo André - SP
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Entrega Própria */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Truck className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Entrega Própria</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      Até 8km
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Nossa equipe própria faz a entrega em até 8km da loja, com agilidade e cuidado.
                </p>
                <ul className="space-y-3 mb-6">
                                     <li className="flex items-center text-sm text-gray-600">
                     <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                     Entrega mais rápida
                   </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                    Raio de até 8km da loja
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                    Equipe própria e confiável
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                    Horário agendado
                  </li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">Prazo de Entrega</span>
                  </div>
                                     <p className="text-sm text-blue-700">
                     <strong>Prazo:</strong> 1-2 dias úteis<br />
                     <strong>Agendamento:</strong> Horário de sua preferência
                   </p>
                </div>
              </CardContent>
            </Card>

            {/* Correios */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Package className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Correios</CardTitle>
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 mt-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      Todo Brasil
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Envio pelos Correios para todo o Brasil, com rastreamento e segurança.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-3" />
                    Entrega para todo o Brasil
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-3" />
                    Rastreamento online
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-3" />
                    Seguro de envio incluído
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-3" />
                    Entrega na porta de casa
                  </li>
                </ul>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="font-semibold text-orange-800">Prazo de Entrega</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    <strong>Capital e Grande SP:</strong> 2-3 dias úteis<br />
                    <strong>Interior SP:</strong> 3-5 dias úteis<br />
                    <strong>Outros estados:</strong> 5-10 dias úteis
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Informações Adicionais */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Política de Entrega */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Política de Entrega</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Frete Grátis</h4>
                  <p className="text-gray-600">Compras acima de R$ 150,00 têm frete grátis para entrega própria e Correios.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Retirada Local</h4>
                  <p className="text-gray-600">Sempre gratuita, sem valor mínimo de compra.</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Entrega Própria</h4>
                  <p className="text-gray-600">Taxa fixa de R$ 15,00 para raio de até 8km da loja.</p>
                </div>
              </div>
            </div>

            {/* Horários e Contato */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Horários e Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Horário de Funcionamento</p>
                    <p className="text-gray-600">Seg a Sex: 7h30 às 17h30 | Sáb: 7h30 às 13h</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Telefone</p>
                    <p className="text-gray-600">(11) 4453-0253</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">coisa@coisacomercio.com.br</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Endereço</p>
                    <p className="text-gray-600">Av. Dom Pedro I, 2275 - Vila Vitória, Santo André - SP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda com a Entrega?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Nossa equipe está pronta para ajudar você a escolher a melhor opção de entrega
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/551144530253?text=Olá!%20Preciso%20de%20ajuda%20com%20a%20entrega" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Falar no WhatsApp
            </a>
            <a 
              href="tel:+551144530253"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Ligar Agora
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Entrega;
