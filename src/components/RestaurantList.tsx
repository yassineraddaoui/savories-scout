import React from 'react';
import { Search, FilterX } from 'lucide-react';
import { Restaurant } from '@/lib/types.ts';
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import RestaurantCard from '@/components/RestaurantCard.tsx';

interface RestaurantListProps {
    restaurants: Restaurant[];
    isLoading: boolean;
    isError: boolean;
    onRetry: () => void;
    onClearFilters: () => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
                                                                  restaurants,
                                                                  isLoading,
                                                                  isError,
                                                                  onRetry,
                                                                  onClearFilters,
                                                                  currentPage,
                                                                  totalPages,
                                                                  onPageChange
                                                              }) => {
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
                    <Button variant="outline" size="sm" className="ml-2" onClick={onRetry}>
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (restaurants.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
                <p className="text-gray-500 mb-6">
                    Try adjusting your filters or search criteria
                </p>
                <Button variant="outline" onClick={onClearFilters}>
                    <FilterX className="mr-2 h-4 w-4" />
                    Clear Filters
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            Previous
                        </Button>

                        <span className="flex items-center px-4 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

                        <Button
                            variant="outline"
                            disabled={currentPage >= totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
