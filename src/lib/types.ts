export interface Restaurant {
    photos: {
        uploadDate: Date;
        url: string;
    }[];
    id: string;
    name: string;
    cuisine: string;
    priceRange: 1 | 2 | 3| 4;
    averageRating: number;
    reviewCount: number;
    address: {
        city: string;
        streetName: string;
        postalCode: string;
        country: string;
        state: string;
    };
    neighborhood: string;
    city: string;
    description: string;
    features: string[];
    operatingHours: {
        [day: string]: {
            openTime: string;
            closeTime: string;
        };
    };
    contactInformation: string;
    website?: string;
    reviews: Review[]
}

export interface Review {
    id: string;
    userAvatar?: string;
    rating: number;
    title?: string; // Made optional as it's missing in the JSON
    content: string;
    datePosted: string;
    lastEdited?: string; // Added last edited timestamp
    photos?: string[];
    helpfulCount?: number;
    writtenBy: User; // Linked User interface
}

export interface User {
    id: string;
    username: string;
    givenName: string;
    familyName: string;
    avatar?: string; // Kept optional as not present in JSON
}

export interface PaginatedResponse<T> {
    content: T[];
    page: {
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
}

export interface ReviewRestaurant {
    review: Review,
    restaurant: Restaurant
}

export type PriceRange = Restaurant["priceRange"];
export type Cuisine = string;
export type Feature = string;
export type Neighborhood = string;
