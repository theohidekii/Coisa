import { useState, useEffect } from "react";
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
  Save,
  ArrowRight,
  Edit,
  Clock,
  Shield,
  Calendar
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { calculateFreightForCart } from "@/utils/googleFreightCalculator";

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

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDays: string;
  icon: React.ReactNode;
}

type CheckoutStep = 'personal' | 'address' | 'shipping';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { userData, addAddress, setDefaultAddress, removeAddress } = useUser();
  
  // Estados do sistema de etapas
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('personal');
  const [completedSteps, setCompletedSteps] = useState<CheckoutStep[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>("");
  
  // Estados existentes
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

  // Métodos de envio disponíveis
  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "Entrega Padrão",
      description: "Entrega em 2 - 3 dias úteis",
      cost: shippingCost,
      estimatedDays: shippingInfo?.estimatedDelivery || "2 - 3 dias úteis",
      icon: <Truck className="h-5 w-5" />
    },
    {
      id: "express",
      name: "Entrega Expressa",
      description: "Entrega em 1 - 2 dias úteis",
      cost: shippingCost + 15,
      estimatedDays: "1 - 2 dias úteis",
      icon: <Clock className="h-5 w-5" />
    },
    {
      id: "pickup",
      name: "Retirar na Loja",
      description: "Retire seu pedido em nossa loja física",
      cost: 0,
      estimatedDays: "Mesmo dia (após confirmação)",
      icon: <Package className="h-5 w-5" />
    }
  ];

  // Funções de navegação entre etapas
  const goToNextStep = () => {
    const steps: CheckoutStep[] = ['personal', 'address', 'shipping'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setCurrentStep(nextStep);
      
      // Marcar etapa atual como concluída
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    }
  };

  const goToPreviousStep = () => {
    const steps: CheckoutStep[] = ['personal', 'address', 'shipping'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      const previousStep = steps[currentIndex - 1];
      setCurrentStep(previousStep);
    }
  };

  const goToStep = (step: CheckoutStep) => {
    // Só permite ir para etapas já concluídas ou a próxima etapa
    const steps: CheckoutStep[] = ['personal', 'address', 'shipping'];
    const currentIndex = steps.indexOf(currentStep);
    const targetIndex = steps.indexOf(step);
    
    if (targetIndex <= currentIndex || completedSteps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const calculateShipping = async (cepValue: string) => {
    if (cepValue.length !== 8) return;
    
    setIsCalculatingShipping(true);
    try {
      // Calcula frete usando Google Maps API
      const freightBreakdown = await calculateFreightForCart(cepValue, cartItems);

      const shippingData = {
        cep: cepValue,
        address: freightBreakdown.customerAddress,
        city: "Santo André",
        state: "SP",
        neighborhood: "Vila Bastos",
        distance: freightBreakdown.adjustedDistanceKm,
        shippingCost: freightBreakdown.finalFreight,
        estimatedDelivery: `${freightBreakdown.estimatedDeliveryDays} dias úteis`
      };

      setShippingInfo(shippingData);
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
    } finally {
      setIsCalculatingShipping(false);
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
    // TESTE TEMPORÁRIO: Sempre retorna true para debug
    return true;
    
    // Para retirada na loja, não precisa de shippingInfo
    if (selectedShippingMethod === 'pickup') {
      return userData && selectedAddressId && selectedShippingMethod;
    }
    
    // Para outros métodos, precisa de shippingInfo
    return userData && selectedAddressId && shippingInfo && selectedShippingMethod;
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 'personal':
        return userData && userData.nome && userData.email && userData.telefone;
      case 'address':
        // Para endereço, só precisa ter um endereço selecionado
        // O shippingInfo será calculado automaticamente quando selecionar o endereço
        return selectedAddressId;
      case 'shipping':
        return selectedShippingMethod;
      default:
        return false;
    }
  };

  const handleProceedToPayment = () => {
    if (!canProceedToPayment()) {
      alert("Complete todas as informações antes de prosseguir");
      return;
    }
    navigate("/pagamento");
  };

  // Componente de navegação das etapas melhorado
  const StepNavigation = () => {
    const steps = [
      { id: 'personal', title: 'Dados Pessoais', subtitle: 'Verificar informações', icon: <User className="h-5 w-5" /> },
      { id: 'address', title: 'Endereço', subtitle: 'Onde entregar', icon: <MapPin className="h-5 w-5" /> },
      { id: 'shipping', title: 'Entrega', subtitle: 'Como receber', icon: <Truck className="h-5 w-5" /> }
    ];

    return (
      <div className="mb-8 bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepId = step.id as CheckoutStep;
            const isCompleted = completedSteps.includes(stepId);
            const isCurrent = currentStep === stepId;
            const isClickable = isCompleted || stepId === currentStep;
            const stepNumber = index + 1;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => isClickable && goToStep(stepId)}
                    disabled={!isClickable}
                    className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl transition-all min-w-[120px] ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : isCompleted
                        ? 'bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCurrent ? 'bg-white text-blue-600' : 
                      isCompleted ? 'bg-green-600 text-white' : 
                      'bg-gray-300 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="font-bold text-sm">{stepNumber}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{step.title}</div>
                      <div className="text-xs opacity-80">{step.subtitle}</div>
                    </div>
                  </button>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-96 h-2 mx-8 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? index === 0 && currentStep === 'shipping'
                        ? 'bg-green-600 shadow-lg' 
                        : 'bg-blue-600 shadow-lg'
                      : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
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


          {/* Navegação das etapas */}
          <StepNavigation />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Etapa 1: Informações Pessoais */}
              {currentStep === 'personal' && (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div>Dados Pessoais</div>
                        <p className="text-sm font-normal text-gray-600 mt-1">
                          Verifique suas informações antes de prosseguir
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Nome completo</label>
                        <div className="relative">
                          <Input 
                            value={userData.nome} 
                            readOnly 
                            className="bg-gray-50 border-gray-200 text-gray-700 font-medium"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">CPF</label>
                        <div className="relative">
                          <Input 
                            value={userData.cpf} 
                            readOnly 
                            className="bg-gray-50 border-gray-200 text-gray-700 font-medium"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Telefone</label>
                        <div className="relative">
                          <Input 
                            value={userData.telefone} 
                            readOnly 
                            className="bg-gray-50 border-gray-200 text-gray-700 font-medium"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">E-mail</label>
                        <div className="relative">
                          <Input 
                            value={userData.email} 
                            readOnly 
                            className="bg-gray-50 border-gray-200 text-gray-700 font-medium"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-green-600" />
                        <div>
                          <h4 className="font-semibold text-green-800">Informações verificadas</h4>
                          <p className="text-sm text-green-700">Todos os seus dados estão corretos e seguros</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button 
                        onClick={goToNextStep} 
                        disabled={!canProceedToNextStep()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Continuar para Endereço
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Etapa 2: Endereço de Entrega */}
              {currentStep === 'address' && (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div>Endereço de Entrega</div>
                        <p className="text-sm font-normal text-gray-600 mt-1">
                          Onde você quer receber seu pedido?
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Endereços salvos */}
                    {userData.addresses.length > 0 ? (
                      <div className="space-y-4 mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Seus endereços salvos</h3>
                        <div className="grid gap-4">
                          {userData.addresses.map((address) => (
                            <div
                              key={address.id}
                              className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                                selectedAddressId === address.id
                                  ? "border-green-500 bg-green-50 shadow-lg"
                                  : "border-gray-200 hover:border-gray-300 bg-white"
                              }`}
                              onClick={() => handleAddressSelect(address.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                      selectedAddressId === address.id ? 'bg-green-600' : 'bg-gray-200'
                                    }`}>
                                      {selectedAddressId === address.id && (
                                        <CheckCircle className="h-4 w-4 text-white" />
                                      )}
                                    </div>
                                    <h4 className="font-semibold text-lg">{address.name}</h4>
                                    {address.isDefault && (
                                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                        Padrão
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="space-y-1 text-gray-600">
                                    <p className="font-medium">
                                      {address.logradouro}, {address.numero}
                                      {address.complemento && ` - ${address.complemento}`}
                                    </p>
                                    <p>{address.bairro}, {address.localidade} - {address.uf}</p>
                                    <p className="text-sm">CEP: {address.cep}</p>
                                  </div>
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
                                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 mb-8">
                        <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum endereço salvo</h3>
                        <p className="text-gray-500">Adicione um endereço para continuar</p>
                      </div>
                    )}

                    {/* Adicionar novo endereço */}
                    {!showNewAddressForm ? (
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={() => setShowNewAddressForm(true)}
                          className="border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-600 hover:text-green-700 py-6 px-8 rounded-xl text-lg font-medium"
                        >
                          <Plus className="h-6 w-6 mr-3" />
                          Adicionar Novo Endereço
                        </Button>
                      </div>
                    ) : (
                      <Card className="border-2 border-dashed border-green-300 bg-green-50">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                              <Plus className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-lg text-green-800">Novo Endereço</h4>
                          </div>
                          
                          {/* Busca por CEP */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">CEP</label>
                              <Input
                                placeholder="00000-000"
                                value={cep}
                                onChange={(e) => handleCepChange(e.target.value)}
                                maxLength={8}
                                className="text-lg"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Nome do endereço</label>
                              <Input
                                placeholder="Ex: Casa, Trabalho"
                                value={newAddress.name}
                                onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                                className="text-lg"
                              />
                            </div>
                          </div>

                          {/* Status do endereço */}
                          {isLoadingAddress && (
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
                              <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                <span className="text-blue-700 font-medium">Buscando endereço...</span>
                              </div>
                            </div>
                          )}
                          
                          {addressInfo && !isLoadingAddress && (
                            <div className="p-4 bg-green-100 border border-green-300 rounded-xl mb-6">
                              <div className="flex items-center gap-3 mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="font-semibold text-green-800">Endereço encontrado!</span>
                              </div>
                              <div className="text-green-700 font-medium">
                                {addressInfo.logradouro}, {addressInfo.bairro}, {addressInfo.localidade} - {addressInfo.uf}
                              </div>
                            </div>
                          )}

                          {/* Campos adicionais */}
                          {addressInfo && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                              <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Número</label>
                                <Input
                                  placeholder="Número"
                                  value={newAddress.numero}
                                  onChange={(e) => setNewAddress(prev => ({ ...prev, numero: e.target.value }))}
                                  className="text-lg"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Complemento</label>
                                <Input
                                  placeholder="Apto, bloco, etc."
                                  value={newAddress.complemento}
                                  onChange={(e) => setNewAddress(prev => ({ ...prev, complemento: e.target.value }))}
                                  className="text-lg"
                                />
                              </div>
                            </div>
                          )}

                          {/* Botões */}
                          <div className="flex gap-3">
                            <Button
                              onClick={handleSaveAddress}
                              disabled={!addressInfo || !newAddress.name || !newAddress.numero}
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold rounded-xl"
                            >
                              <Save className="h-5 w-5 mr-2" />
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
                              className="px-6 py-3 font-semibold rounded-xl"
                            >
                              Cancelar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Informações de frete */}
                    {shippingInfo && (
                      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Truck className="h-6 w-6 text-blue-600" />
                          <h4 className="font-semibold text-blue-800 text-lg">Informações de Entrega</h4>
                          {freeShipping && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Frete Grátis
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="text-center p-4 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{shippingInfo.distance} km</div>
                            <div className="text-sm text-blue-700">Distância</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg">
                            <div className="text-lg font-bold text-blue-600">{shippingInfo.estimatedDelivery}</div>
                            <div className="text-sm text-blue-700">Prazo de entrega</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Botões de navegação */}
                    <div className="flex justify-between mt-8">
                      <Button 
                        variant="outline" 
                        onClick={goToPreviousStep}
                        className="px-8 py-3 text-lg font-semibold rounded-xl"
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Voltar
                      </Button>
                      <Button 
                        onClick={goToNextStep} 
                        disabled={!canProceedToNextStep()}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Continuar para Entrega
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Etapa 3: Método de Envio */}
              {currentStep === 'shipping' && (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <Truck className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div>Método de Entrega</div>
                        <p className="text-sm font-normal text-gray-600 mt-1">
                          Como você quer receber seu pedido?
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {shippingMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                            selectedShippingMethod === method.id
                              ? "border-purple-500 bg-purple-50 shadow-lg"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                          onClick={() => setSelectedShippingMethod(method.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                selectedShippingMethod === method.id
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}>
                                {method.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">{method.name}</h4>
                                <p className="text-gray-600 mb-1">{method.description}</p>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-500">{method.estimatedDays}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${
                                selectedShippingMethod === method.id ? 'text-purple-600' : 'text-gray-800'
                              }`}>
                                {freeShipping ? (
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm px-3 py-1">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Grátis
                                    </Badge>
                                  </div>
                                ) : (
                                  `R$ ${method.cost.toFixed(2)}`
                                )}
                              </div>
                              {!freeShipping && (
                                <p className="text-sm text-gray-500">Frete</p>
                              )}
                            </div>
                          </div>
                          
                          {/* Indicador de seleção */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className={`flex items-center gap-2 ${
                              selectedShippingMethod === method.id ? 'text-purple-600' : 'text-gray-400'
                            }`}>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedShippingMethod === method.id 
                                  ? 'border-purple-600 bg-purple-600' 
                                  : 'border-gray-300'
                              }`}>
                                {selectedShippingMethod === method.id && (
                                  <CheckCircle className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm font-medium">
                                {selectedShippingMethod === method.id ? 'Selecionado' : 'Selecionar'}
                              </span>
                            </div>
                            
                            {/* Benefícios do método */}
                            <div className="flex gap-2">
                              {method.id === 'express' && (
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                                  Mais rápido
                                </Badge>
                              )}
                              {method.id === 'pickup' && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  Grátis
                                </Badge>
                              )}
                              {method.id === 'standard' && (
                                <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
                                  Econômico
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Informações específicas para retirada na loja */}
                    {selectedShippingMethod === 'pickup' && (
                      <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Package className="h-6 w-6 text-green-600" />
                          <h4 className="font-semibold text-green-800">Retirada na Loja</h4>
                        </div>
                        <div className="space-y-3 text-sm text-green-700">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Frete grátis</p>
                              <p className="text-xs text-green-600">Sem custo adicional de entrega</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Disponível em até 2 horas</p>
                              <p className="text-xs text-green-600">Após confirmação do pagamento</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Endereço da loja</p>
                              <p className="text-xs text-green-600">Av. Dom Pedro I, 2275 - Vila Vitória, Santo André - SP</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Horário de funcionamento</p>
                              <p className="text-xs text-green-600">Seg-Sex: 8h às 18h | Sáb: 8h às 12h</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informações adicionais */}
                    <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="h-6 w-6 text-gray-600" />
                        <h4 className="font-semibold text-gray-800">Informações importantes</h4>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• O prazo de entrega pode variar conforme a região</p>
                        <p>• Entregas expressas têm prioridade no processamento</p>
                        <p>• <strong>Retirada na loja:</strong> Disponível em até 2 horas após confirmação do pagamento</p>
                        <p>• Você receberá um código de rastreamento por SMS/email</p>
                        <p>• Em caso de ausência, tentaremos nova entrega no dia seguinte</p>
                        <p>• <strong>Horário da loja:</strong> Segunda a sexta, 8h às 18h | Sábado, 8h às 12h</p>
                      </div>
                    </div>

                    {/* Botões de navegação */}
                    <div className="flex justify-start mt-8">
                      <Button 
                        variant="outline" 
                        onClick={goToPreviousStep}
                        className="px-8 py-3 text-lg font-semibold rounded-xl"
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Voltar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Resumo do pedido */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg sticky top-6">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div>Resumo do Pedido</div>
                      <p className="text-sm font-normal text-gray-600 mt-1">
                        Revise seus itens e informações
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Itens do carrinho */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-gray-800">Itens no carrinho</h3>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
                        <p className="font-semibold text-blue-600">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Informações da etapa atual */}
                  <div className="my-6">
                    {currentStep === 'personal' && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">Etapa Atual: Dados Pessoais</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Verifique suas informações pessoais antes de prosseguir
                        </p>
                      </div>
                    )}

                    {currentStep === 'address' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-green-800">Etapa Atual: Endereço</span>
                        </div>
                        {selectedAddressId ? (
                          <div>
                            <p className="text-sm text-green-700 mb-2">Endereço selecionado:</p>
                            {(() => {
                              const address = userData?.addresses.find(addr => addr.id === selectedAddressId);
                              return address ? (
                                <div className="text-sm text-green-600 bg-white p-2 rounded border">
                                  <div className="font-medium">{address.name}</div>
                                  <div>{address.logradouro}, {address.numero}</div>
                                  <div>{address.bairro}, {address.localidade} - {address.uf}</div>
                                </div>
                              ) : null;
                            })()}
                          </div>
                        ) : (
                          <p className="text-sm text-green-700">
                            Selecione um endereço para entrega
                          </p>
                        )}
                      </div>
                    )}

                    {currentStep === 'shipping' && (
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <Truck className="h-5 w-5 text-purple-600" />
                          <span className="font-semibold text-purple-800">Etapa Atual: Método de Entrega</span>
                        </div>
                        {selectedShippingMethod ? (
                          <div>
                            <p className="text-sm text-purple-700 mb-2">Método selecionado:</p>
                            {(() => {
                              const method = shippingMethods.find(m => m.id === selectedShippingMethod);
                              return method ? (
                                <div className="text-sm text-purple-600 bg-white p-2 rounded border">
                                  <div className="font-medium">{method.name}</div>
                                  <div>{method.description}</div>
                                  <div className="text-xs text-gray-500">{method.estimatedDays}</div>
                                </div>
                              ) : null;
                            })()}
                          </div>
                        ) : (
                          <p className="text-sm text-purple-700">
                            Escolha como deseja receber seu pedido
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Resumo de valores */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Frete:</span>
                      <div className="flex items-center gap-2">
                        {freeShipping || selectedShippingMethod === 'pickup' ? (
                          <>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Grátis
                            </Badge>
                          </>
                        ) : (
                          <span className="font-semibold">
                            {shippingCost > 0 ? `R$ ${shippingCost.toFixed(2)}` : 'Calculando...'}
                          </span>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Botão de ação baseado na etapa */}
                  <div className="mt-6">
                    {currentStep === 'shipping' ? (
                      <Button 
                        className={`w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all ${
                          canProceedToPayment() 
                            ? "bg-purple-600 hover:bg-purple-700 text-white" 
                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                        onClick={handleProceedToPayment}
                        disabled={!canProceedToPayment()}
                      >
                        <Shield className="h-5 w-5 mr-2" />
                        {canProceedToPayment() ? "Finalizar Pedido" : "Complete as informações"}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all" 
                        onClick={goToNextStep}
                        disabled={!canProceedToNextStep()}
                      >
                        {currentStep === 'personal' ? 'Continuar para Endereço' : 'Continuar para Entrega'}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    )}
                  </div>

                  {/* Informações de segurança */}
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Compra Segura</span>
                    </div>
                    <div className="text-xs text-green-700 space-y-1">
                      <p>• Seus dados estão protegidos com criptografia SSL</p>
                      <p>• Processamento seguro do pagamento</p>
                      <p>• Garantia de entrega ou seu dinheiro de volta</p>
                    </div>
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
