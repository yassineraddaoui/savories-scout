import React from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Cuisine, Feature, Neighborhood, RangePrice} from '@/lib/types';

interface FilterSectionProps {
    cuisines: Cuisine[];
    neighborhoods: Neighborhood[];
    features: Feature[];
    selectedCuisines: Cuisine[];
    selectedNeighborhoods: Neighborhood[];
    selectedFeatures: Feature[];
    selectedRangePrices: RangePrice[];
    onCuisineChange: (cuisine: Cuisine) => void;
    onNeighborhoodChange: (neighborhood: Neighborhood) => void;
    onFeatureChange: (feature: Feature) => void;
    onRangePriceChange: (priceRange: RangePrice) => void;
    className?: string;
}

const priceRanges: RangePrice[] = [1, 2, 3, 4]

const FilterSection: React.FC<FilterSectionProps> = ({
                                                         cuisines,
                                                         neighborhoods,
                                                         features,
                                                         selectedCuisines,
                                                         selectedNeighborhoods,
                                                         selectedFeatures,
                                                         selectedRangePrices,
                                                         onCuisineChange,
                                                         onNeighborhoodChange,
                                                         onFeatureChange,
                                                         onRangePriceChange,
                                                         className = '',
                                                     }) => {
    const getPriceLabel = (priceRange: RangePrice): string => {
        switch (priceRange) {
            case 1:
                return '$ (Inexpensive)';
            case 2:
                return '$$ (Moderate)';
            case 3:
                return '$$$ (Expensive)';
            case 4:
                return '$$$$ (Very Expensive)';
            default:
                return priceRange;
        }
    };

    return (
        <div className={`bg-white rounded-lg p-4 ${className}`}>
            <h3 className="font-semibold text-lg mb-3">Filters</h3>

            <Accordion type="multiple" defaultValue={['price-range', 'cuisine']} className="w-full">
                <AccordionItem value="price-range">
                    <AccordionTrigger className="py-3">Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-1">
                            {priceRanges.map((priceRange) => (
                                <div key={priceRange} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`price-${priceRange}`}
                                        checked={selectedRangePrices.includes(priceRange)}
                                        onCheckedChange={() => onRangePriceChange(priceRange)}
                                    />
                                    <Label
                                        htmlFor={`price-${priceRange}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {getPriceLabel(priceRange)}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cuisine">
                    <AccordionTrigger className="py-3">Cuisine</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
                            {cuisines.map((cuisine) => (
                                <div key={cuisine} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cuisine-${cuisine}`}
                                        checked={selectedCuisines.includes(cuisine)}
                                        onCheckedChange={() => onCuisineChange(cuisine)}
                                    />
                                    <Label
                                        htmlFor={`cuisine-${cuisine}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {cuisine}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="neighborhood">
                    <AccordionTrigger className="py-3">Neighborhood</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
                            {neighborhoods.map((neighborhood) => (
                                <div key={neighborhood} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`neighborhood-${neighborhood}`}
                                        checked={selectedNeighborhoods.includes(neighborhood)}
                                        onCheckedChange={() => onNeighborhoodChange(neighborhood)}
                                    />
                                    <Label
                                        htmlFor={`neighborhood-${neighborhood}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {neighborhood}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="features">
                    <AccordionTrigger className="py-3">Features</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`feature-${feature}`}
                                        checked={selectedFeatures.includes(feature)}
                                        onCheckedChange={() => onFeatureChange(feature)}
                                    />
                                    <Label
                                        htmlFor={`feature-${feature}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {feature}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FilterSection;
