import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, Star, ShoppingCart, Heart, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";

const Ofertas = () => {
  const { addToCart, addToFavorites, isFavorite, removeFromFavorites } = useCart();
  // Dados simulados de produtos em oferta
  const ofertas = [
    {
      id: 1,
      name: "Furadeira de Impacto 13mm",
      originalPrice: 299.90,
      salePrice: 199.90,
      discount: 33,
      image: "/placeholder.svg",
      category: "Ferramentas",
      rating: 4.5,
      reviews: 128,
      badge: "Oferta Relâmpago",
      endTime: "2024-12-31T23:59:59"
    },
    {
      id: 2,
      name: "Tinta Acrílica 18L Branca",
      originalPrice: 89.90,
      salePrice: 59.90,
      discount: 33,
      image: "/placeholder.svg",
      category: "Tintas",
      rating: 4.8,
      reviews: 256,
      badge: "Mais Vendido",
      endTime: "2024-12-31T23:59:59"
    },
    {
      id: 3,
      name: "Serra Circular 1400W",
      originalPrice: 459.90,
      salePrice: 329.90,
      discount: 28,
      image: "/placeholder.svg",
      category: "Ferramentas",
      rating: 4.6,
      reviews: 89,
      badge: "Oferta Especial",
      endTime: "2024-12-31T23:59:59"
    },
    {
      id: 4,
      name: "Piso Porcelanato 60x60cm",
      originalPrice: 45.90,
      salePrice: 32.90,
      discount: 28,
      image: "/placeholder.svg",
      category: "Pisos",
      rating: 4.7,
      reviews: 156,
      badge: "Promoção",
      endTime: "2024-12-31T23:59:59"
    },
    {
      id: 5,
      name: "Fio Elétrico 2.5mm 100m",
      originalPrice: 129.90,
      salePrice: 89.90,
      discount: 31,
      image: "/placeholder.svg",
      category: "Material Elétrico",
      rating: 4.4,
      reviews: 203,
      badge: "Oferta Relâmpago",
      endTime: "2024-12-31T23:59:59"
    },
    {
      id: 6,
      name: "Torneira de Cozinha",
      originalPrice: 159.90,
      salePrice: 119.90,
      discount: 25,
      image: "/placeholder.svg",
      category: "Material Hidráulico",
      rating: 4.3,
      reviews: 78,
      badge: "Promoção",
      endTime: "2024-12-31T23:59:59"
    },
    {
      id: 7,
      name: "Cimento CP-II 50kg",
      originalPrice: 24.90,
      salePrice: 18.90,
      discount: 24,
      image: "/placeholder.svg",
      category: "Cimentos",
      rating: 4.9,
      reviews: 342,
      badge: "Mais Vendido",
      endTime: "2024-12-31T23:59:59"
    },
    {
      id: 8,
      name: "Lixadeira Orbital 5\"",
      originalPrice: 189.90,
      salePrice: 139.90,
      discount: 26,
      image: "/placeholder.svg",
      category: "Ferramentas",
      rating: 4.2,
      reviews: 67,
      badge: "Oferta Especial",
      endTime: "2024-12-31T23:59:59"
    }
  ];

  const categories = [
    "Todas as Categorias",
    "Ferramentas",
    "Tintas",
    "Pisos",
    "Material Elétrico",
    "Material Hidráulico",
    "Cimentos"
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatTimeLeft = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Oferta encerrada";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
             {/* Hero Section */}
       <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white">
         <div className="absolute inset-0 bg-black/20"></div>
         <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
           <div className="max-w-4xl mx-auto text-center">
             <div className="flex items-center justify-center mb-4">
               <Tag className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3" />
               <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
                 Ofertas Especiais
               </h1>
             </div>
             <p className="text-lg md:text-xl lg:text-2xl text-red-100 mb-6 md:mb-8">
               Produtos selecionados com descontos imperdíveis!
             </p>
             <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
               <div className="flex items-center space-x-2">
                 <Clock className="h-4 w-4 md:h-5 md:w-5" />
                 <span className="text-sm md:text-base">Ofertas por tempo limitado</span>
               </div>
               <div className="flex items-center space-x-2">
                 <Star className="h-4 w-4 md:h-5 md:w-5" />
                 <span className="text-sm md:text-base">Produtos de qualidade</span>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Filtros e Busca */}
       <section className="py-6 md:py-8 bg-gray-50">
         <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row gap-3 md:gap-4">
               {/* Busca */}
               <div className="flex-1">
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                   <Input
                     placeholder="Buscar produtos em oferta..."
                     className="pl-10"
                   />
                 </div>
               </div>
               
               {/* Filtro de Categoria */}
               <div className="w-full md:w-64">
                 <Select>
                   <SelectTrigger>
                     <SelectValue placeholder="Categoria" />
                   </SelectTrigger>
                   <SelectContent>
                     {categories.map((category) => (
                       <SelectItem key={category} value={category}>
                         {category}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               
               {/* Filtro de Desconto */}
               <div className="w-full md:w-48">
                 <Select>
                   <SelectTrigger>
                     <SelectValue placeholder="Desconto" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="all">Todos</SelectItem>
                     <SelectItem value="20+">20% ou mais</SelectItem>
                     <SelectItem value="30+">30% ou mais</SelectItem>
                     <SelectItem value="40+">40% ou mais</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               
               {/* Botão de Filtros */}
               <Button variant="outline" className="w-full md:w-auto">
                 <Filter className="h-4 w-4 mr-2" />
                 Mais Filtros
               </Button>
             </div>
           </div>
         </div>
       </section>

             {/* Produtos em Oferta */}
       <section className="py-8 md:py-12">
         <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-6xl mx-auto">
             {/* Header da seção */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
               <div>
                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                   Produtos em Oferta
                 </h2>
                 <p className="text-sm md:text-base text-gray-600">
                   {ofertas.length} produtos encontrados
                 </p>
               </div>
               <div className="flex items-center space-x-2 w-full md:w-auto">
                 <span className="text-sm text-gray-600">Ordenar por:</span>
                 <Select>
                   <SelectTrigger className="w-full md:w-48">
                     <SelectValue placeholder="Relevância" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="relevance">Relevância</SelectItem>
                     <SelectItem value="price-low">Menor Preço</SelectItem>
                     <SelectItem value="price-high">Maior Preço</SelectItem>
                     <SelectItem value="discount">Maior Desconto</SelectItem>
                     <SelectItem value="rating">Melhor Avaliação</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>

             {/* Grid de Produtos */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
               {ofertas.map((produto) => (
                 <Card key={produto.id} className="group hover:shadow-lg transition-all duration-300">
                   <CardHeader className="p-3 md:p-4 pb-2">
                     <div className="relative">
                       <img
                         src={produto.image}
                         alt={produto.name}
                         className="w-full h-40 md:h-48 object-cover rounded-lg"
                       />
                       <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">
                         {produto.badge}
                       </Badge>
                       <Badge className="absolute top-2 right-2 bg-green-600 text-white text-xs">
                         -{produto.discount}%
                       </Badge>
                       <Button
                         variant="ghost"
                         size="icon"
                         className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                         onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           if (isFavorite(produto.id.toString())) {
                             removeFromFavorites(produto.id.toString());
                           } else {
                             addToFavorites({
                               id: produto.id.toString(),
                               name: produto.name,
                               price: produto.salePrice,
                               originalPrice: produto.originalPrice,
                               image: produto.image,
                               category: produto.category
                             });
                           }
                         }}
                       >
                         <Heart className={`h-4 w-4 ${isFavorite(produto.id.toString()) ? 'fill-red-500 text-red-500' : ''}`} />
                       </Button>
                     </div>
                   </CardHeader>
                   
                   <CardContent className="p-3 md:p-4 pt-2">
                     <div className="space-y-2 md:space-y-3">
                       {/* Categoria */}
                       <div className="text-xs text-gray-500 uppercase tracking-wide">
                         {produto.category}
                       </div>
                       
                       {/* Nome do Produto */}
                       <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm md:text-base">
                         {produto.name}
                       </h3>
                       
                       {/* Avaliação */}
                       <div className="flex items-center space-x-1">
                         <div className="flex">
                           {[...Array(5)].map((_, i) => (
                             <Star
                               key={i}
                               className={`h-3 w-3 ${
                                 i < Math.floor(produto.rating)
                                   ? "text-yellow-400 fill-current"
                                   : "text-gray-300"
                               }`}
                             />
                           ))}
                         </div>
                         <span className="text-xs text-gray-600">
                           ({produto.reviews})
                         </span>
                       </div>
                       
                       {/* Preços */}
                       <div className="space-y-1">
                         <div className="flex items-center space-x-2">
                           <span className="text-base md:text-lg font-bold text-red-600">
                             {formatPrice(produto.salePrice)}
                           </span>
                           <span className="text-xs md:text-sm text-gray-500 line-through">
                             {formatPrice(produto.originalPrice)}
                           </span>
                         </div>
                         <div className="text-xs text-gray-600">
                           Economia de {formatPrice(produto.originalPrice - produto.salePrice)}
                         </div>
                       </div>
                       
                       {/* Tempo Restante */}
                       <div className="flex items-center space-x-1 text-xs text-orange-600">
                         <Clock className="h-3 w-3" />
                         <span>{formatTimeLeft(produto.endTime)}</span>
                       </div>
                       
                       {/* Botões */}
                       <div className="flex space-x-2 pt-2">
                         <Button 
                           className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm"
                           onClick={() => addToCart({
                             id: produto.id.toString(),
                             name: produto.name,
                             price: produto.salePrice,
                             originalPrice: produto.originalPrice,
                             image: produto.image,
                             category: produto.category
                           })}
                         >
                           <ShoppingCart className="h-4 w-4 mr-2" />
                           Comprar
                         </Button>
                         <Button 
                           variant="outline" 
                           size="icon"
                           onClick={() => {
                             if (isFavorite(produto.id.toString())) {
                               removeFromFavorites(produto.id.toString());
                             } else {
                               addToFavorites({
                                 id: produto.id.toString(),
                                 name: produto.name,
                                 price: produto.salePrice,
                                 originalPrice: produto.originalPrice,
                                 image: produto.image,
                                 category: produto.category
                               });
                             }
                           }}
                         >
                           <Heart className={`h-4 w-4 ${isFavorite(produto.id.toString()) ? 'fill-red-500 text-red-500' : ''}`} />
                         </Button>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               ))}
             </div>

            {/* Paginação */}
            <div className="flex justify-center mt-8 md:mt-12">
              <div className="flex items-center space-x-1 md:space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Próxima
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner de Ofertas Relâmpago */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Ofertas Relâmpago
              </h2>
            </div>
            <p className="text-base md:text-xl mb-6 md:mb-8">
              Produtos com descontos especiais por tempo limitado!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white/10 p-4 md:p-6 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold mb-2">24h</div>
                <div className="text-xs md:text-sm">Restantes</div>
              </div>
              <div className="bg-white/10 p-4 md:p-6 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold mb-2">50+</div>
                <div className="text-xs md:text-sm">Produtos</div>
              </div>
              <div className="bg-white/10 p-4 md:p-6 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold mb-2">70%</div>
                <div className="text-xs md:text-sm">Desconto Máximo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Não perca nenhuma oferta!
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Cadastre-se para receber as melhores ofertas e promoções em primeira mão.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Input
                placeholder="Seu melhor e-mail"
                className="flex-1"
                type="email"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-sm md:text-base">
                Cadastrar
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 md:mt-4">
              Prometemos não enviar spam. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ofertas;
