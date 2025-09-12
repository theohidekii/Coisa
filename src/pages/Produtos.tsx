import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ShoppingCart,
  Star,
  Heart,
  Eye,
  Grid3X3,
  List,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  weight: number;
  description: string;
}

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { addToCart } = useCart();

  const PRODUCTS_PER_PAGE = 15;

  // Dados simulados dos produtos
  const products: Product[] = [
    {
      id: 1,
      name: "Cimento Portland CP-II 50kg",
      price: 25.90,
      originalPrice: 29.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Cimentos e Argamassas",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      isNew: true,
      weight: 50,
      description: "Cimento Portland CP-II ideal para construções em geral"
    },
    {
      id: 2,
      name: "Tijolo Cerâmico 6 Furos",
      price: 0.85,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tijolos e Blocos",
      rating: 4.2,
      reviews: 89,
      inStock: true,
      weight: 2.5,
      description: "Tijolo cerâmico de 6 furos para alvenaria"
    },
    {
      id: 3,
      name: "Areia Média Lavada",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Areias e Britas",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      weight: 50,
      description: "Areia média lavada para construção"
    },
    {
      id: 4,
      name: "Porcelanato 60x60cm",
      price: 35.90,
      originalPrice: 42.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Pisos e Revestimentos",
      rating: 4.8,
      reviews: 203,
      inStock: true,
      isOnSale: true,
      weight: 15,
      description: "Porcelanato 60x60cm para pisos e paredes"
    },
    {
      id: 5,
      name: "Tinta Branca 18L",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tintas e Acabamentos",
      rating: 4.3,
      reviews: 167,
      inStock: true,
      weight: 18,
      description: "Tinta branca 18L para paredes internas"
    },
    {
      id: 6,
      name: "Furadeira 13mm",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Ferramentas",
      rating: 4.6,
      reviews: 94,
      inStock: true,
      weight: 2.8,
      description: "Furadeira elétrica 13mm profissional"
    },
    {
      id: 7,
      name: "Argamassa Colante",
      price: 15.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Cimentos e Argamassas",
      rating: 4.4,
      reviews: 78,
      inStock: true,
      weight: 20,
      description: "Argamassa colante para revestimentos"
    },
    {
      id: 8,
      name: "Bloco de Concreto 14x19x39cm",
      price: 1.20,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tijolos e Blocos",
      rating: 4.1,
      reviews: 112,
      inStock: true,
      weight: 12,
      description: "Bloco de concreto para alvenaria estrutural"
    },
    {
      id: 9,
      name: "Brita 1",
      price: 55.00,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Areias e Britas",
      rating: 4.5,
      reviews: 89,
      inStock: true,
      weight: 50,
      description: "Brita 1 para concreto e pavimentação"
    },
    {
      id: 10,
      name: "Azulejo 20x30cm",
      price: 12.90,
      originalPrice: 16.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Pisos e Revestimentos",
      rating: 4.7,
      reviews: 145,
      inStock: true,
      isOnSale: true,
      weight: 8,
      description: "Azulejo 20x30cm para banheiros e cozinhas"
    },
    {
      id: 11,
      name: "Tinta Esmalte 3,6L",
      price: 45.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tintas e Acabamentos",
      rating: 4.2,
      reviews: 67,
      inStock: true,
      weight: 3.6,
      description: "Tinta esmalte 3,6L para metais e madeiras"
    },
    {
      id: 12,
      name: "Serra Circular",
      price: 180.00,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Ferramentas",
      rating: 4.8,
      reviews: 123,
      inStock: true,
      weight: 4.2,
      description: "Serra circular elétrica profissional"
    },
    {
      id: 13,
      name: "Martelo Demolidor",
      price: 250.00,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Ferramentas",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      weight: 8.5,
      description: "Martelo demolidor elétrico profissional"
    },
    {
      id: 14,
      name: "Tinta Acrílica 3,6L",
      price: 35.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tintas e Acabamentos",
      rating: 4.4,
      reviews: 156,
      inStock: true,
      weight: 3.6,
      description: "Tinta acrílica 3,6L para exteriores"
    },
    {
      id: 15,
      name: "Piso Laminado",
      price: 28.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Pisos e Revestimentos",
      rating: 4.3,
      reviews: 134,
      inStock: true,
      weight: 12,
      description: "Piso laminado resistente à umidade"
    },
    {
      id: 16,
      name: "Cabo de Aço",
      price: 12.50,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Ferramentas",
      rating: 4.1,
      reviews: 67,
      inStock: true,
      weight: 1.2,
      description: "Cabo de aço galvanizado 6mm"
    },
    {
      id: 17,
      name: "Tinta Primer 18L",
      price: 75.00,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tintas e Acabamentos",
      rating: 4.5,
      reviews: 98,
      inStock: true,
      weight: 18,
      description: "Tinta primer 18L para preparação"
    },
    {
      id: 18,
      name: "Telha Cerâmica",
      price: 2.80,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tijolos e Blocos",
      rating: 4.7,
      reviews: 145,
      inStock: true,
      weight: 3.2,
      description: "Telha cerâmica colonial"
    },
    {
      id: 19,
      name: "Parafuso 6x100mm",
      price: 0.15,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Ferramentas",
      rating: 4.2,
      reviews: 78,
      inStock: true,
      weight: 0.05,
      description: "Parafuso galvanizado 6x100mm"
    },
    {
      id: 20,
      name: "Massa Corrida 18L",
      price: 45.90,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "Tintas e Acabamentos",
      rating: 4.6,
      reviews: 112,
      inStock: true,
      weight: 18,
      description: "Massa corrida 18L para acabamento"
    }
  ];

  // Categorias únicas
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, selectedCategory, searchTerm, sortBy]);

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Funções de edição
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    // Em uma aplicação real, aqui seria feita a chamada para a API
    console.log('Produto atualizado:', updatedProduct);
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      // Em uma aplicação real, aqui seria feita a chamada para a API
      console.log('Produto excluído:', productId);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header da página */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Produtos</h1>
          <p className="text-sm md:text-base text-slate-600">Encontre os melhores materiais de construção</p>
        </div>

        {/* Filtros e busca */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6 mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            {/* Busca */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm md:text-base"
                />
              </div>
            </div>

            {/* Filtro por categoria */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              >
                <option value="">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenação */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              >
                <option value="name">Nome A-Z</option>
                <option value="price">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="rating">Melhor avaliado</option>
              </select>
            </div>
          </div>

          {/* Controles de visualização */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-slate-200 space-y-3 sm:space-y-0">
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-slate-600">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                {totalPages > 1 && (
                  <span className="ml-2 text-blue-600">
                    (Página {currentPage} de {totalPages})
                  </span>
                )}
              </span>
              {selectedCategory && (
                <Badge variant="secondary" className="text-xs">
                  {selectedCategory}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-slate-600">Visualizar:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 md:h-9 md:w-9 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 md:h-9 md:w-9 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

                {/* Lista de produtos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Search className="h-10 w-10 md:h-12 md:w-12 text-slate-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3 md:mb-4">Nenhum produto encontrado</h2>
            <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8">Tente ajustar os filtros ou termos de busca</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" : "space-y-3 md:space-y-4"}>
            {paginatedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className={viewMode === "grid" ? "" : "flex"}>
                    {/* Imagem do produto */}
                    <div className={`relative ${viewMode === "grid" ? "aspect-square" : "w-48 h-32"} overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && (
                          <Badge className="bg-green-500 text-white text-xs group-hover:scale-110 transition-transform duration-300">
                            Novo
                          </Badge>
                        )}
                        {product.isOnSale && (
                          <Badge className="bg-red-500 text-white text-xs group-hover:scale-110 transition-transform duration-300">
                            Oferta
                          </Badge>
                        )}
                      </div>

                      {/* Botões de ação */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="h-7 w-7 md:h-8 md:w-8 p-0"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="h-7 w-7 md:h-8 md:w-8 p-0"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-7 w-7 md:h-8 md:w-8 p-0">
                          <Heart className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-7 w-7 md:h-8 md:w-8 p-0">
                          <Eye className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Informações do produto */}
                    <div className={`p-3 md:p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs mb-2">
                          {product.category}
                        </Badge>
                        <Link to={`/produto/${product.id}`}>
                          <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors duration-300 text-sm md:text-base group-hover:scale-105 transition-transform duration-300">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      {/* Avaliação */}
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-xs md:text-sm text-slate-600">({product.reviews})</span>
                      </div>

                      {/* Preço */}
                      <div className="mb-3">
                        {product.originalPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-base md:text-lg font-bold text-blue-600 group-hover:scale-105 transition-transform duration-300">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-xs md:text-sm text-slate-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-base md:text-lg font-bold text-blue-600 group-hover:scale-105 transition-transform duration-300">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>

                      {/* Botão de adicionar ao carrinho */}
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm group-hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                          disabled={!product.inStock}
                          onClick={() => addToCart({
                            id: product.id.toString(),
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.image,
                            category: product.category
                          })}
                        >
                          <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 group-hover:rotate-12 transition-transform duration-300" />
                          {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
                        </Button>
                        <Link to={`/produto/${product.id}`}>
                          <Button variant="outline" size="sm" className="h-8 w-8 md:h-9 md:w-9 p-0 group-hover:scale-110 transition-transform duration-300">
                            <Eye className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Próxima
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>

      <Footer />

      {/* Modal de Edição de Produto */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Editar Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Nome</label>
                <Input
                  defaultValue={editingProduct.name}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Preço</label>
                <Input
                  type="number"
                  step="0.01"
                  defaultValue={editingProduct.price}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Categoria</label>
                <select
                  defaultValue={editingProduct.category}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Descrição</label>
                <textarea
                  defaultValue={editingProduct.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setIsEditModalOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleSaveProduct(editingProduct)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Produtos;
