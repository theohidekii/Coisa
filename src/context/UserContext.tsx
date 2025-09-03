import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserAddress {
  id: string;
  name: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  isDefault: boolean;
}

interface UserData {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  addresses: UserAddress[];
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateUserInfo: (info: Partial<UserData>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simular dados do usuário (em produção, viria do banco de dados)
  useEffect(() => {
    // Simular carregamento dos dados do usuário
    setTimeout(() => {
      const mockUserData: UserData = {
        id: "1",
        nome: "João Silva",
        email: "joao.silva@email.com",
        telefone: "(11) 99999-9999",
        cpf: "123.456.789-00",
        addresses: [
          {
            id: "1",
            name: "Casa",
            cep: "09130-410",
            logradouro: "Av. Dom Pedro I",
            numero: "2275",
            complemento: "Apto 101",
            bairro: "Vila Vitória",
            localidade: "Santo André",
            uf: "SP",
            isDefault: true
          },
          {
            id: "2",
            name: "Trabalho",
            cep: "01310-100",
            logradouro: "Av. Paulista",
            numero: "1000",
            bairro: "Bela Vista",
            localidade: "São Paulo",
            uf: "SP",
            isDefault: false
          }
        ]
      };
      setUserData(mockUserData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const addAddress = (address: Omit<UserAddress, 'id'>) => {
    if (!userData) return;
    
    const newAddress: UserAddress = {
      ...address,
      id: Date.now().toString(),
      isDefault: userData.addresses.length === 0
    };

    setUserData({
      ...userData,
      addresses: [...userData.addresses, newAddress]
    });
  };

  const removeAddress = (id: string) => {
    if (!userData) return;
    
    const updatedAddresses = userData.addresses.filter(addr => addr.id !== id);
    
    // Se o endereço removido era o padrão, definir o primeiro como padrão
    const wasDefault = userData.addresses.find(addr => addr.id === id)?.isDefault;
    if (wasDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    setUserData({
      ...userData,
      addresses: updatedAddresses
    });
  };

  const setDefaultAddress = (id: string) => {
    if (!userData) return;
    
    const updatedAddresses = userData.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));

    setUserData({
      ...userData,
      addresses: updatedAddresses
    });
  };

  const updateUserInfo = (info: Partial<UserData>) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      ...info
    });
  };

  const value: UserContextType = {
    userData,
    setUserData,
    addAddress,
    removeAddress,
    setDefaultAddress,
    updateUserInfo,
    isLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
