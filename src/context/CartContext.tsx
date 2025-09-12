import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUser } from './UserContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
  weightKg?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
}

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  addedAt: Date;
}

interface CartContextType {
  // Carrinho
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  // Favoritos
  favoriteItems: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  getFavoriteCount: () => number;
  
  // Sincronização
  syncWithUser: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, isLoggedIn } = useUser();

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Sincronizar com o usuário quando ele fizer login
  useEffect(() => {
    if (isLoggedIn && user) {
      syncWithUser();
    }
  }, [isLoggedIn, user]);

  const loadFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('coisa_cart_items');
      const savedFavorites = localStorage.getItem('coisa_favorite_items');
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Converter strings de data de volta para objetos Date
        const favoritesWithDates = parsedFavorites.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setFavoriteItems(favoritesWithDates);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
    }
  };

  const saveToLocalStorage = (cart: CartItem[], favorites: FavoriteItem[]) => {
    try {
      localStorage.setItem('coisa_cart_items', JSON.stringify(cart));
      localStorage.setItem('coisa_favorite_items', JSON.stringify(favorites));
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        const updatedItems = prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        saveToLocalStorage(updatedItems, favoriteItems);
        toast({
          title: "Quantidade atualizada!",
          description: `${item.name} agora tem ${existingItem.quantity + 1} unidades no carrinho.`,
        });
        return updatedItems;
      } else {
        // Se é um novo item, adiciona com quantidade 1
        const newItems = [...prevItems, { ...item, quantity: 1 }];
        saveToLocalStorage(newItems, favoriteItems);
        toast({
          title: "Item adicionado!",
          description: `${item.name} foi adicionado ao carrinho.`,
        });
        return newItems;
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      const newItems = prevItems.filter(item => item.id !== itemId);
      saveToLocalStorage(newItems, favoriteItems);
      
      if (itemToRemove) {
        toast({
          title: "Item removido!",
          description: `${itemToRemove.name} foi removido do carrinho.`,
        });
      }
      
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveToLocalStorage(updatedItems, favoriteItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    saveToLocalStorage([], favoriteItems);
    toast({
      title: "Carrinho limpo!",
      description: "Todos os itens foram removidos do carrinho.",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.originalPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    setFavoriteItems(prevItems => {
      const existingItem = prevItems.find(favItem => favItem.id === item.id);
      
      if (existingItem) {
        toast({
          title: "Item já favoritado!",
          description: `${item.name} já está na sua lista de favoritos.`,
        });
        return prevItems;
      } else {
        const newItem = { ...item, addedAt: new Date() };
        const newItems = [...prevItems, newItem];
        saveToLocalStorage(cartItems, newItems);
        toast({
          title: "Adicionado aos favoritos!",
          description: `${item.name} foi adicionado à sua lista de favoritos.`,
        });
        return newItems;
      }
    });
  };

  const removeFromFavorites = (itemId: string) => {
    setFavoriteItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      const newItems = prevItems.filter(item => item.id !== itemId);
      saveToLocalStorage(cartItems, newItems);
      
      if (itemToRemove) {
        toast({
          title: "Removido dos favoritos!",
          description: `${itemToRemove.name} foi removido da sua lista de favoritos.`,
        });
      }
      
      return newItems;
    });
  };

  const isFavorite = (itemId: string) => {
    return favoriteItems.some(item => item.id === itemId);
  };

  const getFavoriteCount = () => {
    return favoriteItems.length;
  };

  const syncWithUser = async () => {
    if (!isLoggedIn || !user) return;

    setIsLoading(true);
    
    try {
      // Simular chamada à API para sincronizar dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você faria a chamada real para a API
      // const response = await api.post('/sync-cart', {
      //   userId: user.id,
      //   cartItems,
      //   favoriteItems
      // });
      
      // Por enquanto, vamos simular que a sincronização foi bem-sucedida
      console.log('Sincronizando dados com o usuário:', {
        userId: user.id,
        cartItems,
        favoriteItems
      });
      
      toast({
        title: "Dados sincronizados!",
        description: "Seus itens foram sincronizados com sua conta.",
      });
      
    } catch (error) {
      console.error('Erro ao sincronizar dados:', error);
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoriteCount,
    syncWithUser,
    isLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
