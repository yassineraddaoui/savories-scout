
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import FilterSection from '@/components/FilterSection';
import { Restaurant, PriceRange, Cuisine, Feature, Neighborhood } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { MapPin, Search, Filter, Star } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { 
  fetchRestaurants, 
  fetchCuisines, 
  fetchNeighborhoods, 
  fetchFeatures 
} from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  const [selectedCuisines, setSelectedCuisines] = useState<Cuisine[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const { toast } = useToast();

  // Fetch restaurants with filters
  const {
    data: restaurantsData,
    isLoading: isLoadingRestaurants,
    isError: isRestaurantsError,
    refetch: refetchRestaurants
  } = useQuery({
    queryKey: ['restaurants', searchQuery, searchLocation, selectedCuisines, selectedNeighborhoods, selectedFeatures, selectedPriceRanges, currentPage, pageSize],
    queryFn: async () => {
      // Build filter parameters based on the selected filters
      const filters: any = {
        page: currentPage,
        size: pageSize,
        sort: 'DESC',
        sortCriteria: 'rating',
      };
      
      if (searchQuery) {
        filters.address = searchQuery; // Using address field for general search
      }
      
      if (selectedCuisines.length > 0) {
        filters.cuisineType = selectedCuisines[0]; // API only supports one cuisine type at a time
      }
      
      if (selectedNeighborhoods.length > 0 && searchLocation === '') {
        // If neighborhood is selected but no specific location is provided
        filters.address = selectedNeighborhoods.join(',');
      }

      if (searchLocation) {
        filters.address = searchLocation;
      }
      
      // For minRating, we can use the lowest rating selected if user was filtering by rating
      if (selectedPriceRanges.length > 0) {
        // Converting price range to a format usable by the API
        // This is an approximation since your API doesn't directly filter by price range
        // You may need to adjust this based on your actual API implementation
      }
      
      return fetchRestaurants(filters);
    },
    refetchOnWindowFocus: false
  });

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

  // Handle search
  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    setCurrentPage(1); // Reset to first page when search changes
  };
  
  // Filter handlers
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
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-64 shrink-0">
              <FilterSection 
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
                className="sticky top-4"
              />
            </div>
            
            {/* Sidebar Filters - Mobile */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <FilterSection 
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
                  />
                  <SheetClose asChild>
                    <Button className="mt-4 w-full bg-food-500 hover:bg-food-600">
                      Apply Filters
                    </Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Restaurant Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {isLoadingRestaurants 
                    ? 'Loading restaurants...' 
                    : `${restaurantsData?.length || 0} ${restaurantsData?.length === 1 ? 'Restaurant' : 'Restaurants'}`}
                </h2>
                
                <div className="flex gap-2">
                  <SearchBar variant="simple" onSearch={handleSearch} className="hidden md:flex max-w-md" />
                </div>
              </div>
              
              {isLoadingRestaurants ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-4 h-64 animate-pulse">
                      <div className="bg-gray-200 h-32 rounded-md mb-4"></div>
                      <div className="bg-gray-200 h-4 rounded-md mb-2 w-3/4"></div>
                      <div className="bg-gray-200 h-4 rounded-md mb-2 w-1/2"></div>
                      <div className="bg-gray-200 h-4 rounded-md w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : isRestaurantsError ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Error loading restaurants</h3>
                  <p className="text-gray-500 mb-6">
                    There was an error fetching restaurant data. Please try again.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => refetchRestaurants()}
                  >
                    Try again
                  </Button>
                </div>
              ) : restaurantsData && restaurantsData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurantsData.map((restaurant) => (
                    <RestaurantCard 
                      key={restaurant.id} 
                      restaurant={restaurant} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
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
