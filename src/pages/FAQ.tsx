import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HelpCircle, ShoppingCart, Truck, CreditCard, Phone, Mail, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqData = [
    {
      category: "Pedidos e Compras",
      icon: ShoppingCart,
      questions: [
        {
          question: "Como faço um pedido?",
          answer: "Para fazer um pedido, navegue pelos produtos, adicione os itens desejados ao carrinho, revise seu pedido e prossiga para o checkout. Você precisará criar uma conta ou fazer login para finalizar a compra."
        },
        {
          question: "Quais são as formas de pagamento aceitas?",
          answer: "Aceitamos cartão de crédito/débito, PIX, boleto bancário e dinheiro (apenas para retirada local). Todos os pagamentos online são processados de forma segura."
        },
        {
          question: "Posso cancelar meu pedido?",
          answer: "Sim, você pode cancelar seu pedido até 2 horas após a confirmação do pagamento. Após esse período, o pedido será processado e não poderá ser cancelado."
        },
        {
          question: "Os preços incluem impostos?",
          answer: "Sim, todos os preços exibidos no site já incluem impostos. Não há cobranças adicionais ocultas."
        }
      ]
    },
    {
      category: "Entrega",
      icon: Truck,
      questions: [
        {
          question: "Quais são as opções de entrega?",
          answer: "Oferecemos três opções: Retirada Local (gratuita), Entrega Própria (até 8km, R$ 15,00) e Correios (todo o Brasil com prazos variados)."
        },
        {
          question: "Qual o prazo de entrega?",
          answer: "Retirada Local: imediata após pagamento. Entrega Própria: 1-2 dias úteis. Correios: 2-10 dias úteis dependendo da região."
        },
        {
          question: "Posso rastrear meu pedido?",
          answer: "Sim, para entregas pelos Correios você receberá um código de rastreamento. Para entrega própria, entraremos em contato para agendar a entrega."
        },
        {
          question: "Vocês entregam aos sábados?",
          answer: "Sim, fazemos entregas aos sábados no horário de funcionamento da loja (7h30 às 13h)."
        }
      ]
    },
    {
      category: "Produtos e Estoque",
      icon: ShoppingCart,
      questions: [
        {
          question: "Como sei se um produto está em estoque?",
          answer: "Todos os produtos exibidos no site estão disponíveis em estoque. Se um produto estiver indisponível, ele não aparecerá na listagem."
        },
        {
          question: "Vocês fazem reserva de produtos?",
          answer: "Sim, você pode reservar produtos por até 24 horas através do WhatsApp ou telefone. Após esse período, a reserva será cancelada automaticamente."
        },
        {
          question: "Posso encomendar produtos que não estão no site?",
          answer: "Sim, entre em contato conosco pelo WhatsApp ou telefone para solicitar produtos específicos. Verificaremos a disponibilidade e preço."
        },
        {
          question: "Os produtos têm garantia?",
          answer: "Sim, todos os produtos têm garantia do fabricante. O prazo varia conforme o produto e pode ser consultado na descrição de cada item."
        }
      ]
    },
    {
      category: "Devoluções e Trocas",
      icon: HelpCircle,
      questions: [
        {
          question: "Qual o prazo para devolução?",
          answer: "O prazo para devolução é de 7 dias após a compra, desde que o produto esteja em embalagem original e sem uso."
        },
        {
          question: "Como solicito uma devolução?",
          answer: "Entre em contato conosco pelo WhatsApp, telefone ou email em até 7 dias após a compra. Analisaremos cada caso individualmente."
        },
        {
          question: "Quais produtos não podem ser devolvidos?",
          answer: "Produtos personalizados, materiais perecíveis, produtos de higiene pessoal e produtos em promoção final não podem ser devolvidos."
        },
        {
          question: "Quanto tempo leva para processar a devolução?",
          answer: "O processamento da devolução leva até 5 dias úteis após a análise e aprovação da solicitação."
        }
      ]
    },
    {
      category: "Conta e Cadastro",
      icon: HelpCircle,
      questions: [
        {
          question: "É obrigatório criar uma conta para comprar?",
          answer: "Sim, é necessário criar uma conta para finalizar a compra. Isso garante a segurança da transação e permite o acompanhamento do pedido."
        },
        {
          question: "Esqueci minha senha, o que faço?",
          answer: "Na página de login, clique em 'Esqueci minha senha' e siga as instruções para redefinir sua senha através do email cadastrado."
        },
        {
          question: "Posso ter mais de uma conta?",
          answer: "Não, é permitida apenas uma conta por CPF. Isso garante a segurança e evita fraudes."
        },
        {
          question: "Como altero meus dados cadastrais?",
          answer: "Acesse 'Minha Conta' no menu superior e clique em 'Editar Perfil' para alterar seus dados pessoais."
        }
      ]
    },
    {
      category: "Atendimento e Suporte",
      icon: Phone,
      questions: [
                 {
           question: "Qual o horário de atendimento?",
           answer: "Segunda a sexta-feira: 7h30 às 17h30. Sábados e feriados: 7h30 às 13h. Não atendemos aos domingos."
         },
        {
          question: "Como posso entrar em contato?",
          answer: "WhatsApp: (11) 4453-0253, Telefone: (11) 4453-0253, Email: coisa@coisacomercio.com.br"
        },
        {
          question: "Vocês fazem orçamentos?",
          answer: "Sim, fazemos orçamentos gratuitos. Entre em contato pelo WhatsApp ou telefone com a lista dos produtos desejados."
        },
        {
          question: "Oferecem assistência técnica?",
          answer: "Sim, oferecemos assistência técnica para produtos elétricos e hidráulicos. Entre em contato para mais informações."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Encontre respostas para as dúvidas mais comuns
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>FAQ Completo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Introdução */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <HelpCircle className="h-6 w-6 mr-3 text-blue-600" />
                  Como podemos ajudar?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Aqui você encontra respostas para as perguntas mais frequentes sobre nossos produtos, serviços e políticas. Se sua dúvida não estiver respondida aqui, entre em contato conosco.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">(11) 4453-0253</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">coisa@coisacomercio.com.br</span>
                  </div>
                                     <div className="flex items-center space-x-2">
                     <Clock className="h-4 w-4 text-blue-600" />
                     <span className="text-sm text-gray-600">Seg-Sex: 7h30-17h30 | Sáb e Feriados: 7h30-13h</span>
                   </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <category.icon className="h-6 w-6 mr-3 text-blue-600" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, questionIndex) => (
                      <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}

            {/* Contato Adicional */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-blue-600" />
                  Ainda tem dúvidas?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Se você não encontrou a resposta que procurava, nossa equipe está pronta para ajudar você.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Canais de Atendimento</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">(11) 4453-0253</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">coisa@coisacomercio.com.br</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Av. Dom Pedro I, 2275 - Vila Vitória, Santo André - SP</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Horário de Funcionamento</h4>
                    <div className="space-y-2">
                                             <p className="text-sm text-gray-600">
                         <strong>Segunda a Sexta:</strong> 7h30 às 17h30
                       </p>
                       <p className="text-sm text-gray-600">
                         <strong>Sábados e Feriados:</strong> 7h30 às 13h
                       </p>
                       <p className="text-sm text-gray-600">
                         <strong>Domingos:</strong> Fechado
                       </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Dica:</strong> Para atendimento mais rápido, utilize o WhatsApp. Nossa equipe responde em até 30 minutos durante o horário de funcionamento.
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

export default FAQ;
