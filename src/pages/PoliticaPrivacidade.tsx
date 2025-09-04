import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, FileText, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Proteção e transparência no tratamento dos seus dados pessoais
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>LGPD Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Dados Seguros</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Política de Privacidade */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Informações Gerais */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-blue-600" />
                  Informações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
                </p>
                                 <p className="text-gray-600">
                   A <strong>Coisa</strong> ("nós", "nossa", "nosso") está comprometida em proteger e respeitar sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                 </p>
                <p className="text-gray-600">
                  Ao utilizar nossos serviços, você concorda com a coleta e uso de informações de acordo com esta política.
                </p>
              </CardContent>
            </Card>

            {/* Dados Coletados */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Eye className="h-6 w-6 mr-3 text-blue-600" />
                  Dados Pessoais Coletados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Coletamos os seguintes tipos de informações pessoais:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                                     <div className="space-y-3">
                     <h4 className="font-semibold text-gray-900">Informações de Identificação</h4>
                     <ul className="text-sm text-gray-600 space-y-1">
                       <li>• Nome completo</li>
                       <li>• CPF (apenas na criação de conta)</li>
                       <li>• Data de nascimento</li>
                       <li>• RG (quando necessário)</li>
                     </ul>
                   </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Informações de Contato</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Endereço de e-mail</li>
                      <li>• Número de telefone</li>
                      <li>• Endereço residencial</li>
                      <li>• Endereço de entrega</li>
                    </ul>
                  </div>
                </div>
                                 <div className="space-y-3">
                   <h4 className="font-semibold text-gray-900">Dados de Navegação</h4>
                   <ul className="text-sm text-gray-600 space-y-1">
                     <li>• Endereço IP</li>
                     <li>• Tipo de navegador</li>
                     <li>• Páginas visitadas</li>
                     <li>• Tempo de permanência</li>
                     <li>• Cookies e tecnologias similares</li>
                   </ul>
                 </div>
                 <div className="bg-blue-50 p-4 rounded-lg">
                   <p className="text-sm text-blue-800">
                     <strong>Importante:</strong> O CPF é solicitado apenas durante o processo de criação de conta para fins de identificação e segurança. Não é necessário para navegação geral no site.
                   </p>
                 </div>
              </CardContent>
            </Card>

            {/* Finalidade do Uso */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Finalidade do Uso dos Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Utilizamos suas informações pessoais para as seguintes finalidades:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Serviços Principais</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Processamento de pedidos</li>
                      <li>• Entrega de produtos</li>
                      <li>• Comunicação sobre pedidos</li>
                      <li>• Atendimento ao cliente</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Melhorias e Marketing</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Melhorar nossos serviços</li>
                      <li>• Enviar ofertas e promoções</li>
                      <li>• Pesquisas de satisfação</li>
                      <li>• Análise de comportamento</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Obrigações Legais</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Cumprimento de obrigações fiscais</li>
                    <li>• Prevenção de fraudes</li>
                    <li>• Resolução de disputas</li>
                    <li>• Cumprimento de leis aplicáveis</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Compartilhamento de Dados */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Lock className="h-6 w-6 mr-3 text-blue-600" />
                  Compartilhamento de Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  <strong>Não vendemos, alugamos ou comercializamos</strong> suas informações pessoais com terceiros. Compartilhamos dados apenas nas seguintes situações:
                </p>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Prestadores de Serviços</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Empresas de entrega e logística</li>
                      <li>• Processadores de pagamento</li>
                      <li>• Serviços de análise de dados</li>
                      <li>• Prestadores de serviços de TI</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Obrigações Legais</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Autoridades governamentais</li>
                      <li>• Cumprimento de ordens judiciais</li>
                      <li>• Proteção de direitos e segurança</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Consentimento</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Apenas com seu consentimento explícito</li>
                      <li>• Para finalidades específicas</li>
                      <li>• Com possibilidade de revogação</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Armazenamento e Segurança */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Armazenamento e Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Medidas de Segurança</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Criptografia de dados</li>
                      <li>• Firewalls e antivírus</li>
                      <li>• Controle de acesso</li>
                      <li>• Monitoramento contínuo</li>
                      <li>• Backup regular</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Período de Retenção</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Dados de conta: 5 anos</li>
                      <li>• Histórico de pedidos: 7 anos</li>
                      <li>• Dados fiscais: 10 anos</li>
                      <li>• Logs de navegação: 2 anos</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-600">
                  <strong>Localização:</strong> Seus dados são armazenados em servidores seguros localizados no Brasil, em conformidade com a LGPD.
                </p>
              </CardContent>
            </Card>

            {/* Seus Direitos */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Seus Direitos (LGPD)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Conforme a LGPD, você possui os seguintes direitos:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Direitos de Acesso</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Confirmar a existência de tratamento</li>
                      <li>• Acessar seus dados pessoais</li>
                      <li>• Corrigir dados incompletos</li>
                      <li>• Anonimizar dados desnecessários</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Direitos de Controle</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Revogar consentimento</li>
                      <li>• Excluir dados pessoais</li>
                      <li>• Portabilidade dos dados</li>
                      <li>• Oposição ao tratamento</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Como exercer seus direitos:</strong> Entre em contato conosco através dos canais disponíveis nesta política. Responderemos sua solicitação em até 15 dias úteis.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Eye className="h-6 w-6 mr-3 text-blue-600" />
                  Cookies e Tecnologias Similares
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Cookies Essenciais</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Funcionamento do site</li>
                      <li>• Segurança da conta</li>
                      <li>• Preferências básicas</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Cookies Analíticos</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Análise de tráfego</li>
                      <li>• Melhorias no site</li>
                      <li>• Experiência do usuário</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-600">
                  Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
                </p>
              </CardContent>
            </Card>

            {/* Menores de Idade */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Proteção de Menores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  <strong>Não coletamos intencionalmente</strong> informações pessoais de menores de 18 anos sem o consentimento dos pais ou responsáveis legais.
                </p>
                <p className="text-gray-600">
                  Se você é menor de idade, por favor, não forneça informações pessoais sem a supervisão de um adulto responsável.
                </p>
                <p className="text-gray-600">
                  Se tomarmos conhecimento de que coletamos dados de menores sem autorização adequada, excluiremos essas informações imediatamente.
                </p>
              </CardContent>
            </Card>

            {/* Alterações na Política */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                  Alterações na Política
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações significativas através de:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• E-mail enviado para o endereço registrado</li>
                  <li>• Aviso em nosso site</li>
                  <li>• Notificação em aplicativo móvel</li>
                </ul>
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
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Canais de Contato</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">privacy@coisacomercio.com.br</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">(11) 4453-0253</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Av. Dom Pedro I, 2275 - Vila Vitória, Santo André - SP</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Encarregado de Dados (DPO)</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Nome:</strong> [Nome do DPO]
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>E-mail:</strong> dpo@coisacomercio.com.br
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Telefone:</strong> (11) 4453-0253
                      </p>
                    </div>
                  </div>
                </div>
                                   <div className="bg-blue-50 p-4 rounded-lg">
                     <p className="text-sm text-blue-800">
                       <strong>Horário de atendimento:</strong> Segunda a sexta-feira, das 7h30 às 17h30, sábados e feriados das 7h30 às 13h.
                     </p>
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

export default PoliticaPrivacidade;
