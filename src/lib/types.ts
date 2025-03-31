export interface Restaurant {
    photos: {
        uploadDate: Date;
        url: string;
    }[];
    id: string;
    name: string;
    cuisine: string;
    rangePrice: 1 | 2 | 3| 4;
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
    reviews:Review[]
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
    datePosted: string;
    photos?: string[];
    helpfulCount: number;
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

export type RangePrice = Restaurant["rangePrice"];
export type Cuisine = string;
export type Feature = string;
export type Neighborhood = string;
