import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Truck, 
  Package, 
  CreditCard, 
  User, 
  Phone, 
  Mail, 
  CheckCircle,
  ArrowLeft,
  ShoppingCart,
  Plus,
  Trash2,
  Save
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

interface ShippingInfo {
  cep: string;
  address: string;
  city: string;
  state: string;
  neighborhood: string;
  distance: number;
  shippingCost: number;
  estimatedDelivery: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { userData, addAddress, setDefaultAddress, removeAddress } = useUser();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [cep, setCep] = useState("");
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [addressInfo, setAddressInfo] = useState<any>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    numero: "",
    complemento: ""
  });

  // Dados simulados do carrinho
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
  const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  const shippingCost = shippingInfo?.shippingCost || 0;
  // O frete não é adicionado ao total, apenas informativo
  const total = subtotal;
  const freeShipping = subtotal >= 150;

  const calculateShipping = async (cepValue: string) => {
    if (cepValue.length !== 8) return;
    
    setIsCalculatingShipping(true);
    try {
      // Cálculo de frete baseado no modelo fornecido
      const storeCep = "09130-410"; // CEP da loja COISA
      const distance = calculateDistance(storeCep, cepValue);
      const baseRate = 7.90;
      const distanceCost = distance > 5 ? (distance - 5) * 1.20 : 0;
      const weightCost = totalWeight > 1 ? (totalWeight <= 5 ? 5.00 : 10.00) : 0;
      
      let finalShippingCost = baseRate + distanceCost + weightCost;
      if (freeShipping) {
        finalShippingCost = 0;
      }

      setShippingInfo({
        cep: cepValue,
        address: "Rua Exemplo, 123",
        city: "São Paulo",
        state: "SP",
        neighborhood: "Centro",
        distance,
        shippingCost: finalShippingCost,
        estimatedDelivery: distance <= 10 ? "1-2 dias úteis" : "2-3 dias úteis"
      });
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const calculateDistance = (cepOrigin: string, cepDest: string): number => {
    // Cálculo de distância baseado em CEPs
    // CEP da loja: 09130-410 (Santo André - SP)
    const cepNumbers = {
      origin: parseInt(cepOrigin.replace("-", "")),
      dest: parseInt(cepDest.replace("-", ""))
    };
    
    // Cálculo mais preciso baseado na diferença dos CEPs
    const difference = Math.abs(cepNumbers.origin - cepNumbers.dest);
    
    // Mapeamento específico para CEPs da Grande São Paulo
    // Baseado na localização da loja em Santo André (09130-410)
    
    // Para CEPs da Grande São Paulo (mais preciso)
    if (difference < 1000) {
      return Math.max(1, Math.floor(difference / 100)); // 1-10 km
    } else if (difference < 5000) {
      return Math.max(3, Math.floor(difference / 200)); // 3-25 km
    } else if (difference < 20000) {
      return Math.max(8, Math.floor(difference / 500)); // 8-40 km
    } else if (difference < 50000) {
      return Math.max(15, Math.floor(difference / 1000)); // 15-50 km
    } else {
      return Math.max(25, Math.floor(difference / 2000)); // 25+ km
    }
  };

  const handleCepChange = (value: string) => {
    const cleanCep = value.replace(/\D/g, "");
    setCep(cleanCep);
    
    if (cleanCep.length === 8) {
      fetchAddressInfo(cleanCep);
      calculateShipping(cleanCep);
    } else {
      setAddressInfo(null);
    }
  };

  const fetchAddressInfo = async (cepValue: string) => {
    setIsLoadingAddress(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setAddressInfo(null);
        return;
      }
      
      setAddressInfo({
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        cep: data.cep
      });
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      setAddressInfo(null);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleSaveAddress = () => {
    if (!addressInfo || !newAddress.name || !newAddress.numero) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const addressToSave = {
      name: newAddress.name,
      cep: addressInfo.cep,
      logradouro: addressInfo.logradouro,
      numero: newAddress.numero,
      complemento: newAddress.complemento,
      bairro: addressInfo.bairro,
      localidade: addressInfo.localidade,
      uf: addressInfo.uf,
      isDefault: userData?.addresses.length === 0
    };

    addAddress(addressToSave);
    setShowNewAddressForm(false);
    setNewAddress({ name: "", numero: "", complemento: "" });
    setAddressInfo(null);
    setCep("");
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const address = userData?.addresses.find(addr => addr.id === addressId);
    if (address) {
      calculateShipping(address.cep);
    }
  };

  const canProceedToPayment = () => {
    return userData && selectedAddressId && shippingInfo;
  };

  const handleProceedToPayment = () => {
    if (!canProceedToPayment()) {
      alert("Complete todas as informações antes de prosseguir");
      return;
    }
    navigate("/pagamento");
  };

  return (
    <div className="min-h-screen bg-background">
      {!userData ? (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Carregando dados do usuário...</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/carrinho">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Finalizar Pedido</h1>
              <p className="text-muted-foreground">Complete suas informações para finalizar a compra</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informações pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome completo</label>
                      <Input 
                        value={userData.nome} 
                        readOnly 
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">CPF</label>
                      <Input 
                        value={userData.cpf} 
                        readOnly 
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Telefone</label>
                      <Input 
                        value={userData.telefone} 
                        readOnly 
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">E-mail</label>
                      <Input 
                        value={userData.email} 
                        readOnly 
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Endereços salvos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereços Salvos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.addresses.length > 0 ? (
                    <div className="space-y-3">
                      {userData.addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedAddressId === address.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleAddressSelect(address.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{address.name}</h4>
                                {address.isDefault && (
                                  <Badge variant="secondary" className="text-xs">
                                    Padrão
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {address.logradouro}, {address.numero}
                                {address.complemento && ` - ${address.complemento}`}
                              </p>
                              <p className="text-sm text-gray-600">
                                {address.bairro}, {address.localidade} - {address.uf}
                              </p>
                              <p className="text-sm text-gray-600">CEP: {address.cep}</p>
                            </div>
                            <div className="flex gap-2">
                              {!address.isDefault && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDefaultAddress(address.id);
                                  }}
                                >
                                  Definir como padrão
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeAddress(address.id);
                                  if (selectedAddressId === address.id) {
                                    setSelectedAddressId("");
                                  }
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum endereço salvo. Adicione um novo endereço abaixo.
                    </p>
                  )}

                  {/* Adicionar novo endereço */}
                  {!showNewAddressForm ? (
                    <Button
                      variant="outline"
                      onClick={() => setShowNewAddressForm(true)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Novo Endereço
                    </Button>
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-4">Novo Endereço</h4>
                        
                        {/* Busca por CEP */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="text-sm font-medium">CEP</label>
                            <Input
                              placeholder="00000-000"
                              value={cep}
                              onChange={(e) => handleCepChange(e.target.value)}
                              maxLength={8}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Nome do endereço</label>
                            <Input
                              placeholder="Ex: Casa, Trabalho"
                              value={newAddress.name}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                        </div>

                        {/* Status do endereço */}
                        {isLoadingAddress && (
                          <div className="p-3 bg-blue-50 rounded-lg text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              <span className="text-blue-700">Buscando endereço...</span>
                            </div>
                          </div>
                        )}
                        
                        {addressInfo && !isLoadingAddress && (
                          <div className="p-3 bg-green-50 rounded-lg text-sm mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-800">Endereço encontrado</span>
                            </div>
                            <div className="text-green-700">
                              {addressInfo.logradouro}, {addressInfo.bairro}, {addressInfo.localidade} - {addressInfo.uf}
                            </div>
                          </div>
                        )}

                        {/* Campos adicionais */}
                        {addressInfo && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="text-sm font-medium">Número</label>
                              <Input
                                placeholder="Número"
                                value={newAddress.numero}
                                onChange={(e) => setNewAddress(prev => ({ ...prev, numero: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Complemento</label>
                              <Input
                                placeholder="Apto, bloco, etc."
                                value={newAddress.complemento}
                                onChange={(e) => setNewAddress(prev => ({ ...prev, complemento: e.target.value }))}
                              />
                            </div>
                          </div>
                        )}

                        {/* Botões */}
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveAddress}
                            disabled={!addressInfo || !newAddress.name || !newAddress.numero}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Endereço
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowNewAddressForm(false);
                              setNewAddress({ name: "", numero: "", complemento: "" });
                              setAddressInfo(null);
                              setCep("");
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* Informações de frete */}
              {shippingInfo && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Frete calculado</h3>
                      {freeShipping && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Frete Grátis
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Distância:</span>
                        <p className="font-medium">{shippingInfo.distance} km</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Prazo:</span>
                        <p className="font-medium">{shippingInfo.estimatedDelivery}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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
                      <div className="flex items-center gap-2">
                        {freeShipping ? (
                          <>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              Grátis
                            </Badge>
                            <span>Grátis</span>
                          </>
                        ) : (
                          <span>{shippingCost > 0 ? `R$ ${shippingCost.toFixed(2)}` : 'Calculando...'}</span>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Botão finalizar */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleProceedToPayment}
                    disabled={!canProceedToPayment()}
                  >
                    Prosseguir para Pagamento
                  </Button>

                  {/* Informações adicionais */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Complete todas as informações antes de prosseguir</p>
                    <p>• Você poderá escolher a forma de pagamento na próxima etapa</p>
                    <p>• Pedido será processado após confirmação do pagamento</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
