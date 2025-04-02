import {Restaurant, Review} from "./types";

const API_BASE_URL = "http://localhost:8080/api"; // Adjust this based on your actual API URL

// Fetch restaurants with optional filters
export const fetchRestaurants = async (filters?: {
    cuisineType?: string;
    minRating?: number;
    latitude?: number;
    longitude?: number;
    maxDistanceKm?: number;
    filterOpenNow?: boolean;
    requirePhotos?: boolean;
    createdById?: string;
    address?: string;
    page?: number;
    size?: number;
    sort?: string;
    sortCriteria?: string;
}) => {
    let url = `${API_BASE_URL}/restaurants/filter`;

    if (filters) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, String(value));
            }
        });

        if (params.toString()) {
            url += `?${params.toString()}`;
        }
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching restaurants: ${response.statusText}`);
        }
        const data = await response.json();
        return data || []; // Assuming pagination response structure
    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        throw error;
    }
};

// Fetch a single restaurant by ID
export const fetchRestaurantById = async (id: string): Promise<Restaurant> => {
    try {
        const response = await fetch(`${API_BASE_URL}/restaurants/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching restaurant: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch restaurant with ID ${id}:`, error);
        throw error;
    }
};

// Fetch reviews for a restaurant
export const fetchReviewsByRestaurantId = async (restaurantId: string): Promise<
    {
        content: Review[],
        page: never
    }
> => {
    try {
        const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/reviews`);
        if (!response.ok) {
            throw new Error(`Error fetching reviews: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch reviews for restaurant ${restaurantId}:`, error);
        throw error;
    }
};

// Fetch unique cuisines
export const fetchCuisines = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/filters/cuisines`);
        if (!response.ok) {
            throw new Error(`Error fetching cuisines: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch cuisines:", error);
        throw error;
    }
};

// Fetch unique neighborhoods
export const fetchNeighborhoods = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/filters/neighborhoods`);
        if (!response.ok) {
            throw new Error(`Error fetching neighborhoods: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch neighborhoods:", error);
        throw error;
    }
};

// Fetch unique features
export const fetchFeatures = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/filters/features`);
        if (!response.ok) {
            throw new Error(`Error fetching features: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch features:", error);
        throw error;
    }
};

export const fetchPic = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/photos`);
    if (!response.ok) {
        throw new Error(`Error fetching features: ${response.statusText}`);
    }
    return await response.json();
}