
import React from 'react';
import { useAuth } from '@/auth/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigate, Link } from 'react-router-dom';
import { FileEdit, Heart, User } from 'lucide-react';

const Profile = () => {
  const { user, isLoggedIn } = useAuth();

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your account and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-500" />
                  )}
                </div>
                <CardTitle>{user?.username || 'User'}</CardTitle>
                <CardDescription>
                  Member since {new Date().getFullYear()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p>{user?.givenName} {user?.familyName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Username</p>
                    <p>{user?.username}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Account Activity</CardTitle>
                <CardDescription>View and manage your recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 text-food-500 mr-3" />
                      <div>
                        <h3 className="font-medium">My Favorites</h3>
                        <p className="text-sm text-gray-500">Restaurants you've saved</p>
                      </div>
                    </div>
                    <Link to="/favorites">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileEdit className="h-5 w-5 text-food-500 mr-3" />
                      <div>
                        <h3 className="font-medium">My Reviews</h3>
                        <p className="text-sm text-gray-500">Reviews you've written</p>
                      </div>
                    </div>
                    <Link to="/my-reviews">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Account settings are managed through your authentication provider.
                </p>
                <Button variant="outline" disabled>
                  Manage Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
