// Index.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useRestaurants } from '@/hooks/useRestaurants';
import { RestaurantFilters } from '@/components/RestaurantFilters';
import { RestaurantList } from '@/components/RestaurantList';

const Index = () => {
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

    const restaurants = restaurantsData?.content || [];
    const totalPages = 1;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="hero-pattern py-16 md:py-24">
                <div className="container px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                            Discover <span className="text-food-500">Delicious</span> Local Dining
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Find and review the best restaurants in your area, curated by fellow food lovers.
                        </p>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <SearchBar onSearch={handleSearch} />

                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                {cuisines.slice(0, 4).map((cuisine) => (
                                    <Button
                                        key={cuisine}
                                        variant="outline"
                                        size="sm"
                                        className={`flex items-center gap-1 ${
                                            selectedCuisines.includes(cuisine)
                                                ? 'bg-food-100 text-food-700 border-food-300'
                                                : 'text-gray-600'
                                        }`}
                                        onClick={() => handleCuisineChange(cuisine)}
                                    >
                                        {cuisine}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Restaurant Listings */}
            <section className="py-12 bg-gray-50 flex-grow">
                <div className="container px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filter components */}
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

                        {/* Restaurant Grid */}
                        <div className="flex-grow">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {isLoadingRestaurants
                                        ? 'Loading restaurants...'
                                        : `${restaurants.length || 0} ${restaurants.length === 1 ? 'Restaurant' : 'Restaurants'}`}
                                </h2>

                                <div className="flex gap-2">
                                    <SearchBar variant="simple" onSearch={handleSearch} className="hidden md:flex max-w-md" />
                                </div>
                            </div>

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
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Savories Scout</h3>
                            <p className="text-gray-400">
                                Connecting food lovers with authentic local dining experiences.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
                            <p className="text-gray-400 mb-2">
                                info@savoriesscout.com
                            </p>
                            <p className="text-gray-400">
                                123 Foodie Ave, Flavor Town
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Savories Scout. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;