import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ProductReview {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export const useProductReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userHasPurchased, setUserHasPurchased] = useState(false);
  const { userData } = useUser();

  // Simular dados de avaliações (em produção, viria da API)
  const mockReviews: Review[] = [
    {
      id: '1',
      userId: '1',
      userName: 'João Silva',
      rating: 5,
      comment: 'Excelente produto! A qualidade do cimento é superior ao que eu esperava. Recomendo fortemente para construções.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      userId: '2',
      userName: 'Maria Santos',
      rating: 4,
      comment: 'Bom produto, entrega rápida. O cimento tem boa resistência e trabalhabilidade.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: '3',
      userId: '3',
      userName: 'Pedro Costa',
      rating: 5,
      comment: 'Produto de primeira qualidade. Usei em uma reforma e ficou perfeito. Preço justo também.',
      date: '2024-01-05',
      verified: true
    },
    {
      id: '4',
      userId: '4',
      userName: 'Ana Oliveira',
      rating: 3,
      comment: 'Produto bom, mas a embalagem chegou um pouco danificada. O cimento em si está ok.',
      date: '2023-12-28',
      verified: true
    },
    {
      id: '5',
      userId: '5',
      userName: 'Carlos Ferreira',
      rating: 5,
      comment: 'Melhor cimento que já usei! Resistência incrível e secagem rápida. Valeu muito a pena.',
      date: '2023-12-20',
      verified: true
    }
  ];

  // Simular verificação se o usuário comprou o produto
  const mockUserPurchases = [
    { userId: '1', productId: '1' },
    { userId: '2', productId: '1' },
    { userId: '3', productId: '1' },
    { userId: '4', productId: '1' },
    { userId: '5', productId: '1' },
    // Adicione mais produtos conforme necessário
  ];

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      
      try {
        // Simular carregamento da API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filtrar avaliações para o produto específico
        const productReviews = mockReviews.filter(review => 
          review.userId !== userData?.id // Não mostrar avaliação do usuário atual se ele já avaliou
        );
        
        setReviews(productReviews);
        
        // Verificar se o usuário atual comprou este produto
        if (userData) {
          const hasPurchased = mockUserPurchases.some(
            purchase => purchase.userId === userData.id && purchase.productId === productId
          );
          setUserHasPurchased(hasPurchased);
        }
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [productId, userData]);

  const addReview = async (newReview: Omit<Review, 'id' | 'date' | 'verified'>) => {
    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const review: Review = {
        ...newReview,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        verified: true // Como o usuário comprou, é verificado
      };
      
      setReviews(prev => [review, ...prev]);
      
      return review;
    } catch (error) {
      console.error('Erro ao adicionar avaliação:', error);
      throw error;
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  const totalReviews = reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(review => review.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === star).length / reviews.length) * 100 
      : 0
  }));

  return {
    reviews,
    averageRating,
    totalReviews,
    ratingDistribution,
    userHasPurchased,
    isLoading,
    addReview
  };
};
