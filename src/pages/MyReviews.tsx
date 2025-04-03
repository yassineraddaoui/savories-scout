import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getUserReviews} from '@/apis/api';
import Navbar from '@/components/Navbar';
import ReviewCard from '@/components/ReviewCard';
import {Button} from '@/components/ui/button';
import {FileEdit, FileText, Loader} from 'lucide-react';
import {Link, Navigate} from 'react-router-dom';
import {useAuth} from '@/auth/AuthContext';

const MyReviews = () => {
    const {isLoggedIn} = useAuth();

    // Redirect if not logged in
    if (!isLoggedIn) {
        return <Navigate to="/"/>;
    }

    const {
        data: reviewsData,
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ['userReviews'],
        queryFn: getUserReviews
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar/>
                <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                    <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-food-500"/>
                    <h2 className="text-xl font-semibold">Loading your reviews...</h2>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar/>
                <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Error Loading Reviews</h2>
                    <p className="text-gray-600 mb-6">
                        Sorry, we couldn't load your reviews. Please try again later.
                    </p>
                    <Button onClick={() => refetch()}>Retry</Button>
                </div>
            </div>
        );
    }

    const reviews = reviewsData.data || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
                    <p className="text-gray-600 mt-2">
                        Your restaurant reviews and ratings
                    </p>
                </div>

                {reviews.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.review.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/5">
                                        <div className="md:h:32  aspect-video md:aspect-square relative overflow-hidden">
                                            <img
                                                src={`http://localhost:8080/${review.restaurant.photos[0].url}`}
                                                alt={review.restaurant.name}
                                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Right side - Review content - Expanded */}
                                    <div className="md:w-4/5 flex-1">
                                        <div className="p-4 border-b">
                                            <Link to={`/restaurant/${review.restaurant.id}`}
                                                  className="text-xl font-semibold text-food-600 hover:underline">
                                                {review.restaurant.name || "Restaurant"}
                                            </Link>
                                            <p className="text-sm text-gray-500">
                                                Reviewed on {new Date(review.review.datePosted).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <ReviewCard review={review.review}/>


                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 flex justify-end">
                                    <Link to={`/restaurant/${review.restaurant.id}`}>
                                        <Button variant="outline" size="sm" className="text-gray-600">
                                            <FileText className="mr-2 h-4 w-4"/>
                                            View Restaurant
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <FileEdit className="h-12 w-12 mx-auto mb-4 text-gray-300"/>
                        <h2 className="text-2xl font-semibold mb-2">No Reviews Yet</h2>
                        <p className="text-gray-600 mb-6">
                            You haven't written any restaurant reviews yet.
                        </p>
                        <Link to="/browse">
                            <Button className="bg-food-500 hover:bg-food-600">
                                Browse Restaurants
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviews;