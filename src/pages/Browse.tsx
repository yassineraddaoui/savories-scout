import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import FilterSection from '@/components/FilterSection';
import RestaurantCard from '@/components/RestaurantCard';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import {Filter, FilterX} from 'lucide-react';
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {fetchCuisines, fetchFeatures, fetchNeighborhoods, fetchRestaurants} from "@/lib/api.ts";
import {Cuisine, Feature, Neighborhood, PriceRange, Restaurant} from "@/lib/types.ts";
import {useToast} from "@/hooks/use-toast.ts";

const Browse = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedCuisines, setSelectedCuisines] = useState<Cuisine[]>([]);
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<Neighborhood[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(12);
    const [searchLocation, setSearchLocation] = useState('');

    const {toast} = useToast();

    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({
        cuisine: '',
        feature: '',
        neighborhood: '',
        minRating: 0,
    });
    const {data: cuisines = []} = useQuery({
        queryKey: ['cuisines'],
        queryFn: fetchCuisines,
        refetchOnWindowFocus: false
    });

    const {data: neighborhoods = []} = useQuery({
        queryKey: ['neighborhoods'],
        queryFn: fetchNeighborhoods,
        refetchOnWindowFocus: false
    });

    const {data: features = []} = useQuery({
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
        setFilters({
            cuisine: '',
            feature: '',
            neighborhood: '',
            minRating: 0,
        });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setCurrentPage(newPage);
    };
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
                sortCriteria: 'averageRating',
            };

            if (searchQuery) {
                filters.address = searchQuery; // Using address field for general search
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
    const renderRestaurants = () => {
        if (isLoadingRestaurants) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Skeleton className="h-48 w-full"/>
                            <div className="p-4">
                                <Skeleton className="h-6 w-3/4 mb-2"/>
                                <Skeleton className="h-4 w-1/2 mb-4"/>
                                <Skeleton className="h-4 w-full"/>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (isRestaurantsError) {
            return (
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Failed to load restaurants. Please try again later.
                        <Button variant="outline" size="sm" className="ml-2" onClick={() => refetchRestaurants()}>
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            );
        }

        if (!restaurantsData?.content?.length) {
            return (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600 mb-4">No restaurants found matching your criteria.</p>
                    {Object.values(filters).some(val => val !== '' && val !== 0) && (
                        <Button variant="outline" onClick={handleClearFilters}>
                            <FilterX className="mr-2 h-4 w-4"/>
                            Clear Filters
                        </Button>
                    )}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurantsData.content.map((restaurant: Restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Browse Restaurants</h1>
                    <p className="text-gray-600 mt-2">
                        Discover the best dining options in your area
                    </p>
                </div>

                <div className="mb-6">
                    <SearchBar onSearch={handleSearch}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
                            <h2 className="text-lg font-semibold mb-4">Filters</h2>

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
                                            <Filter className="h-4 w-4"/>
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

                            {Object.values(filters).some(val => val !== '' && val !== 0) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full mt-4"
                                    onClick={handleClearFilters}
                                >
                                    <FilterX className="mr-2 h-4 w-4"/>
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        {renderRestaurants()}

                        {restaurantsData?.page && (
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
                                        disabled={page >= restaurantsData.page.totalPages - 1}
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
