import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Headphones, Shield, RefreshCw, MessageCircle, Phone, Mail, Clock, CheckCircle, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PosVenda = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pós-Venda COISA
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Suporte completo após a compra para sua total satisfação
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/551144530253?text=Olá!%20Preciso%20de%20suporte%20pós-venda" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Solicitar Suporte
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
        </div>
      </section>

      {/* Serviços Pós-Venda */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços de Pós-Venda
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos suporte completo para garantir sua satisfação total com nossos produtos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Suporte Técnico */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Headphones className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Suporte Técnico</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      24/7
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Suporte técnico especializado para esclarecer dúvidas sobre instalação, uso e manutenção.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                    Atendimento por telefone e WhatsApp
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                    Especialistas técnicos qualificados
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                    Orientações de instalação
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                    Dicas de manutenção preventiva
                  </li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">Horário de Atendimento</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    <strong>Seg a Sex:</strong> 7h30 às 17h30<br />
                    <strong>Sábado:</strong> 7h30 às 13h
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Garantia */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Garantia</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">
                      <Star className="h-3 w-3 mr-1" />
                      Garantida
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Garantia de fábrica em todos os produtos, com troca e reparo quando necessário.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Garantia de fábrica original
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Troca de produtos com defeito
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Reparo técnico especializado
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    Documentação completa
                  </li>
                </ul>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-800">Cobertura</span>
                  </div>
                  <p className="text-sm text-green-700">
                    <strong>Defeitos de fábrica:</strong> Cobertos pela garantia<br />
                    <strong>Prazo:</strong> Conforme especificação do fabricante
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Troca e Devolução */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Troca e Devolução</CardTitle>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 mt-2">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Fácil
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Processo simples e rápido para troca ou devolução de produtos quando necessário.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-3" />
                    Troca em até 7 dias
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-3" />
                    Produto em estado original
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-3" />
                    Nota fiscal obrigatória
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-3" />
                    Reembolso ou crédito
                  </li>
                </ul>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-purple-800">Prazo para Troca</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    <strong>Produtos não perecíveis:</strong> 7 dias<br />
                    <strong>Produtos com defeito:</strong> Garantia do fabricante
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Política de Pós-Venda */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Política de Garantia */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Política de Garantia</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Garantia de Fábrica</h4>
                  <p className="text-gray-600">Todos os produtos possuem garantia de fábrica conforme especificação do fabricante.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Garantia de Instalação</h4>
                  <p className="text-gray-600">90 dias de garantia para serviços de instalação realizados por nossa equipe.</p>
                </div>
              </div>
            </div>

            {/* Canais de Atendimento */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Canais de Atendimento</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Telefone</p>
                    <p className="text-gray-600">(11) 4453-0253</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-gray-600">(11) 4453-0253</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">posvenda@coisacomercio.com.br</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Loja Física</p>
                    <p className="text-gray-600">Av. Dom Pedro I, 2275 - Vila Vitória, Santo André - SP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-lg text-gray-600">Tire suas dúvidas sobre nossos serviços de pós-venda</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Como solicitar uma troca?</h3>
                <p className="text-gray-600 text-sm">
                  Entre em contato conosco por telefone, WhatsApp ou email, informando o número da nota fiscal e o motivo da troca. Nossa equipe irá orientá-lo sobre o processo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Qual o prazo para troca?</h3>
                <p className="text-gray-600 text-sm">
                  Para produtos não perecíveis, aceitamos troca em até 7 dias após a compra, desde que o produto esteja em estado original e com a nota fiscal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Como funciona a garantia?</h3>
                <p className="text-gray-600 text-sm">
                  Todos os produtos possuem garantia de fábrica. Em caso de defeito, entre em contato conosco para orientações sobre o processo de garantia.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Posso trocar por outro produto?</h3>
                <p className="text-gray-600 text-sm">
                  Sim, você pode trocar por outro produto de valor igual ou superior. A diferença será cobrada ou reembolsada conforme necessário.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Suporte Pós-Venda?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Nossa equipe está pronta para ajudar você com qualquer questão após a compra
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/551144530253?text=Olá!%20Preciso%20de%20suporte%20pós-venda" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
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

export default PosVenda;
