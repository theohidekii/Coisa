import { useState } from "react";
import { User, Phone, Mail, Edit, Save, X, ArrowLeft, Shield, MapPin, Plus, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";

const MinhaConta = () => {
  const { userData, addAddress, removeAddress, setDefaultAddress, updateUserInfo } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState<any>(null);
  const [cep, setCep] = useState("");
  const [newAddress, setNewAddress] = useState({
    name: "",
    numero: "",
    complemento: ""
  });

  const [formData, setFormData] = useState({
    nome: userData?.nome || "",
    email: userData?.email || "",
    telefone: userData?.telefone || "",
    cpf: userData?.cpf || ""
  });

  const handleEdit = () => {
    setFormData({
      nome: userData?.nome || "",
      email: userData?.email || "",
      telefone: userData?.telefone || "",
      cpf: userData?.cpf || ""
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (userData) {
      updateUserInfo(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      nome: userData?.nome || "",
      email: userData?.email || "",
      telefone: userData?.telefone || "",
      cpf: userData?.cpf || ""
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepChange = async (value: string) => {
    const cleanCep = value.replace(/\D/g, "");
    setCep(cleanCep);
    
    if (cleanCep.length === 8) {
      await fetchAddressInfo(cleanCep);
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

  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Back Button */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-3">
          <Link to="/">
            <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Minha Conta</h1>
            <p className="text-slate-600">Gerencie suas informações pessoais</p>
          </div>

          {/* Action Bar */}
          <div className="flex justify-end mb-8">
            {!isEditing ? (
              <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm">
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            ) : (
              <div className="flex space-x-3">
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-sm">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
                <Button onClick={handleCancel} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-lg">
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-8">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center space-x-4 text-slate-800">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Informações Pessoais</h2>
                    <p className="text-slate-600 font-medium">Dados básicos do seu perfil</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Nome */}
                  <div className="space-y-4">
                    <Label htmlFor="nome" className="text-sm font-bold text-slate-700 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Nome Completo</span>
                    </Label>
                    {isEditing ? (
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        placeholder="Digite seu nome completo"
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-14 text-lg"
                      />
                    ) : (
                      <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-slate-800 font-semibold text-lg">{userData.nome}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-4">
                    <Label htmlFor="email" className="text-sm font-bold text-slate-700 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Email</span>
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Digite seu email"
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-14 text-lg"
                      />
                    ) : (
                      <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <span className="text-slate-800 font-semibold text-lg">{userData.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Telefone */}
                  <div className="space-y-4">
                    <Label htmlFor="telefone" className="text-sm font-bold text-slate-700 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Telefone</span>
                    </Label>
                    {isEditing ? (
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                        placeholder="Digite seu telefone"
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-14 text-lg"
                      />
                    ) : (
                      <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <span className="text-slate-800 font-semibold text-lg">{userData.telefone}</span>
                      </div>
                    )}
                  </div>

                  {/* CPF */}
                  <div className="space-y-4">
                    <Label htmlFor="cpf" className="text-sm font-bold text-slate-700 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>CPF</span>
                    </Label>
                    {isEditing ? (
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        placeholder="Digite seu CPF"
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-14 text-lg"
                      />
                    ) : (
                      <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="text-slate-800 font-semibold text-lg">{userData.cpf}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Addresses Section */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <CardTitle className="flex items-center justify-between text-slate-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Meus Endereços</h2>
                      <p className="text-slate-600 font-medium">Gerencie seus endereços de entrega</p>
                    </div>
                  </div>
                  {!showNewAddressForm && (
                    <Button
                      onClick={() => setShowNewAddressForm(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Endereço
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10">
                {/* Existing Addresses */}
                {userData.addresses.length > 0 && (
                  <div className="space-y-6 mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Endereços Salvos</h3>
                    {userData.addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-xl p-6 transition-all ${
                          address.isDefault
                            ? "border-green-300 bg-green-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="font-semibold text-lg text-slate-900">{address.name}</h4>
                              {address.isDefault && (
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  <Star className="h-3 w-3 mr-1" />
                                  Padrão
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-2 text-slate-700">
                              <p className="font-medium">
                                {address.logradouro}, {address.numero}
                                {address.complemento && ` - ${address.complemento}`}
                              </p>
                              <p>{address.bairro}</p>
                              <p>{address.localidade} - {address.uf}</p>
                              <p className="text-sm text-slate-600">CEP: {address.cep}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            {!address.isDefault && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDefaultAddress(address.id)}
                                className="border-green-200 text-green-700 hover:bg-green-50"
                              >
                                Definir como padrão
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeAddress(address.id)}
                              className="border-red-200 text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add New Address Form */}
                {showNewAddressForm && (
                  <Card className="border-dashed border-2 border-green-300 bg-green-50/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-slate-800">Novo Endereço</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowNewAddressForm(false);
                            setNewAddress({ name: "", numero: "", complemento: "" });
                            setAddressInfo(null);
                            setCep("");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* CEP Search */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label className="text-sm font-medium text-slate-700">CEP *</Label>
                          <Input
                            placeholder="00000-000"
                            value={cep}
                            onChange={(e) => handleCepChange(e.target.value)}
                            maxLength={8}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700">Nome do Endereço *</Label>
                          <Input
                            placeholder="Ex: Casa, Trabalho"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {/* Address Status */}
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

                      {/* Additional Fields */}
                      {addressInfo && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <Label className="text-sm font-medium text-slate-700">Número *</Label>
                            <Input
                              placeholder="Número"
                              value={newAddress.numero}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, numero: e.target.value }))}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-700">Complemento</Label>
                            <Input
                              placeholder="Apto, bloco, etc."
                              value={newAddress.complemento}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, complemento: e.target.value }))}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          onClick={handleSaveAddress}
                          disabled={!addressInfo || !newAddress.name || !newAddress.numero}
                          className="bg-green-600 hover:bg-green-700 text-white"
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

                {/* Empty State */}
                {userData.addresses.length === 0 && !showNewAddressForm && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum endereço cadastrado</h3>
                    <p className="text-slate-600 mb-6">Adicione seu primeiro endereço para facilitar suas compras</p>
                    <Button
                      onClick={() => setShowNewAddressForm(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Primeiro Endereço
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MinhaConta;
