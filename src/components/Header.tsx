import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, User, Search, Package, Heart, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import SearchBox from "./SearchBox";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const { getCartItemCount, getFavoriteCount } = useCart();
  const { userData } = useUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { name: "Início", href: "/" },
    { name: "Produtos", href: "/produtos" },
    { name: "Assistência Técnica", href: "/assistencia" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 ml-2 md:ml-4">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="Coisa" 
                className="h-8 md:h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <SearchBox 
              onSearch={(query) => {
                // Redirecionar para a página de produtos com a busca
                window.location.href = `/produtos?search=${encodeURIComponent(query)}`;
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-100"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </a>
              ) : (
                <Link key={item.name} to={item.href} className="text-foreground hover:text-primary transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-100">
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* User Dropdown - Desktop */}
            <div className="relative hidden md:block" ref={userDropdownRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="relative"
              >
                <User className="h-5 w-5" />
              </Button>
              
              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {userData ? `Olá, ${userData.nome.split(' ')[0]}` : 'Olá, visitante'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {userData ? 'Sua conta' : 'Entrar ou Cadastrar'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="p-2">
                    {userData ? (
                      <>
                        <Link to="/minha-conta" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <span>Minha Conta</span>
                        </Link>
                        
                        <Link to="/meus-pedidos" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Package className="h-4 w-4 text-gray-600" />
                          </div>
                          <span>Meus Pedidos</span>
                        </Link>
                        
                        <Link to="/desejos" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Heart className="h-4 w-4 text-gray-600" />
                          </div>
                          <span>Desejos</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <LogIn className="h-4 w-4 text-blue-600" />
                          </div>
                          <span>Entrar / Cadastrar</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Favoritos - Mobile Only */}
            <Link to="/desejos" className="md:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {getFavoriteCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getFavoriteCount() > 99 ? '99+' : getFavoriteCount()}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getCartItemCount() > 99 ? '99+' : getCartItemCount()}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white">
            {/* Search Bar - Mobile */}
            <div className="mb-6 px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar produtos..." 
                  className="pl-10 w-full"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const query = e.currentTarget.value;
                      if (query.trim()) {
                        window.location.href = `/produtos?search=${encodeURIComponent(query)}`;
                        setIsMenuOpen(false);
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* User Section - Mobile */}
            <div className="px-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Olá, visitante</p>
                  <p className="text-sm text-gray-500">Entrar ou Cadastrar</p>
                </div>
              </div>
            </div>

            {/* Navigation Items - Mobile */}
            <nav className="space-y-1 px-4 mb-6">
              <Link 
                to="/" 
                className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-base font-medium">Início</span>
              </Link>
              
              <Link 
                to="/produtos" 
                className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-base font-medium">Produtos</span>
              </Link>
              
              <Link 
                to="/assistencia" 
                className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-base font-medium">Assistência Técnica</span>
              </Link>
            </nav>

            {/* Account & Orders - Mobile Only */}
            <div className="px-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Minha Conta</h3>
              <div className="space-y-2">
                <Link 
                  to="/minha-conta" 
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="font-medium">Minha Conta</span>
                </Link>
                
                <Link 
                  to="/meus-pedidos" 
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="font-medium">Meus Pedidos</span>
                </Link>
              </div>
            </div>

            {/* Quick Actions - Mobile */}
            <div className="px-4 space-y-2">
              <Link 
                to="/desejos" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-gray-600" />
                </div>
                <span className="font-medium">Meus Favoritos</span>
                {getFavoriteCount() > 0 && (
                  <span className="ml-auto bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getFavoriteCount() > 99 ? '99+' : getFavoriteCount()}
                  </span>
                )}
              </Link>
              
              <Link 
                to="/carrinho" 
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-gray-600" />
                </div>
                <span className="font-medium">Carrinho</span>
                {getCartItemCount() > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getCartItemCount() > 99 ? '99+' : getCartItemCount()}
                  </span>
                )}
              </Link>
            </div>

            {/* Contact Info - Mobile */}
            <div className="mt-6 px-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 space-y-1">
                <p>📞 (11) 4453-0253</p>
                <p>📧 coisa@coisacomercio.com.br</p>
                <p>📍 Av. Dom Pedro I, 2275 - Vila Vitória</p>
                <p>🕒 Seg-Sex: 7h30-17h30 | Sáb e Feriados: 7h30-13h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;