import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Image, Package, BarChart3, TrendingUp, Search, Filter, Upload, Save, X, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Estado de exemplo para produtos
  const [products] = useState([
    { id: 1, name: "Tinta Acrílica Premium", price: 89.90, category: "Tintas", status: "Ativo", stock: 45, sku: "TINT-001" },
    { id: 2, name: "Furadeira Bosch Professional", price: 299.90, category: "Ferramentas", status: "Ativo", stock: 12, sku: "FERR-002" },
    { id: 3, name: "Cimento CPII 50kg", price: 24.90, category: "Cimentos", status: "Inativo", stock: 0, sku: "CIM-003" },
    { id: 4, name: "Piso Cerâmico 60x60", price: 45.90, category: "Pisos", status: "Ativo", stock: 28, sku: "PISO-004" },
    { id: 5, name: "Vaso Sanitário Completo", price: 189.90, category: "Hidráulico", status: "Ativo", stock: 8, sku: "HID-005" },
  ]);

  // Estado de exemplo para banners
  const [banners] = useState([
    { id: 1, title: "Super Ofertas de Tintas", status: "Ativo", position: 1 },
    { id: 2, title: "Ferramentas Profissionais", status: "Ativo", position: 2 },
    { id: 3, title: "Material Hidráulico", status: "Rascunho", position: 3 },
  ]);

  // Filtros
  const categories = ["Tintas", "Ferramentas", "Cimentos", "Pisos", "Hidráulico", "Elétrico"];
  const statusOptions = ["Ativo", "Inativo", "Rascunho"];

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/32dfc200-6c26-41e4-a389-de2afd7b4eb9.png" 
                alt="COISA Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            </div>
            <Button variant="outline" asChild className="border-gray-300 hover:bg-gray-50">
              <a href="/">Ver Site</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Package className="h-4 w-4" />
              <span>Produtos</span>
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Image className="h-4 w-4" />
              <span>Banners</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Edit className="h-4 w-4" />
              <span>Configurações</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total de Produtos</CardTitle>
                  <Package className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">246</div>
                  <p className="text-xs text-gray-500">+12% em relação ao mês anterior</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Banners Ativos</CardTitle>
                  <Image className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <p className="text-xs text-gray-500">2 em rotação ativa</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Visualizações</CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">1,234</div>
                  <p className="text-xs text-gray-500">+5% esta semana</p>
                </CardContent>
              </Card>
            </div>

            {/* Relatório de Vendas */}
            <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <TrendingUp className="h-5 w-5" />
                  <span>Relatório de Vendas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 mb-4">
                  Visualize gráficos interativos com dados de vendas mensais, produtos mais vendidos e distribuição por categorias.
                </p>
                <Link to="/relatorio-vendas">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Ver Relatório Completo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Produtos</h2>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowAddProduct(!showAddProduct)}
              >
                {showAddProduct ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {showAddProduct ? "Cancelar" : "Novo Produto"}
              </Button>
            </div>

            {/* Filtros e Busca */}
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar produtos..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Categorias</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    <Filter className="mr-2 h-4 w-4" />
                    Limpar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Formulário de Adicionar Produto */}
            {showAddProduct && (
              <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-blue-600" />
                    Adicionar Novo Produto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome do Produto *</Label>
                      <Input 
                        id="name" 
                        placeholder="Ex: Tinta Acrílica Premium" 
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku" className="text-sm font-medium text-gray-700">SKU *</Label>
                      <Input 
                        id="sku" 
                        placeholder="Ex: TINT-001" 
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium text-gray-700">Preço *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="0,00" 
                          className="pl-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock" className="text-sm font-medium text-gray-700">Estoque *</Label>
                      <Input 
                        id="stock" 
                        type="number" 
                        placeholder="0" 
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium text-gray-700">Categoria *</Label>
                      <Select>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descrição detalhada do produto..." 
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Imagens do Produto</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Arraste e solte imagens aqui ou clique para selecionar</p>
                      <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                        Selecionar Imagens
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddProduct(false)}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Cancelar
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Produto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabela de Produtos */}
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700">Produto</th>
                        <th className="text-left p-4 font-medium text-gray-700">SKU</th>
                        <th className="text-left p-4 font-medium text-gray-700">Preço</th>
                        <th className="text-left p-4 font-medium text-gray-700">Estoque</th>
                        <th className="text-left p-4 font-medium text-gray-700">Categoria</th>
                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                        <th className="text-left p-4 font-medium text-gray-700">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{product.sku}</td>
                          <td className="p-4 font-medium text-gray-900">R$ {product.price.toFixed(2).replace('.', ',')}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                                {product.stock}
                              </span>
                              {product.stock <= 10 && product.stock > 0 && (
                                <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs">Baixo</Badge>
                              )}
                              {product.stock === 0 && (
                                <Badge variant="outline" className="text-red-600 border-red-200 text-xs">Sem Estoque</Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{product.category}</td>
                          <td className="p-4">
                            <Badge 
                              variant={product.status === 'Ativo' ? 'default' : 'secondary'}
                              className={product.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {product.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas dos Produtos */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{products.length}</div>
                  <p className="text-sm text-gray-600">Total de Produtos</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{products.filter(p => p.status === 'Ativo').length}</div>
                  <p className="text-sm text-gray-600">Produtos Ativos</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{products.filter(p => p.stock <= 10 && p.stock > 0).length}</div>
                  <p className="text-sm text-gray-600">Estoque Baixo</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{products.filter(p => p.stock === 0).length}</div>
                  <p className="text-sm text-gray-600">Sem Estoque</p>
              </CardContent>
            </Card>
            </div>
          </TabsContent>

          {/* Banners */}
          <TabsContent value="banners" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciar Banners</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Novo Banner
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <Card key={banner.id} className="border-0 bg-white shadow-sm">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">{banner.title}</h3>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={banner.status === 'Ativo' ? 'default' : 'secondary'}
                          className={banner.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {banner.status}
                        </Badge>
                        <span className="text-sm text-gray-500">Posição {banner.position}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 hover:bg-gray-50">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Configurações do Site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-title" className="text-sm font-medium text-gray-700">Título do Site</Label>
                  <Input 
                    id="site-title" 
                    defaultValue="COISA Materiais de Construção" 
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description" className="text-sm font-medium text-gray-700">Descrição</Label>
                  <Textarea 
                    id="site-description" 
                    defaultValue="Tudo que você precisa para sua obra, com os melhores preços e atendimento especializado."
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm font-medium text-gray-700">Email de Contato</Label>
                  <Input 
                    id="contact-email" 
                    defaultValue="contato@coisa.com.br" 
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;