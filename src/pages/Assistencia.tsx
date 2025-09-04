import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Wrench, ShieldCheck, Clock, MapPin, Phone, Mail, CheckCircle, Star, Users, Award } from "lucide-react";

const Assistencia = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
              Assistência Técnica COISA
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-blue-100 mb-6 md:mb-8">
              Instalação profissional e manutenção com garantia
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a 
                href="https://wa.me/5511999999999?text=Olá!%20Quero%20assistência%20técnica" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors text-sm md:text-base"
              >
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Solicitar Orçamento
              </a>
              <a 
                href="tel:+5511999999999"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors text-sm md:text-base"
              >
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Nossos Serviços
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas em instalação e manutenção com qualidade e garantia
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 md:mb-6">
                <Wrench className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Instalação</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Instalação profissional de todos os produtos com garantia de funcionamento
              </p>
              <ul className="space-y-1.5 md:space-y-2">
                <li className="flex items-center text-xs md:text-sm text-gray-600">
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2" />
                  Equipe técnica especializada
                </li>
                <li className="flex items-center text-xs md:text-sm text-gray-600">
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2" />
                  Garantia de 90 dias
                </li>
                <li className="flex items-center text-xs md:text-sm text-gray-600">
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2" />
                  Limpeza após instalação
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 md:mb-6">
                <ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Manutenção</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Serviços de manutenção preventiva e corretiva com peças originais
              </p>
              <ul className="space-y-1.5 md:space-y-2">
                <li className="flex items-center text-xs md:text-sm text-gray-600">
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2" />
                  Diagnóstico gratuito
                </li>
                <li className="flex items-center text-xs md:text-sm text-gray-600">
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2" />
                  Peças originais garantidas
                </li>
                <li className="flex items-center text-xs md:text-sm text-gray-600">
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2" />
                  Relatório técnico
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Emergência</h3>
              <p className="text-gray-600 mb-6">
                Atendimento emergencial 24h para casos urgentes e críticos
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Atendimento 24h
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Resposta em até 2h
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Prioridade máxima
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Orçamento Online */}
      <section id="orcamento" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Orçamento Online
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Solicite um orçamento gratuito para nossos serviços de assistência técnica
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Informações do Orçamento */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações do Orçamento</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Orçamento Gratuito</p>
                      <p className="text-sm text-gray-600">Sem custo para avaliação inicial</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Resposta Rápida</p>
                      <p className="text-sm text-gray-600">Em até 2 horas úteis</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Garantia Incluída</p>
                      <p className="text-sm text-gray-600">90 dias de garantia nos serviços</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Melhor Preço</p>
                      <p className="text-sm text-gray-600">Preços competitivos e transparentes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário de Contato */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Orçamento</h3>
                <p className="text-gray-600 mb-6">
                  Entre em contato conosco para solicitar um orçamento personalizado
                </p>
                <div className="space-y-4">
                  <a 
                    href="https://wa.me/551144530253?text=Olá!%20Quero%20solicitar%20um%20orçamento%20para%20assistência%20técnica" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Solicitar via WhatsApp
                  </a>
                  <a 
                    href="tel:+551144530253"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Ligar para Orçamento
                  </a>
                  <a 
                    href="mailto:assistencia@coisacomercio.com.br?subject=Solicitação de Orçamento - Assistência Técnica"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold text-white transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Enviar Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Processo simples e transparente para solicitar nossa assistência técnica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Solicitação</h3>
              <p className="text-gray-600">
                Entre em contato via WhatsApp ou telefone e informe o problema
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Agendamento</h3>
              <p className="text-gray-600">
                Agendamos a visita técnica no horário que for melhor para você
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Execução</h3>
              <p className="text-gray-600">
                Nossa equipe executa o serviço com qualidade e garantia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cobertura */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Área de Cobertura
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Atendemos toda a região do ABC Paulista e São Paulo Capital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Santo André</h3>
              <p className="text-sm text-gray-600">Cobertura completa</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">São Caetano</h3>
              <p className="text-sm text-gray-600">Cobertura completa</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">São Bernardo</h3>
              <p className="text-sm text-gray-600">Cobertura completa</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">São Paulo</h3>
              <p className="text-sm text-gray-600">Zona Sul e Leste</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher a COISA?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossos diferenciais que garantem a melhor experiência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Equipe Qualificada</h3>
              <p className="text-sm text-gray-600">
                Técnicos certificados e experientes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Garantia</h3>
              <p className="text-sm text-gray-600">
                90 dias de garantia em todos os serviços
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Agilidade</h3>
              <p className="text-sm text-gray-600">
                Visita em até 72h úteis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Qualidade</h3>
              <p className="text-sm text-gray-600">
                Peças originais e materiais de qualidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Entre em Contato
            </h2>
            <p className="text-xl text-blue-100">
              Estamos prontos para atender você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Telefone</h3>
              <p className="text-blue-100">(11) 99999-9999</p>
            </div>

            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">E-mail</h3>
              <p className="text-blue-100">assistencia@coisa.com.br</p>
            </div>

            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Horário</h3>
              <p className="text-blue-100">Seg-Sex: 8h às 18h</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://wa.me/5511999999999?text=Olá!%20Quero%20assistência%20técnica" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Solicitar Orçamento via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Assistencia;


