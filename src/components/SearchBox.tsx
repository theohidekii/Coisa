import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox = ({ onSearch, placeholder = "Buscar produtos...", className = "" }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Dados simulados dos produtos (em produção viria de uma API)
  const allProducts: Product[] = [
    { id: 1, name: "Cimento Portland CP-II 50kg", price: 25.90, image: "/placeholder.svg", category: "Cimentos e Argamassas" },
    { id: 2, name: "Tijolo Cerâmico 6 Furos", price: 0.85, image: "/placeholder.svg", category: "Tijolos e Blocos" },
    { id: 3, name: "Areia Média Lavada", price: 45.00, image: "/placeholder.svg", category: "Areias e Britas" },
    { id: 4, name: "Porcelanato 60x60cm", price: 35.90, image: "/placeholder.svg", category: "Pisos e Revestimentos" },
    { id: 5, name: "Tinta Branca 18L", price: 89.90, image: "/placeholder.svg", category: "Tintas e Acabamentos" },
    { id: 6, name: "Furadeira 13mm", price: 120.00, image: "/placeholder.svg", category: "Ferramentas" },
    { id: 7, name: "Argamassa Colante", price: 15.90, image: "/placeholder.svg", category: "Cimentos e Argamassas" },
    { id: 8, name: "Bloco de Concreto 14x19x39cm", price: 1.20, image: "/placeholder.svg", category: "Tijolos e Blocos" },
    { id: 9, name: "Brita 1", price: 55.00, image: "/placeholder.svg", category: "Areias e Britas" },
    { id: 10, name: "Azulejo 20x30cm", price: 12.90, image: "/placeholder.svg", category: "Pisos e Revestimentos" },
    { id: 11, name: "Tinta Esmalte 3,6L", price: 45.90, image: "/placeholder.svg", category: "Tintas e Acabamentos" },
    { id: 12, name: "Serra Circular", price: 180.00, image: "/placeholder.svg", category: "Ferramentas" },
  ];

  // Filtrar produtos baseado na query
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6); // Limitar a 6 sugestões

    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [query]);

  // Fechar sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setQuery(product.name);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(product.name);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border-0">
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <span className="text-sm font-semibold text-blue-600">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Link para ver todos os resultados */}
            <div className="p-3 border-t border-slate-100 bg-slate-50">
              <Link
                to={`/produtos?search=${encodeURIComponent(query)}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => setShowSuggestions(false)}
              >
                Ver todos os resultados para "{query}"
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensagem quando não há resultados */}
      {showSuggestions && query.trim().length > 0 && suggestions.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border-0">
          <CardContent className="p-4 text-center">
            <p className="text-slate-600">Nenhum produto encontrado para "{query}"</p>
            <p className="text-sm text-slate-500 mt-1">Tente outros termos de busca</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBox;
