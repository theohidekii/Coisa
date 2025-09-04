import { Star } from "lucide-react";

interface ReviewSummaryProps {
  rating: number;
  reviewCount: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

const ReviewSummary = ({ 
  rating, 
  reviewCount, 
  size = "md", 
  showCount = true 
}: ReviewSummaryProps) => {
  const renderStars = (ratingValue: number) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`fill-yellow-400 text-yellow-400 ${
            size === "sm" ? "h-3 w-3" : 
            size === "lg" ? "h-5 w-5" : "h-4 w-4"
          }`} 
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star 
          key="half" 
          className={`fill-yellow-400 text-yellow-400 ${
            size === "sm" ? "h-3 w-3" : 
            size === "lg" ? "h-5 w-5" : "h-4 w-4"
          }`} 
        />
      );
    }

    const emptyStars = 5 - Math.ceil(ratingValue);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className={`text-gray-300 ${
            size === "sm" ? "h-3 w-3" : 
            size === "lg" ? "h-5 w-5" : "h-4 w-4"
          }`} 
        />
      );
    }

    return stars;
  };

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "lg":
        return "text-sm";
      default:
        return "text-sm";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {renderStars(rating)}
      </div>
      {showCount && (
        <span className={`text-gray-600 ${getTextSize()}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default ReviewSummary;
