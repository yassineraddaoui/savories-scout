import React from 'react';
import { Filter, FilterX } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import FilterSection from '@/components/FilterSection.tsx';
import { Cuisine, Feature, Neighborhood, PriceRange } from '@/lib/types.ts';

interface RestaurantFiltersProps {
    cuisines: Cuisine[];
    neighborhoods: Neighborhood[];
    features: Feature[];
    selectedCuisines: Cuisine[];
    selectedNeighborhoods: Neighborhood[];
    selectedFeatures: Feature[];
    selectedPriceRanges: PriceRange[];
    onCuisineChange: (cuisine: Cuisine) => void;
    onNeighborhoodChange: (neighborhood: Neighborhood) => void;
    onFeatureChange: (feature: Feature) => void;
    onPriceRangeChange: (priceRange: PriceRange) => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}

export const RestaurantFilters: React.FC<RestaurantFiltersProps> = ({
                                                                        cuisines,
                                                                        neighborhoods,
                                                                        features,
                                                                        selectedCuisines,
                                                                        selectedNeighborhoods,
                                                                        selectedFeatures,
                                                                        selectedPriceRanges,
                                                                        onCuisineChange,
                                                                        onNeighborhoodChange,
                                                                        onFeatureChange,
                                                                        onPriceRangeChange,
                                                                        onClearFilters,
                                                                        hasActiveFilters
                                                                    }) => {
    return (
        <>
            {/* Desktop filters */}
            <div className="hidden lg:block w-64 shrink-0">
                <FilterSection
                    cuisines={cuisines}
                    neighborhoods={neighborhoods}
                    features={features}
                    selectedCuisines={selectedCuisines}
                    selectedNeighborhoods={selectedNeighborhoods}
                    selectedFeatures={selectedFeatures}
                    selectedPriceRanges={selectedPriceRanges}
                    onCuisineChange={onCuisineChange}
                    onNeighborhoodChange={onNeighborhoodChange}
                    onFeatureChange={onFeatureChange}
                    onPriceRangeChange={onPriceRangeChange}
                    className="sticky top-4"
                />

                {/* Clear filters button */}
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={onClearFilters}
                    >
                        <FilterX className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                )}
            </div>

            {/* Mobile filters */}
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
                            onCuisineChange={onCuisineChange}
                            onNeighborhoodChange={onNeighborhoodChange}
                            onFeatureChange={onFeatureChange}
                            onPriceRangeChange={onPriceRangeChange}
                        />
                        <SheetClose asChild>
                            <Button className="mt-4 w-full bg-food-500 hover:bg-food-600">
                                Apply Filters
                            </Button>
                        </SheetClose>

                        {/* Clear filters button in mobile */}
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2"
                                onClick={onClearFilters}
                            >
                                <FilterX className="mr-2 h-4 w-4" />
                                Clear Filters
                            </Button>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
};