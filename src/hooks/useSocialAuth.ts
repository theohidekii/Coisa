import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

interface SocialUserData {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  addresses: any[];
}

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const { toast } = useToast();

  const handleGoogleLogin = async (response: any) => {
    setIsLoading(true);
    
    try {
      // Decodificar o token JWT do Google
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));
      
      const userData: SocialUserData = {
        id: decoded.sub,
        nome: decoded.name,
        email: decoded.email,
        telefone: "(11) 99999-9999", // Valor padrão
        cpf: "123.456.789-00", // Valor padrão
        addresses: []
      };

      setUserData(userData);
      
      toast({
        title: "Login com Google realizado com sucesso!",
        description: `Bem-vindo, ${userData.nome}!`,
      });
      
      navigate('/');
    } catch (error) {
      console.error('Erro no login Google:', error);
      toast({
        title: "Erro no login com Google",
        description: "Não foi possível fazer login. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async (response: any) => {
    setIsLoading(true);
    
    try {
      // Obter dados do usuário do Facebook
      const userData: SocialUserData = {
        id: response.userID,
        nome: response.name,
        email: response.email,
        telefone: "(11) 99999-9999", // Valor padrão
        cpf: "123.456.789-00", // Valor padrão
        addresses: []
      };

      setUserData(userData);
      
      toast({
        title: "Login com Facebook realizado com sucesso!",
        description: `Bem-vindo, ${userData.nome}!`,
      });
      
      navigate('/');
    } catch (error) {
      console.error('Erro no login Facebook:', error);
      toast({
        title: "Erro no login com Facebook",
        description: "Não foi possível fazer login. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialError = (error: any) => {
    console.error('Erro no login social:', error);
    toast({
      title: "Erro no login social",
      description: "Não foi possível fazer login. Tente novamente.",
      variant: "destructive",
    });
    setIsLoading(false);
  };

  return {
    isLoading,
    handleGoogleLogin,
    handleFacebookLogin,
    handleSocialError
  };
};
