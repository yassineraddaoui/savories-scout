import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import ReviewForm from '@/components/ReviewForm';
import {fetchRestaurantById, fetchReviewsByRestaurantId} from '@/lib/api';
import {useToast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";
import {ArrowLeft, FileEdit, Globe, Heart, Loader, MapPin, Phone, Share2} from 'lucide-react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const RestaurantDetail = () => {
    const {id} = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState("overview");
    const {toast} = useToast();

    const {
        data: restaurant,
        isLoading: isLoadingRestaurant,
        isError: isRestaurantError
    } = useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => id ? fetchRestaurantById(id) : Promise.reject('No restaurant ID provided'),
        enabled: !!id
    });

    const {
        data: reviews = [],
        isLoading: isLoadingReviews
    } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            if (!id) return Promise.reject('No restaurant ID provided');
            const response = await fetchReviewsByRestaurantId(id);
            return response.content; // Extracting the actual review list
        },
        enabled: !!id
    });

    const handleBookmark = () => {
        toast({
            title: "Restaurant Saved",
            description: `${restaurant?.name} has been added to your favorites`,
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: restaurant?.name,
                text: `Check out ${restaurant?.name} on Savories Scout!`,
                url: window.location.href,
            });
        } else {
            // Fallback
            navigator.clipboard.writeText(window.location.href).then(() => {
                toast({
                    title: "Link Copied",
                    description: "Share link copied to clipboard",
                });
            });
        }
    };

    const getPriceSymbol = (priceRange: number): string => {
        switch (priceRange) {
            case 1:
                return '$';
            case 2:
                return '$$';
            case 3:
                return '$$$';
            case 4:
                return '$$$$';
            default:
                return '$';
        }
    };

    if (isLoadingRestaurant) {
        return (
            <div>
                <Navbar/>
                <div className="container px-4 py-16 text-center">
                    <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-food-500"/>
                    <h1 className="text-2xl font-bold">Loading restaurant details...</h1>
                </div>
            </div>
        );
    }

    if (isRestaurantError || !restaurant) {
        return (
            <div>
                <Navbar/>
                <div className="container px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
                    <p className="text-gray-600 mb-6">
                        The restaurant you're looking for couldn't be found or there was an error loading the data.
                    </p>
                    <Link to="/">
                        <Button className="bg-food-500 hover:bg-food-600">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10"/>
                <img
                    src={
                        restaurant.photos?.length > 0
                            ? `http://localhost:8080/${restaurant.photos[0].url}`
                            : "default-image.jpg"
                    } alt={restaurant.name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4 z-20">
                    <Link to="/">
                        <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                            <ArrowLeft className="mr-1 h-4 w-4"/>
                            Back
                        </Button>
                    </Link>
                </div>

                <div
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10">
                    <div className="container">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                <span className="inline-block px-2 py-1 bg-food-500 text-white text-xs rounded mb-2">
                  {restaurant.cuisine}
                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-white">
                                    {restaurant.name}
                                </h1>
                            </div>

                            <div className="mt-3 md:mt-0 flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/90 hover:bg-white"
                                    onClick={handleBookmark}
                                >
                                    <Heart className="mr-1 h-4 w-4"/>
                                    Save
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/90 hover:bg-white"
                                    onClick={handleShare}
                                >
                                    <Share2 className="mr-1 h-4 w-4"/>
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 py-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-grow">
                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <StarRating rating={restaurant.averageRating} size="lg" showValue={true}/>
                                    <span className="text-gray-500 ml-2">
                    ({restaurant.reviews.length} reviews)
                  </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">{getPriceSymbol(restaurant.priceRange)}</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-600 ml-2">{restaurant.cuisine}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5"/>
                                    <div>
                                        <p className="text-gray-800">{restaurant.address.country}</p>
                                        <p className="text-gray-600">{restaurant.address.city}, {restaurant.address.streetName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-2 text-gray-500"/>
                                    <p className="text-gray-800">{restaurant.contactInformation}</p>
                                </div>

                                {restaurant.website && (
                                    <div className="flex items-center">
                                        <Globe className="h-5 w-5 mr-2 text-gray-500"/>
                                        <a
                                            href={restaurant.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-food-600 hover:underline"
                                        >
                                            Visit website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-6">
                            <TabsList className="grid grid-cols-3">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                <TabsTrigger value="photos">Photos</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="mt-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                                    <h2 className="text-xl font-semibold mb-4">About {restaurant.name}</h2>
                                    <p className="text-gray-700 mb-6">{restaurant.description}</p>

                                    <h3 className="text-lg font-medium mb-3">Features</h3>
                                    {restaurant.features?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {restaurant.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                                >
                {feature}
            </span>
                                            ))}
                                        </div>
                                    )}


                                    <h3 className="text-lg font-medium mb-3">Hours of Operation</h3>
                                    <div className="space-y-2">
                                        {Object.entries(restaurant.operatingHours).map(([day, {
                                            openTime,
                                            closeTime
                                        }]) => (
                                            <div key={day} className="flex justify-between">
                                                <span className="font-medium w-32 capitalize">{day}</span>
                                                <span className="text-gray-600 flex-1">{openTime} - {closeTime}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">Reviews</h2>
                                        {reviews?.length > 0 && (
                                            <Button
                                                variant="link"
                                                className="text-food-600"
                                                onClick={() => setActiveTab("reviews")}
                                            >
                                                See all {reviews.length} reviews
                                            </Button>
                                        )}

                                    </div>

                                    {isLoadingReviews ? (
                                        <div className="space-y-4">
                                            {[...Array(2)].map((_, index) => (
                                                <div key={index} className="bg-gray-50 p-4 rounded-md animate-pulse">
                                                    <div className="flex items-center mb-3">
                                                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                                        <div className="flex-1">
                                                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                                        </div>
                                                    </div>
                                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : reviews.length > 0 ? (
                                        reviews.slice(0, 2).map((review) => (
                                            <ReviewCard key={review.id} review={review}/>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
                                    )}

                                    <Button
                                        className="w-full mt-4 bg-food-500 hover:bg-food-600"
                                        onClick={() => setActiveTab("reviews")}
                                    >
                                        <FileEdit className="mr-2 h-4 w-4"/>
                                        Write a Review
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                                    <h2 className="text-xl font-semibold mb-4">
                                        {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                                    </h2>

                                    <div className="flex flex-col md:flex-row gap-6 md:items-center mb-6">
                                        <div className="flex items-center">
                                            <div className="text-4xl font-bold text-gray-900 mr-2">
                                                {restaurant.averageRating.toFixed(1)}
                                            </div>
                                            <div>
                                                <StarRating rating={restaurant.averageRating} size="lg"/>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    {restaurant.reviewCount} reviews
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex-grow">
                                            {/* Rating distribution would go here in a real app */}
                                        </div>
                                    </div>

                                    <ReviewForm restaurantId={restaurant.id}/>

                                    <div className="mt-8">
                                        {isLoadingReviews ? (
                                            <div className="space-y-4">
                                                {[...Array(3)].map((_, index) => (
                                                    <div key={index}
                                                         className="bg-gray-50 p-4 rounded-md animate-pulse">
                                                        <div className="flex items-center mb-3">
                                                            <div
                                                                className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                                            <div className="flex-1">
                                                                <div
                                                                    className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                                                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                                            </div>
                                                        </div>
                                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : reviews.length > 0 ? (
                                            reviews.map((review) => (
                                                <ReviewCard key={review.id} review={review}/>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="photos" className="mt-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-xl font-semibold mb-4">Photos</h2>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="flex flex-wrap gap-4">
                                            {restaurant.photos?.length > 0 ? (
                                                restaurant.photos.map((photo, index) => (
                                                    <img
                                                        key={index}
                                                        src={`http://localhost:8080/${photo.url}`}
                                                        alt={`Photo of ${restaurant.name} - ${index + 1}`}
                                                        className="w-full h-40 object-cover rounded-md"
                                                    />
                                                ))
                                            ) : (
                                                <img
                                                    src="default-image.jpg"
                                                    alt="Default restaurant image"
                                                    className="w-full h-40 object-cover rounded-md"
                                                />
                                            )}
                                        </div>

                                        {reviews
                                            .filter(review => review.photos && review.photos.length > 0)
                                            .flatMap(review => review.photos || [])
                                            .map((photo, index) => (
                                                <img
                                                    key={index}
                                                    src={photo}
                                                    alt={`${restaurant.name} photo ${index + 1}`}
                                                    className="w-full h-40 object-cover rounded-md"
                                                />
                                            ))}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="w-full md:w-80 shrink-0">
                        <div className="sticky top-4">
                            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                                <h3 className="text-lg font-semibold mb-3">Location</h3>
                                <div
                                    className="aspect-square rounded-md bg-gray-200 mb-3 flex items-center justify-center">
                                    <MapPin className="h-12 w-12 text-gray-400"/>
                                    <span className="sr-only">Map location for {restaurant.name}</span>
                                </div>
                                <p className="text-gray-700 mb-1">{restaurant.address.country}</p>
                                <p className="text-gray-600 mb-3">{restaurant.address.city}, {restaurant.address.streetName}</p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        window.open(`https://maps.google.com/?q=${encodeURIComponent(
                                            `${restaurant.name}, ${restaurant.address}, ${restaurant.city}`
                                        )}`);
                                    }}
                                >
                                    Get Directions
                                </Button>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold mb-3">Hours</h3>
                                <div className="space-y-2">
                                    {restaurant.operatingHours &&
                                        Object.entries(restaurant.operatingHours).map(([day, {
                                            openTime,
                                            closeTime
                                        }]) => (
                                            <div key={day} className="flex justify-between">
                                                <span className="font-medium w-28 capitalize">{day}</span>
                                                <span className="text-gray-600 flex-1">
                        {openTime} - {closeTime}
                    </span>
                                            </div>
                                        ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-900 text-white py-12 mt-auto">
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

export default RestaurantDetail;
