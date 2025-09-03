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
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Assistência Técnica COISA
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Instalação profissional e manutenção com garantia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5511999999999?text=Olá!%20Quero%20assistência%20técnica" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Solicitar Orçamento
              </a>
              <a 
                href="tel:+5511999999999"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas em instalação e manutenção com qualidade e garantia
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instalação</h3>
              <p className="text-gray-600 mb-6">
                Instalação profissional de todos os produtos com garantia de funcionamento
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Equipe técnica especializada
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Garantia de 90 dias
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Limpeza após instalação
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Manutenção</h3>
              <p className="text-gray-600 mb-6">
                Serviços de manutenção preventiva e corretiva com peças originais
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Diagnóstico gratuito
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Peças originais garantidas
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
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


