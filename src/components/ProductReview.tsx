import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductReviewProps {
  productId: string;
  productName: string;
  onReviewSubmit?: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
  reviews?: Review[];
  userHasPurchased: boolean;
}

const ProductReview = ({ 
  productId, 
  productName, 
  onReviewSubmit, 
  reviews = [], 
  userHasPurchased 
}: ProductReviewProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const { userData } = useUser();
  const { toast } = useToast();

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleStarHover = (starIndex: number) => {
    setHoveredStar(starIndex + 1);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const handleSubmit = async () => {
    if (!userData) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para avaliar um produto.",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Avaliação obrigatória",
        description: "Por favor, selecione uma avaliação de 1 a 5 estrelas.",
        variant: "destructive",
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Comentário muito curto",
        description: "Por favor, escreva um comentário com pelo menos 10 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newReview = {
        userId: userData.id,
        userName: userData.nome,
        rating,
        comment: comment.trim(),
      };

      if (onReviewSubmit) {
        onReviewSubmit(newReview);
      }

      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Avaliação enviada!",
        description: "Obrigado por avaliar este produto. Sua opinião é muito importante para nós.",
      });

      // Limpar formulário
      setRating(0);
      setComment("");
    } catch (error) {
      toast({
        title: "Erro ao enviar avaliação",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (ratingValue: number, interactive = false) => {
    const stars = [];
    const displayRating = interactive ? (hoveredStar || ratingValue) : ratingValue;

    for (let i = 0; i < 5; i++) {
      const isFilled = i < displayRating;
      const isHalf = i === Math.floor(displayRating) && displayRating % 1 !== 0;

      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 cursor-pointer transition-colors ${
            isFilled
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 hover:text-yellow-300"
          }`}
          onClick={interactive ? () => handleStarClick(i) : undefined}
          onMouseEnter={interactive ? () => handleStarHover(i) : undefined}
          onMouseLeave={interactive ? handleStarLeave : undefined}
        />
      );
    }

    return stars;
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(review => review.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === star).length / reviews.length) * 100 
      : 0
  }));

  return (
    <div className="space-y-6">
      {/* Resumo das Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            Avaliações dos Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Média das Avaliações */}
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center my-2">
                {renderStars(averageRating)}
              </div>
              <div className="text-sm text-gray-600">
                {reviews.length} avaliação{reviews.length !== 1 ? 'ões' : ''}
              </div>
            </div>

            {/* Distribuição das Avaliações */}
            <div className="md:col-span-2">
              <div className="space-y-2">
                {ratingCounts.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 min-w-[60px]">
                      <span className="text-sm">{star}</span>
                      <Star className="h-3 w-3 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 min-w-[40px]">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Avaliação */}
      {userHasPurchased && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Avaliar Produto
            </CardTitle>
            <p className="text-sm text-gray-600">
              Como você comprou este produto, pode deixar sua avaliação para ajudar outros clientes.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Seleção de Estrelas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua Avaliação *
              </label>
              <div className="flex items-center gap-2">
                {renderStars(rating, true)}
                <span className="text-sm text-gray-600 ml-2">
                  {rating > 0 ? `${rating} estrela${rating !== 1 ? 's' : ''}` : 'Selecione uma avaliação'}
                </span>
              </div>
            </div>

            {/* Comentário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu Comentário *
              </label>
              <Textarea
                placeholder="Conte sua experiência com este produto... (mínimo 10 caracteres)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                maxLength={500}
                className="resize-none"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {comment.length}/500 caracteres
              </div>
            </div>

            {/* Botão de Envio */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Avaliação
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Aviso para não compradores */}
      {!userHasPurchased && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800 mb-1">
                  Apenas compradores podem avaliar
                </h4>
                <p className="text-sm text-orange-700">
                  Para avaliar este produto, você precisa ter feito uma compra. 
                  Suas avaliações ajudam outros clientes a escolherem os melhores produtos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Avaliações */}
      {reviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Todas as Avaliações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{review.userName}</span>
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" title="Comprador verificado" />
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensagem quando não há avaliações */}
      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Seja o primeiro a avaliar!
            </h3>
            <p className="text-gray-600">
              {userHasPurchased 
                ? "Compartilhe sua experiência com outros clientes."
                : "Compre este produto e seja o primeiro a deixar uma avaliação."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductReview;
