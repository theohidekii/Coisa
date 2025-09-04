import { useState } from "react";
import { Home, Package, Heart, ShoppingCart, User, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const BottomNavigation = () => {
  const location = useLocation();
  const { getCartItemCount, getFavoriteCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Início",
      icon: Home,
      href: "/",
      badge: null
    },
    {
      name: "Produtos",
      icon: Package,
      href: "/produtos",
      badge: null
    },
    {
      name: "Ofertas",
      icon: Package,
      href: "/ofertas",
      badge: null
    },
    {
      name: "Favoritos",
      icon: Heart,
      href: "/desejos",
      badge: getFavoriteCount()
    },
    {
      name: "Carrinho",
      icon: ShoppingCart,
      href: "/carrinho",
      badge: getCartItemCount()
    }
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden shadow-lg">
        <div className="flex items-center justify-around py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center w-full py-1.5 px-0.5 transition-all duration-200 ${
                  isActive 
                    ? "text-blue-600 scale-105" 
                    : "text-gray-600 hover:text-blue-600 hover:scale-105"
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-0.5 font-medium leading-tight">{item.name}</span>
              </Link>
            );
          })}
          
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center w-full py-1.5 px-0.5 transition-all duration-200 ${
              isMenuOpen 
                ? "text-blue-600 scale-105" 
                : "text-gray-600 hover:text-blue-600 hover:scale-105"
            }`}
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-0.5 font-medium leading-tight">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden animate-in fade-in duration-200">
          <div className="absolute bottom-20 left-3 right-3 bg-white rounded-xl shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-4 duration-200">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Menu Rápido</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                <Link 
                  to="/minha-conta" 
                  className="flex items-center space-x-3 p-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Minha Conta</span>
                </Link>
                
                <Link 
                  to="/meus-pedidos" 
                  className="flex items-center space-x-3 p-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  <span>Meus Pedidos</span>
                </Link>
                
                <Link 
                  to="/assistencia" 
                  className="flex items-center space-x-3 p-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  <span>Assistência Técnica</span>
                </Link>
                
                <Link 
                  to="/entrega" 
                  className="flex items-center space-x-3 p-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  <span>Informações de Entrega</span>
                </Link>
                
                <Link 
                  to="/sobre-nos" 
                  className="flex items-center space-x-3 p-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Sobre Nós</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Spacer for Mobile */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default BottomNavigation;
