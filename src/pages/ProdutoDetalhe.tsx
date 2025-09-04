import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
  CheckCircle,
  Package,
  Clock,
  MapPin
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductReview from "@/components/ProductReview";
import { useProductReviews } from "@/hooks/useProductReviews";

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Hook para gerenciar avaliações
  const { 
    reviews, 
    averageRating, 
    totalReviews, 
    userHasPurchased, 
    isLoading: reviewsLoading, 
    addReview 
  } = useProductReviews(id || '1');

  // Dados simulados do produto
  const product = {
    id: 1,
    name: "Cimento Portland CP-II 50kg",
    price: 25.90,
    originalPrice: 29.90,
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=600&fit=crop"
    ],
    category: "Cimentos e Argamassas",
    rating: averageRating, // Usar rating real das avaliações
    reviews: totalReviews, // Usar número real de avaliações
    inStock: true,
    isNew: true,
    isOnSale: true,
    weight: 50,
    description: "Cimento Portland CP-II ideal para construções em geral. Produto de alta qualidade, resistente e durável para suas obras.",
    specifications: {
      "Tipo": "CP-II",
      "Peso": "50kg",
      "Aplicação": "Construção civil",
      "Tempo de pega": "2-3 horas",
      "Resistência": "32 MPa"
    },
    features: [
      "Alta resistência à compressão",
      "Baixa permeabilidade",
      "Excelente trabalhabilidade",
      "Adequado para estruturas",
      "Certificado pela ABNT"
    ],
    delivery: {
      estimated: "2-3 dias úteis",
      freeShipping: "Acima de R$ 150,00",
      pickup: "Disponível na loja"
    }
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

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 mb-4 md:mb-6">
          <Link to="/" className="hover:text-blue-600">Início</Link>
          <span>/</span>
          <Link to="/produtos" className="hover:text-blue-600">Produtos</Link>
          <span>/</span>
          <Link to={`/produtos?category=${product.category}`} className="hover:text-blue-600">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Galeria de Imagens */}
          <div className="space-y-3 md:space-y-4">
            {/* Imagem Principal */}
            <div className="aspect-square bg-white rounded-lg border border-slate-200 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === index 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            {/* Categoria e Badges */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              {product.isNew && (
                <Badge className="bg-green-500 text-white text-xs">
                  Novo
                </Badge>
              )}
              {product.isOnSale && (
                <Badge className="bg-red-500 text-white text-xs">
                  Oferta
                </Badge>
              )}
            </div>

            {/* Nome do Produto */}
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Avaliação */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-slate-600">
                {product.rating.toFixed(1)} ({product.reviews} avaliação{product.reviews !== 1 ? 'ões' : ''})
              </span>
            </div>

                        {/* Preço */}
            <div className="space-y-2">
              {product.originalPrice ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-base md:text-lg text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="bg-red-500 text-white text-xs">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              ) : (
                <span className="text-2xl md:text-3xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Descrição */}
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantidade */}
            <div className="space-y-2 md:space-y-3">
              <label className="text-xs md:text-sm font-medium text-slate-700">Quantidade:</label>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                    className="h-8 w-8 md:h-10 md:w-10 p-0"
                  >
                    <Minus className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <span className="px-3 md:px-4 py-2 min-w-[50px] md:min-w-[60px] text-center font-medium text-sm md:text-base">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange('increase')}
                    className="h-8 w-8 md:h-10 md:w-10 p-0"
                  >
                    <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
                <span className="text-xs md:text-sm text-slate-600">
                  {product.weight * quantity}kg total
                </span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 md:h-12 text-sm md:text-base"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 md:h-12 md:w-12"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              
              <Button variant="outline" size="icon" className="h-10 w-10 md:h-12 md:w-12">
                <Share2 className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            {/* Informações de Entrega */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <Truck className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800 text-sm md:text-base">Informações de Entrega</span>
                </div>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    <span>Entrega estimada: {product.delivery.estimated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                    <span>Frete grátis: {product.delivery.freeShipping}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    <span>Retirada na loja: {product.delivery.pickup}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Abas de Informações */}
        <div className="space-y-6 md:space-y-8">
          {/* Especificações */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3 md:mb-4">Especificações Técnicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-700 text-sm md:text-base">{key}:</span>
                    <span className="text-slate-600 text-sm md:text-base">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Características */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3 md:mb-4">Características Principais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                    <span className="text-slate-700 text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Avaliações */}
          <ProductReview
            productId={id || '1'}
            productName={product.name}
            reviews={reviews}
            userHasPurchased={userHasPurchased}
            onReviewSubmit={addReview}
          />

          {/* Garantias */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3 md:mb-4">Garantias e Suporte</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="flex items-start gap-2 md:gap-3">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-600 mt-0.5 md:mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Garantia de Qualidade</h4>
                    <p className="text-xs md:text-sm text-slate-600">Produto com garantia de fábrica</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <RotateCcw className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mt-0.5 md:mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Troca e Devolução</h4>
                    <p className="text-xs md:text-sm text-slate-600">7 dias para troca ou devolução</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <Package className="h-5 w-5 md:h-6 md:w-6 text-orange-600 mt-0.5 md:mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Entrega Segura</h4>
                    <p className="text-xs md:text-sm text-slate-600">Produto embalado com segurança</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProdutoDetalhe;
