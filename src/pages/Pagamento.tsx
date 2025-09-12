import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  Shield,
  Clock,
  Truck,
  MapPin,
  Package,
  QrCode,
  FileText,
  Smartphone,
  Lock,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  weight: number;
  image: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  color: string;
  bgColor: string;
  textColor: string;
}

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  installments: number;
}

const Pagamento = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    installments: 1
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Dados simulados do carrinho (em produção viria do contexto do carrinho)
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Tinta Branca 18L",
      price: 45.00,
      quantity: 2,
      weight: 2.5,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Cimento CP-II 50kg",
      price: 25.00,
      quantity: 1,
      weight: 50,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Furadeira 13mm",
      price: 120.00,
      quantity: 1,
      weight: 1.8,
      image: "/placeholder.svg"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 0; // Assumindo frete grátis ou retirada na loja
  const total = subtotal + shippingCost;

  const paymentMethods: PaymentMethod[] = [
    {
      id: "credit",
      name: "Cartão de Crédito",
      icon: <CreditCard className="h-6 w-6" />,
      description: "Pague em até 12x sem juros",
      benefits: ["Até 12x sem juros", "Aprovação imediata", "Pontos no cartão"],
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800"
    },
    {
      id: "pix",
      name: "PIX",
      icon: <QrCode className="h-6 w-6" />,
      description: "Pagamento instantâneo",
      benefits: ["Pagamento instantâneo", "Sem taxas", "Desconto de 5%"],
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-800"
    },
    {
      id: "boleto",
      name: "Boleto Bancário",
      icon: <FileText className="h-6 w-6" />,
      description: "Vencimento em 3 dias úteis",
      benefits: ["Sem juros", "Vencimento em 3 dias", "Desconto de 3%"],
      color: "yellow",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800"
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string | number) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert("Selecione uma forma de pagamento");
      return;
    }

    if (selectedMethod === "credit") {
      if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardName) {
        alert("Preencha todos os dados do cartão");
        return;
      }
    }

    setIsProcessing(true);
    
    // Simular processamento do pagamento
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        navigate("/meus-pedidos");
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 mb-2">Pagamento Aprovado!</h1>
            <p className="text-green-600 mb-6">
              Seu pedido foi processado com sucesso. Você receberá um e-mail com os detalhes.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Código do pedido: #12345</p>
              <p>• Valor: R$ {total.toFixed(2)}</p>
              <p>• Redirecionando para seus pedidos...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/checkout">
            <Button variant="ghost" size="icon" className="hover:bg-white/50">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Finalizar Pagamento</h1>
            <p className="text-slate-600">Escolha sua forma de pagamento preferida</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Formas de pagamento */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div>Forma de Pagamento</div>
                    <p className="text-sm font-normal text-gray-600 mt-1">
                      Escolha como deseja pagar seu pedido
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                        selectedMethod === method.id
                          ? `border-${method.color}-500 bg-${method.color}-50 shadow-lg`
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                      onClick={() => handleMethodSelect(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            selectedMethod === method.id
                              ? `bg-${method.color}-600 text-white`
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {method.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{method.name}</h4>
                            <p className="text-gray-600 mb-2">{method.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {method.benefits.map((benefit, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedMethod === method.id 
                              ? `border-${method.color}-600 bg-${method.color}-600` 
                              : 'border-gray-300'
                          }`}>
                            {selectedMethod === method.id && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Formulário do cartão */}
                {selectedMethod === "credit" && (
                  <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                    <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Dados do Cartão
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Número do cartão</label>
                        <Input 
                          placeholder="0000 0000 0000 0000"
                          value={paymentForm.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                          maxLength={19}
                          className="text-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Validade</label>
                          <Input 
                            placeholder="MM/AA"
                            value={paymentForm.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                            maxLength={5}
                            className="text-lg"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">CVV</label>
                          <Input 
                            placeholder="000"
                            value={paymentForm.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                            maxLength={3}
                            className="text-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Nome no cartão</label>
                        <Input 
                          placeholder="Nome como está no cartão"
                          value={paymentForm.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className="text-lg"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Parcelas</label>
                        <select 
                          value={paymentForm.installments}
                          onChange={(e) => handleInputChange('installments', parseInt(e.target.value))}
                          className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>
                              {num}x de R$ {(total / num).toFixed(2)} {num === 1 ? '(à vista)' : 'sem juros'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Informações do PIX */}
                {selectedMethod === "pix" && (
                  <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <QrCode className="h-6 w-6 text-green-600" />
                      <h4 className="font-semibold text-green-800">Pagamento PIX</h4>
                    </div>
                    <div className="space-y-3 text-sm text-green-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Pagamento instantâneo e seguro</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Desconto de 5% no valor total</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Sem taxas adicionais</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded-lg border border-green-300">
                      <p className="text-sm text-green-800 font-medium">
                        Após confirmar o pedido, você receberá o QR Code para pagamento instantâneo.
                      </p>
                    </div>
                  </div>
                )}

                {/* Informações do Boleto */}
                {selectedMethod === "boleto" && (
                  <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="h-6 w-6 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-800">Boleto Bancário</h4>
                    </div>
                    <div className="space-y-3 text-sm text-yellow-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600" />
                        <span>Desconto de 3% no valor total</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600" />
                        <span>Vencimento em 3 dias úteis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-600" />
                        <span>Pagamento em qualquer banco</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded-lg border border-yellow-300">
                      <p className="text-sm text-yellow-800 font-medium">
                        O boleto será gerado após confirmar o pedido e enviado por e-mail.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações de segurança */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg">Pagamento 100% Seguro</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Lock className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">SSL Criptografado</p>
                      <p className="text-xs text-green-600">Dados protegidos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">PCI Compliant</p>
                      <p className="text-xs text-blue-600">Padrão internacional</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-800">Garantia Total</p>
                      <p className="text-xs text-purple-600">Seu dinheiro seguro</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl sticky top-8">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div>Resumo do Pedido</div>
                    <p className="text-sm font-normal text-gray-600 mt-1">
                      Confira os detalhes antes de finalizar
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Itens do carrinho */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Produtos</h4>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-600 text-sm">
                          Qtd: {item.quantity} x R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-lg">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Resumo de valores */}
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Frete:</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Grátis
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Informações de entrega */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Entrega</span>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p className="font-medium">
                      {userData.addresses.find(addr => addr.isDefault)?.logradouro}, {" "}
                      {userData.addresses.find(addr => addr.isDefault)?.numero}
                    </p>
                    <p>
                      {userData.addresses.find(addr => addr.isDefault)?.bairro}, {" "}
                      {userData.addresses.find(addr => addr.isDefault)?.localidade} - {" "}
                      {userData.addresses.find(addr => addr.isDefault)?.uf}
                    </p>
                    <p className="text-xs text-blue-600">
                      CEP: {userData.addresses.find(addr => addr.isDefault)?.cep}
                    </p>
                  </div>
                </div>

                {/* Botão finalizar */}
                <Button 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg" 
                  onClick={handlePayment}
                  disabled={!selectedMethod || isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processando Pagamento...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Finalizar Pedido - R$ {total.toFixed(2)}
                    </div>
                  )}
                </Button>

                {/* Informações adicionais */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Pedido será processado após confirmação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>E-mail com detalhes será enviado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Prazo de entrega: 2-3 dias úteis</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
