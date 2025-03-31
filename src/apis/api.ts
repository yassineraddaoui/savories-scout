import {PaginatedResponse, Restaurant, Review} from "@/lib/types.ts";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            return {error: `HTTP error! status: ${response.status}`};
        }
        const data = await response.json();
        return {data};
    } catch (error) {
        return {error: error instanceof Error ? error.message : "Unknown error"};
    }
}

// Restaurants API
export const getRestaurants = async (page: number = 0): Promise<ApiResponse<PaginatedResponse<Restaurant>>> => {
    return fetchApi<PaginatedResponse<Restaurant>>(`/restaurants?page=${page}`);
};

export const getRestaurantById = async (id: string): Promise<ApiResponse<Restaurant>> => {
    return fetchApi<Restaurant>(`/restaurants/${id}`);
};

// Reviews API
export const getReviewsByRestaurantId = async (restaurantId: string): Promise<ApiResponse<PaginatedResponse<Review>>> => {
    return fetchApi<PaginatedResponse<Review>>(`/restaurants/${restaurantId}/reviews`);
};

// Filters API
export const getCuisines = async (): Promise<ApiResponse<string[]>> => {
    return fetchApi<string[]>("/filters/cuisines");
};

export const getNeighborhoods = async (): Promise<ApiResponse<string[]>> => {
    return fetchApi<string[]>("/filters/neighborhoods");
};

export const getFeatures = async (): Promise<ApiResponse<string[]>> => {
    return fetchApi<string[]>("/filters/features");
};
