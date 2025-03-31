import {PaginatedResponse, Restaurant, Review} from "@/lib/types.ts";
import { getAuthHeader } from "@/auth/keycloak";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
        const headers = {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        };
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
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

// User specific APIs (protected by authentication)
export const getUserFavorites = async (): Promise<ApiResponse<Restaurant[]>> => {
    return fetchApi<Restaurant[]>("/user/favorites");
};

export const addFavorite = async (restaurantId: string): Promise<ApiResponse<boolean>> => {
    try {
        const headers = {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        };
        
        const response = await fetch(`${API_BASE_URL}/user/favorites/${restaurantId}`, {
            method: 'POST',
            headers
        });
        
        if (!response.ok) {
            return {error: `HTTP error! status: ${response.status}`};
        }
        
        return {data: true};
    } catch (error) {
        return {error: error instanceof Error ? error.message : "Unknown error"};
    }
};

export const removeFavorite = async (restaurantId: string): Promise<ApiResponse<boolean>> => {
    try {
        const headers = {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        };
        
        const response = await fetch(`${API_BASE_URL}/user/favorites/${restaurantId}`, {
            method: 'DELETE',
            headers
        });
        
        if (!response.ok) {
            return {error: `HTTP error! status: ${response.status}`};
        }
        
        return {data: true};
    } catch (error) {
        return {error: error instanceof Error ? error.message : "Unknown error"};
    }
};

export const getUserReviews = async (): Promise<ApiResponse<PaginatedResponse<Review>>> => {
    return fetchApi<PaginatedResponse<Review>>("/user/reviews");
};
