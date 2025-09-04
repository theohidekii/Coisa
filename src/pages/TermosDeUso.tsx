import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Shield, AlertTriangle, CheckCircle, Clock, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermosDeUso = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Termos de Uso
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Condições e regras para utilização dos nossos serviços
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Termos de Uso */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Aceitação dos Termos */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-blue-600" />
                  Aceitação dos Termos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                                 <p className="text-gray-600">
                   Ao acessar e utilizar o site da <strong>Coisa</strong>, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
                 </p>
                <p className="text-gray-600">
                  Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que acessam ou utilizam o site.
                </p>
              </CardContent>
            </Card>

            {/* Descrição dos Serviços */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Descrição dos Serviços
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                                 <p className="text-gray-600">
                   A Coisa oferece os seguintes serviços através de nosso site:
                 </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Venda de Produtos</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Materiais de construção</li>
                      <li>• Ferramentas e equipamentos</li>
                      <li>• Produtos elétricos e hidráulicos</li>
                      <li>• Tintas e vernizes</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Serviços Adicionais</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Entrega de produtos</li>
                      <li>• Assistência técnica</li>
                      <li>• Orçamentos online</li>
                      <li>• Suporte ao cliente</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conta do Usuário */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Conta do Usuário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Criação de Conta</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Você deve fornecer informações verdadeiras e precisas</li>
                      <li>• É necessário ter pelo menos 18 anos de idade</li>
                      <li>• Você é responsável pela segurança de sua conta</li>
                      <li>• Uma conta por pessoa é permitida</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Responsabilidades</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Manter suas credenciais seguras</li>
                      <li>• Notificar-nos sobre uso não autorizado</li>
                      <li>• Não compartilhar sua conta com terceiros</li>
                      <li>• Respeitar os direitos de outros usuários</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pedidos e Pagamentos */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-blue-600" />
                  Pedidos e Pagamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Processamento de Pedidos</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Pedidos são processados após confirmação de pagamento</li>
                      <li>• Reservamos o direito de recusar pedidos</li>
                      <li>• Preços podem ser alterados sem aviso prévio</li>
                      <li>• Produtos sujeitos à disponibilidade</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Formas de Pagamento</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Cartão de crédito/débito</li>
                      <li>• PIX</li>
                      <li>• Boleto bancário</li>
                      <li>• Dinheiro (retirada local)</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Todos os pagamentos são processados de forma segura. Não armazenamos dados de cartão de crédito em nossos servidores.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Entrega */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-blue-600" />
                  Política de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Opções de Entrega</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>Retirada Local:</strong> Gratuita, sem prazo mínimo</li>
                      <li>• <strong>Entrega Própria:</strong> Até 8km, taxa de R$ 15,00</li>
                      <li>• <strong>Correios:</strong> Todo o Brasil, prazos variados</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Prazos e Condições</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Prazos estimados, não garantidos</li>
                      <li>• Entrega em horário comercial</li>
                      <li>• Necessário pessoa presente para receber</li>
                      <li>• Verificação do produto no momento da entrega</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Devoluções e Trocas */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-3 text-blue-600" />
                  Devoluções e Trocas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Prazo para Devolução</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 7 dias para produtos em geral</li>
                      <li>• Produto deve estar em embalagem original</li>
                      <li>• Não utilizado e em perfeito estado</li>
                      <li>• Comprovante de compra obrigatório</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Produtos Não Aceitos</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Produtos personalizados</li>
                      <li>• Materiais perecíveis</li>
                      <li>• Produtos de higiene pessoal</li>
                      <li>• Produtos em promoção final</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Processo:</strong> Entre em contato conosco em até 7 dias após a compra para solicitar devolução. Analisaremos cada caso individualmente.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Propriedade Intelectual */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Propriedade Intelectual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                                 <p className="text-gray-600">
                   Todo o conteúdo deste site, incluindo textos, imagens, logotipos, marcas comerciais e software, é propriedade da Coisa e está protegido por leis de propriedade intelectual.
                 </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Restrições de Uso</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Não é permitida a reprodução sem autorização</li>
                    <li>• Proibido uso comercial não autorizado</li>
                    <li>• Não é permitida modificação do conteúdo</li>
                    <li>• Respeite os direitos autorais</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Limitação de Responsabilidade */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-3 text-blue-600" />
                  Limitação de Responsabilidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                                 <p className="text-gray-600">
                   A Coisa não se responsabiliza por:
                 </p>
                <div className="space-y-3">
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Danos indiretos ou consequenciais</li>
                    <li>• Perda de lucros ou dados</li>
                    <li>• Interrupções no serviço</li>
                    <li>• Ações de terceiros</li>
                    <li>• Uso inadequado dos produtos</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Importante:</strong> Nossa responsabilidade é limitada ao valor pago pelo produto ou serviço em questão.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Modificações dos Termos */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-blue-600" />
                  Modificações dos Termos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site.
                </p>
                <p className="text-gray-600">
                  Recomendamos que você revise periodicamente estes termos para se manter informado sobre nossas práticas.
                </p>
                <p className="text-gray-600">
                  <strong>Data da última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
                </p>
              </CardContent>
            </Card>

            {/* Contato */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-blue-600" />
                  Contato e Dúvidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Canais de Contato</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">coisa@coisacomercio.com.br</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">(11) 4453-0253</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Horário de Atendimento</h4>
                    <div className="space-y-2">
                                             <p className="text-sm text-gray-600">
                         <strong>Segunda a Sexta:</strong> 7h30 às 17h30
                       </p>
                       <p className="text-sm text-gray-600">
                         <strong>Sábados e Feriados:</strong> 7h30 às 13h
                       </p>
                    </div>
                  </div>
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

export default TermosDeUso;
