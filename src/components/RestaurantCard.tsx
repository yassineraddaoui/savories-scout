
import React from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '@/lib/types';
import StarRating from './StarRating';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

const getPriceSymbol = (priceRange: number): string => {
  switch (priceRange) {
    case 1:
      return '$';
    case 2:
      return '$$';
    case 3:
      return '$$$';
    case 4:
      return '$$$$';
    default:
      return '$';
  }
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, className = '' }) => {
  return (
      <Card className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}>
        <Link to={`/restaurant/${restaurant.id}`}>
          <div className="aspect-video relative overflow-hidden">
            <img
                src={`http://localhost:8080/${restaurant.photos[0].url}`}
                alt={restaurant.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg truncate flex-1">{restaurant.name}</h3>
              <span className="text-gray-600 text-sm font-medium ml-2">
              {getPriceSymbol(restaurant.rangePrice)}
            </span>
            </div>

            <div className="flex items-center mb-1">
              <StarRating rating={restaurant.averageRating} size="sm" showValue={true} />
              <span className="text-gray-500 text-xs ml-1">
              ({restaurant.reviewCount??0})
            </span>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span className="bg-gray-100 rounded-full px-2 py-0.5 mr-2">{restaurant.cuisine}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span className="truncate">{restaurant.address.streetName}, {restaurant.address.state}</span>
            </div>
          </CardContent>
        </Link>
      </Card>
  );
};

export default RestaurantCard;
