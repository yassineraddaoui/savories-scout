
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserFavorites, removeFavorite } from '@/apis/api';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Heart, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import RestaurantCard from '@/components/RestaurantCard';
import { Navigate } from 'react-router-dom';

const MyFavorites = () => {
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const {
    data: favorites,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['userFavorites'],
    queryFn: getUserFavorites
  });

  const handleRemoveFavorite = async (restaurantId: string) => {
    try {
      await removeFavorite(restaurantId);
      toast({
        title: "Restaurant removed",
        description: "Restaurant has been removed from your favorites",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove restaurant from favorites",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-food-500" />
          <h2 className="text-xl font-semibold">Loading your favorites...</h2>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Error Loading Favorites</h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't load your favorite restaurants. Please try again later.
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Favorite Restaurants</h1>
          <p className="text-gray-600 mt-2">
            Keep track of your favorite dining spots
          </p>
        </div>
        
        {favorites?.data?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.data.map((restaurant) => (
              <div key={restaurant.id} className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 h-9 w-9"
                  onClick={() => handleRemoveFavorite(restaurant.id)}
                >
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </Button>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-semibold mb-2">No Favorites Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any restaurants to your favorites list.
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

export default MyFavorites;
