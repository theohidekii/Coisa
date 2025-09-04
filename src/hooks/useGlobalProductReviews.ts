import { useState, useEffect } from 'react';

export interface ProductReviewData {
  productId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
}

export const useGlobalProductReviews = () => {
  const [productReviews, setProductReviews] = useState<Record<string, ProductReviewData>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Dados simulados de avaliações globais
  const mockGlobalReviews: Record<string, ProductReviewData> = {
    '1': {
      productId: '1',
      averageRating: 4.5,
      totalReviews: 128,
      ratingDistribution: [
        { rating: 5, count: 65, percentage: 50.8 },
        { rating: 4, count: 35, percentage: 27.3 },
        { rating: 3, count: 20, percentage: 15.6 },
        { rating: 2, count: 5, percentage: 3.9 },
        { rating: 1, count: 3, percentage: 2.3 }
      ]
    },
    '2': {
      productId: '2',
      averageRating: 4.8,
      totalReviews: 89,
      ratingDistribution: [
        { rating: 5, count: 55, percentage: 61.8 },
        { rating: 4, count: 25, percentage: 28.1 },
        { rating: 3, count: 7, percentage: 7.9 },
        { rating: 2, count: 1, percentage: 1.1 },
        { rating: 1, count: 1, percentage: 1.1 }
      ]
    },
    '3': {
      productId: '3',
      averageRating: 4.7,
      totalReviews: 203,
      ratingDistribution: [
        { rating: 5, count: 120, percentage: 59.1 },
        { rating: 4, count: 55, percentage: 27.1 },
        { rating: 3, count: 20, percentage: 9.9 },
        { rating: 2, count: 5, percentage: 2.5 },
        { rating: 1, count: 3, percentage: 1.5 }
      ]
    },
    '4': {
      productId: '4',
      averageRating: 4.6,
      totalReviews: 67,
      ratingDistribution: [
        { rating: 5, count: 35, percentage: 52.2 },
        { rating: 4, count: 20, percentage: 29.9 },
        { rating: 3, count: 10, percentage: 14.9 },
        { rating: 2, count: 1, percentage: 1.5 },
        { rating: 1, count: 1, percentage: 1.5 }
      ]
    },
    '5': {
      productId: '5',
      averageRating: 4.8,
      totalReviews: 156,
      ratingDistribution: [
        { rating: 5, count: 95, percentage: 60.9 },
        { rating: 4, count: 40, percentage: 25.6 },
        { rating: 3, count: 15, percentage: 9.6 },
        { rating: 2, count: 4, percentage: 2.6 },
        { rating: 1, count: 2, percentage: 1.3 }
      ]
    },
    '6': {
      productId: '6',
      averageRating: 4.5,
      totalReviews: 78,
      ratingDistribution: [
        { rating: 5, count: 40, percentage: 51.3 },
        { rating: 4, count: 25, percentage: 32.1 },
        { rating: 3, count: 10, percentage: 12.8 },
        { rating: 2, count: 2, percentage: 2.6 },
        { rating: 1, count: 1, percentage: 1.3 }
      ]
    }
  };

  useEffect(() => {
    const loadGlobalReviews = async () => {
      setIsLoading(true);
      
      try {
        // Simular carregamento da API
        await new Promise(resolve => setTimeout(resolve, 500));
        setProductReviews(mockGlobalReviews);
      } catch (error) {
        console.error('Erro ao carregar avaliações globais:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGlobalReviews();
  }, []);

  const getProductReview = (productId: string): ProductReviewData | null => {
    return productReviews[productId] || null;
  };

  const updateProductReview = (productId: string, newRating: number) => {
    setProductReviews(prev => {
      const current = prev[productId];
      if (!current) return prev;

      const newTotalReviews = current.totalReviews + 1;
      const newTotalRating = (current.averageRating * current.totalReviews) + newRating;
      const newAverageRating = newTotalRating / newTotalReviews;

      // Atualizar distribuição de avaliações
      const newDistribution = [...current.ratingDistribution];
      const ratingIndex = newDistribution.findIndex(d => d.rating === newRating);
      
      if (ratingIndex !== -1) {
        newDistribution[ratingIndex] = {
          ...newDistribution[ratingIndex],
          count: newDistribution[ratingIndex].count + 1,
          percentage: ((newDistribution[ratingIndex].count + 1) / newTotalReviews) * 100
        };
      }

      // Recalcular porcentagens
      newDistribution.forEach(dist => {
        dist.percentage = (dist.count / newTotalReviews) * 100;
      });

      return {
        ...prev,
        [productId]: {
          ...current,
          averageRating: newAverageRating,
          totalReviews: newTotalReviews,
          ratingDistribution: newDistribution
        }
      };
    });
  };

  return {
    productReviews,
    isLoading,
    getProductReview,
    updateProductReview
  };
};
