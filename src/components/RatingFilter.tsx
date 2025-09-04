import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RatingFilterProps {
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  ratingCounts: { rating: number; count: number }[];
}

const RatingFilter = ({ 
  selectedRating, 
  onRatingChange, 
  ratingCounts 
}: RatingFilterProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 mb-3">Filtrar por Avaliação</h3>
      
      {/* Botão para mostrar todos */}
      <Button
        variant={selectedRating === null ? "default" : "outline"}
        size="sm"
        onClick={() => onRatingChange(null)}
        className="w-full justify-start"
      >
        <Star className="h-4 w-4 mr-2 text-gray-400" />
        Todas as avaliações
      </Button>

      {/* Filtros por estrelas */}
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = ratingCounts.find(rc => rc.rating === rating)?.count || 0;
        
        return (
          <Button
            key={rating}
            variant={selectedRating === rating ? "default" : "outline"}
            size="sm"
            onClick={() => onRatingChange(rating)}
            className="w-full justify-between"
            disabled={count === 0}
          >
            <div className="flex items-center">
              <div className="flex items-center gap-1 mr-2">
                {renderStars(rating)}
              </div>
              <span className="text-sm">
                {rating} estrela{rating !== 1 ? 's' : ''} e acima
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {count}
            </Badge>
          </Button>
        );
      })}
    </div>
  );
};

export default RatingFilter;
