
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className,
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= maxRating; i++) {
      if (i <= fullStars) {
        // Full star
        stars.push(
          <Star
            key={i}
            className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half star
        stars.push(
          <div key={i} className="relative">
            <Star className={cn(sizeClasses[size], "text-gray-300")} />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")} />
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <Star
            key={i}
            className={cn(sizeClasses[size], "text-gray-300")}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">{renderStars()}</div>
      {showValue && (
        <span className={cn("font-medium text-gray-700", textSizes[size])}>
          {rating}
        </span>
      )}
    </div>
  );
};

export default StarRating;
