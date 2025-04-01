
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import FilterSection from '@/components/FilterSection';
import RestaurantCard from '@/components/RestaurantCard';
import { getCuisines, getFeatures, getNeighborhoods, getRestaurants } from '@/apis/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FilterX, Loader } from 'lucide-react';

const Browse = () => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    cuisine: '',
    feature: '',
    neighborhood: '',
    minRating: 0,
  });

  const { data: restaurantsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['restaurants', page, filters],
    queryFn: () => getRestaurants(page)
  });

  const { data: cuisines = { data: [] } } = useQuery({
    queryKey: ['cuisines'],
    queryFn: getCuisines
  });

  const { data: features = { data: [] } } = useQuery({
    queryKey: ['features'],
    queryFn: getFeatures
  });

  const { data: neighborhoods = { data: [] } } = useQuery({
    queryKey: ['neighborhoods'],
    queryFn: getNeighborhoods
  });

  const handleSearch = (searchTerm: string) => {
    // In a real implementation, we would update the filters and refetch
    console.log('Searching for:', searchTerm);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    setPage(0); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      cuisine: '',
      feature: '',
      neighborhood: '',
      minRating: 0,
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderRestaurants = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load restaurants. Please try again later.
            <Button variant="outline" size="sm" className="ml-2" onClick={() => refetch()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    if (!restaurantsData?.data?.content?.length) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">No restaurants found matching your criteria.</p>
          {Object.values(filters).some(val => val !== '' && val !== 0) && (
            <Button variant="outline" onClick={handleClearFilters}>
              <FilterX className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantsData.data.content.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Restaurants</h1>
          <p className="text-gray-600 mt-2">
            Discover the best dining options in your area
          </p>
        </div>
        
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              <FilterSection 
                cuisines={cuisines.data || []}
                features={features.data || []}
                neighborhoods={neighborhoods.data || []}
                onFilterChange={handleFilterChange}
                filters={filters}
              />
              
              {Object.values(filters).some(val => val !== '' && val !== 0) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4" 
                  onClick={handleClearFilters}
                >
                  <FilterX className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {renderRestaurants()}
            
            {restaurantsData?.data?.page && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    disabled={page >= restaurantsData.data.page.totalPages - 1}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
