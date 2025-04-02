// useRestaurants.ts
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cuisine, Feature, Neighborhood, PriceRange } from '@/lib/types';
import { fetchCuisines, fetchFeatures, fetchNeighborhoods, fetchRestaurants } from '@/lib/api';

export function useRestaurants() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Filter states
  const [selectedCuisines, setSelectedCuisines] = useState<Cuisine[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  // Fetch filter options
  const { data: cuisines = [] } = useQuery({
    queryKey: ['cuisines'],
    queryFn: fetchCuisines,
    refetchOnWindowFocus: false
  });

  const { data: neighborhoods = [] } = useQuery({
    queryKey: ['neighborhoods'],
    queryFn: fetchNeighborhoods,
    refetchOnWindowFocus: false
  });

  const { data: features = [] } = useQuery({
    queryKey: ['features'],
    queryFn: fetchFeatures,
    refetchOnWindowFocus: false
  });

  // Fetch restaurants with applied filters
  const {
    data: restaurantsData,
    isLoading: isLoadingRestaurants,
    isError: isRestaurantsError,
    refetch: refetchRestaurants
  } = useQuery({
    queryKey: ['restaurants', searchQuery, searchLocation, selectedCuisines, selectedNeighborhoods, selectedFeatures, selectedPriceRanges, currentPage, pageSize],
    queryFn: async () => {
      // Build filter parameters
      const filters: any = {
        page: currentPage - 1, // Adjust if your API uses 0-based indexing
        size: pageSize,
        sort: 'DESC',
        sortCriteria: 'averageRating',
      };

      if (searchQuery) {
        filters.address = searchQuery;
      }

      if (selectedNeighborhoods.length > 0 && searchLocation === '') {
        filters.address = selectedNeighborhoods.join(',');
      }

      if (selectedCuisines.length > 0) {
        filters.cuisineTypes = selectedCuisines.join(',');
      }

      if (searchLocation) {
        filters.address = searchLocation;
      }

      if (selectedPriceRanges.length > 0) {
        filters.priceRanges = selectedPriceRanges.join(',');
      }

      return fetchRestaurants(filters);
    },
    refetchOnWindowFocus: false
  });

  // Event handlers
  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCuisineChange = (cuisine: Cuisine) => {
    setSelectedCuisines(prev =>
        prev.includes(cuisine)
            ? prev.filter(c => c !== cuisine)
            : [...prev, cuisine]
    );
    setCurrentPage(1);
  };

  const handleNeighborhoodChange = (neighborhood: Neighborhood) => {
    setSelectedNeighborhoods(prev =>
        prev.includes(neighborhood)
            ? prev.filter(n => n !== neighborhood)
            : [...prev, neighborhood]
    );
    setCurrentPage(1);
  };

  const handleFeatureChange = (feature: Feature) => {
    setSelectedFeatures(prev =>
        prev.includes(feature)
            ? prev.filter(f => f !== feature)
            : [...prev, feature]
    );
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (priceRange: PriceRange) => {
    setSelectedPriceRanges(prev =>
        prev.includes(priceRange)
            ? prev.filter(p => p !== priceRange)
            : [...prev, priceRange]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSearchLocation('');
    setSelectedCuisines([]);
    setSelectedNeighborhoods([]);
    setSelectedFeatures([]);
    setSelectedPriceRanges([]);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    // State
    searchQuery,
    searchLocation,
    selectedCuisines,
    selectedNeighborhoods,
    selectedFeatures,
    selectedPriceRanges,
    currentPage,
    pageSize,

    // Data
    cuisines,
    neighborhoods,
    features,
    restaurantsData,
    isLoadingRestaurants,
    isRestaurantsError,
    refetchRestaurants,

    // Handlers
    handleSearch,
    handleCuisineChange,
    handleNeighborhoodChange,
    handleFeatureChange,
    handlePriceRangeChange,
    handleClearFilters,
    handlePageChange
  };
}