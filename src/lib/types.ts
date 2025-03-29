
export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  priceRange: "cheap" | "moderate" | "expensive" | "very expensive";
  rating: number;
  reviewCount: number;
  address: string;
  neighborhood: string;
  city: string;
  description: string;
  features: string[];
  openingHours: {
    [key: string]: string;
  };
  phoneNumber: string;
  website?: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  photos?: string[];
  helpfulCount: number;
}

export type PriceRange = Restaurant["priceRange"];
export type Cuisine = string;
export type Feature = string;
export type Neighborhood = string;
