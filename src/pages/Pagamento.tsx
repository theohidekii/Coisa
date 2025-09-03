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
  Truck
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
  selected: boolean;
}

const Pagamento = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

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
  const shippingCost = 15.90; // Valor do frete calculado
  const total = subtotal + shippingCost;

  const paymentMethods: PaymentMethod[] = [
    {
      id: "credit",
      name: "Cartão de Crédito",
      icon: <CreditCard className="h-6 w-6" />,
      description: "Pague em até 12x sem juros",
      selected: selectedMethod === "credit"
    },
    {
      id: "pix",
      name: "PIX",
      icon: <CreditCard className="h-6 w-6" />,
      description: "Pagamento instantâneo",
      selected: selectedMethod === "pix"
    },
    {
      id: "boleto",
      name: "Boleto Bancário",
      icon: <CreditCard className="h-6 w-6" />,
      description: "Vencimento em 3 dias úteis",
      selected: selectedMethod === "boleto"
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert("Selecione uma forma de pagamento");
      return;
    }

    setIsProcessing(true);
    
    // Simular processamento do pagamento
    setTimeout(() => {
      setIsProcessing(false);
      // Em produção, aqui seria feita a integração com gateway de pagamento
      alert("Pagamento processado com sucesso!");
      navigate("/meus-pedidos");
    }, 2000);
  };

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/checkout">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Pagamento</h1>
            <p className="text-muted-foreground">Escolha sua forma de pagamento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Formas de pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Forma de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      method.selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleMethodSelect(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        method.selected ? "bg-blue-100" : "bg-gray-100"
                      }`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {method.selected && (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Campos do cartão (se selecionado) */}
                {selectedMethod === "credit" && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">Dados do Cartão</h4>
                    <Input placeholder="Número do cartão" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/AA" />
                      <Input placeholder="CVV" />
                    </div>
                    <Input placeholder="Nome no cartão" />
                  </div>
                )}

                {/* Informações do PIX */}
                {selectedMethod === "pix" && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Pagamento PIX</h4>
                    <p className="text-sm text-green-700">
                      Após confirmar o pedido, você receberá o QR Code para pagamento instantâneo.
                    </p>
                  </div>
                )}

                {/* Informações do Boleto */}
                {selectedMethod === "boleto" && (
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Boleto Bancário</h4>
                    <p className="text-sm text-yellow-700">
                      O boleto será gerado após confirmar o pedido e terá vencimento em 3 dias úteis.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações de segurança */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Pagamento Seguro</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>SSL Criptografado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Dados Protegidos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Ambiente Seguro</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Itens do carrinho */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-muted-foreground text-sm">
                          Qtd: {item.quantity} x R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Resumo de valores */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete:</span>
                    <span>R$ {shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Informações de entrega */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">Entrega</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {userData.addresses.find(addr => addr.isDefault)?.logradouro}, {" "}
                    {userData.addresses.find(addr => addr.isDefault)?.numero} - {" "}
                    {userData.addresses.find(addr => addr.isDefault)?.bairro}, {" "}
                    {userData.addresses.find(addr => addr.isDefault)?.localidade} - {" "}
                    {userData.addresses.find(addr => addr.isDefault)?.uf}
                  </p>
                </div>

                {/* Botão finalizar */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={!selectedMethod || isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processando...
                    </div>
                  ) : (
                    `Pagar R$ ${total.toFixed(2)}`
                  )}
                </Button>

                {/* Informações adicionais */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Pedido será processado após confirmação do pagamento</p>
                  <p>• Você receberá um e-mail com os detalhes do pedido</p>
                  <p>• Prazo de entrega: 2-3 dias úteis</p>
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
