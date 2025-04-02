// Browse.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import { useToast } from "@/hooks/use-toast";
import { useRestaurants } from '@/hooks/useRestaurants';
import { RestaurantFilters } from '@/components/RestaurantFilters';
import { RestaurantList } from '@/components/RestaurantList';

const Browse = () => {
    const { toast } = useToast();
    const {
        searchQuery,
        searchLocation,
        selectedCuisines,
        selectedNeighborhoods,
        selectedFeatures,
        selectedPriceRanges,
        currentPage,
        cuisines,
        neighborhoods,
        features,
        restaurantsData,
        isLoadingRestaurants,
        isRestaurantsError,
        refetchRestaurants,
        handleSearch,
        handleCuisineChange,
        handleNeighborhoodChange,
        handleFeatureChange,
        handlePriceRangeChange,
        handleClearFilters,
        handlePageChange
    } = useRestaurants();

    // Check if any filters are active
    const hasActiveFilters = selectedCuisines.length > 0 ||
        selectedNeighborhoods.length > 0 ||
        selectedFeatures.length > 0 ||
        selectedPriceRanges.length > 0 ||
        searchQuery !== '' ||
        searchLocation !== '';

    // Get pagination data from the response
    const paginationInfo = restaurantsData?.page;
    const totalPages = paginationInfo?.totalPages || 0;
    const restaurants = restaurantsData?.content || [];

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
                    {/* Sidebar/Filters */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
                            <h2 className="text-lg font-semibold mb-4">Filters</h2>

                            <RestaurantFilters
                                cuisines={cuisines}
                                neighborhoods={neighborhoods}
                                features={features}
                                selectedCuisines={selectedCuisines}
                                selectedNeighborhoods={selectedNeighborhoods}
                                selectedFeatures={selectedFeatures}
                                selectedPriceRanges={selectedPriceRanges}
                                onCuisineChange={handleCuisineChange}
                                onNeighborhoodChange={handleNeighborhoodChange}
                                onFeatureChange={handleFeatureChange}
                                onPriceRangeChange={handlePriceRangeChange}
                                onClearFilters={handleClearFilters}
                                hasActiveFilters={hasActiveFilters}
                            />
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="lg:col-span-3">
                        <RestaurantList
                            restaurants={restaurants}
                            isLoading={isLoadingRestaurants}
                            isError={isRestaurantsError}
                            onRetry={refetchRestaurants}
                            onClearFilters={handleClearFilters}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Browse;