
import React, { useState } from 'react';
import { Review } from '@/lib/types';
import StarRating from './StarRating';
import { ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [markedHelpful, setMarkedHelpful] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const markHelpful = () => {
    if (!markedHelpful) {
      setHelpfulCount(helpfulCount + 1);
      setMarkedHelpful(true);
    } else {
      setHelpfulCount(helpfulCount - 1);
      setMarkedHelpful(false);
    }
  };

  const getInitials = (name: string) => {
    if(name == null)
      return "";
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
  };

  const formattedDate = formatDistanceToNow(new Date(review.datePosted), { addSuffix: true });
  const needsReadMore = review.content.length > 200;
  const displayContent = isExpanded ? review.content : review.content.slice(0, 200);

  return (
      <div className={`p-4 border-b ${className}`}>
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.userAvatar} alt={review.userName} />
            <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
              <h4 className="font-medium">{review.userName}</h4>
              <div className="flex items-center text-gray-500 text-sm gap-1">
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className="mb-2">
              <StarRating rating={review.rating} size="sm" />
            </div>

            {review.title && (
                <h3 className="font-medium text-lg mb-1">{review.title}</h3>
            )}

            <p className="text-gray-700 mb-3">
              {displayContent}
              {needsReadMore && !isExpanded && '...'}
            </p>

            {needsReadMore && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 p-0 h-auto text-sm mb-3"
                    onClick={toggleExpanded}
                >
                  {isExpanded ? (
                      <span className="flex items-center">Show less <ChevronUp className="ml-1 h-4 w-4" /></span>
                  ) : (
                      <span className="flex items-center">Read more <ChevronDown className="ml-1 h-4 w-4" /></span>
                  )}
                </Button>
            )}

            {review.photos && review.photos.length > 0 && (
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                  {review.photos.map((photo, index) => (
                      <img
                          key={index}
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="h-20 w-20 object-cover rounded"
                      />
                  ))}
                </div>
            )}

            <Button
                variant="ghost"
                size="sm"
                className={`text-gray-500 flex items-center gap-1 ${markedHelpful ? 'text-food-600' : ''}`}
                onClick={markHelpful}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful {helpfulCount > 0 ? `(${helpfulCount})` : ''}</span>
            </Button>
          </div>
        </div>
      </div>
  );
};

export default ReviewCard;
