
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Restaurant, PriceRange, Cuisine, Feature, Neighborhood } from '@/lib/types';
import { fetchRestaurants } from '@/lib/api';

interface UseRestaurantsOptions {
  initialPage?: number;
  pageSize?: number;
  defaultSort?: string;
  defaultSortCriteria?: string;
}

interface UseRestaurantsFilters {
  searchQuery?: string;
  searchLocation?: string;
  cuisines?: Cuisine[];
  neighborhoods?: Neighborhood[];
  features?: Feature[];
  priceRanges?: PriceRange[];
  minRating?: number;
  latitude?: number;
  longitude?: number;
  maxDistanceKm?: number;
  filterOpenNow?: boolean;
  requirePhotos?: boolean;
}

const useRestaurants = (options: UseRestaurantsOptions = {}) => {
  const {
    initialPage = 1,
    pageSize = 12,
    defaultSort = 'DESC',
    defaultSortCriteria = 'rating'
  } = options;

  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState<UseRestaurantsFilters>({});
  
  // Build API parameters from filters
  const buildApiParams = () => {
    const apiParams: any = {
      page,
      size: pageSize,
      sort: defaultSort,
      sortCriteria: defaultSortCriteria
    };
    
    // Add search query
    if (filters.searchQuery) {
      apiParams.address = filters.searchQuery; // Using address field for general search
    }
    
    // Add location
    if (filters.searchLocation) {
      apiParams.address = filters.searchLocation;
    }
    
    // Add cuisine (API only supports one cuisine at a time)
    if (filters.cuisines && filters.cuisines.length > 0) {
      apiParams.cuisineType = filters.cuisines[0];
    }
    
    // Add neighborhoods as part of address if no location is provided
    if (filters.neighborhoods && filters.neighborhoods.length > 0 && !filters.searchLocation) {
      apiParams.address = filters.neighborhoods.join(',');
    }
    
    // Add min rating
    if (filters.minRating !== undefined) {
      apiParams.minRating = filters.minRating;
    }
    
    // Add geolocation params
    if (filters.latitude !== undefined && filters.longitude !== undefined) {
      apiParams.latitude = filters.latitude;
      apiParams.longitude = filters.longitude;
      
      if (filters.maxDistanceKm !== undefined) {
        apiParams.maxDistanceKm = filters.maxDistanceKm;
      }
    }
    
    // Add additional filters
    if (filters.filterOpenNow) {
      apiParams.filterOpenNow = true;
    }
    
    if (filters.requirePhotos) {
      apiParams.requirePhotos = true;
    }
    
    return apiParams;
  };
  
  // Query for restaurants with current filters
  const query = useQuery({
    queryKey: ['restaurants', page, filters],
    queryFn: () => fetchRestaurants(buildApiParams()),
    refetchOnWindowFocus: false
  });
  
  // Update filters
  const updateFilters = (newFilters: Partial<UseRestaurantsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Reset page when filters change
    setPage(1);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({});
    setPage(1);
  };
  
  // Set page
  const goToPage = (newPage: number) => {
    setPage(newPage);
  };
  
  return {
    ...query,
    page,
    filters,
    updateFilters,
    resetFilters,
    goToPage
  };
};

export default useRestaurants;
