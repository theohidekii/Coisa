import { useState } from "react";
import { User, Phone, Mail, Edit, Save, X, ArrowLeft, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MinhaConta = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    endereco: "Rua das Flores, 123 - São Paulo, SP"
  });

  const [formData, setFormData] = useState(userData);

  const handleEdit = () => {
    setFormData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        <div className="max-w-3xl mx-auto">
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

          {/* Profile Information */}
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

                {/* Endereço */}
                <div className="mt-10 space-y-4">
                  <Label htmlFor="endereco" className="text-sm font-bold text-slate-700 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Endereço</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      placeholder="Digite seu endereço completo"
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-14 text-lg"
                    />
                  ) : (
                    <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-800 font-semibold text-lg">{userData.endereco}</span>
                    </div>
                  )}
                </div>
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
