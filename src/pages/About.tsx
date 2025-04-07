
import React from 'react';
import Navbar from '@/components/Navbar';
import { CalendarClock, Coffee, Globe, Lightbulb, MessageSquare, Users, Utensils } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-food-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About TableTalk </h1>
          <p className="text-xl max-w-3xl">
            Connecting food lovers with authentic local dining experiences since 2023.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At TableTalk, we believe that great food is at the heart of every community. Our mission is to help people discover authentic dining experiences by connecting them with local restaurants that serve exceptional cuisine.
            </p>
            <p className="text-lg text-gray-700">
              We're passionate about supporting local businesses and helping food lovers find their next favorite spot, whether it's a hidden gem tucked away in a neighborhood or a popular establishment with a loyal following.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Restaurant interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-food-100 rounded-full mb-4">
                <Utensils className="h-8 w-8 text-food-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Restaurants</h3>
              <p className="text-gray-600">
                Discover top-rated restaurants with authentic cuisine in your area, vetted for quality and experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-food-100 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-food-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Honest Reviews</h3>
              <p className="text-gray-600">
                Read and share authentic experiences from real diners to help you make informed decisions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-food-100 rounded-full mb-4">
                <Lightbulb className="h-8 w-8 text-food-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Recommendations</h3>
              <p className="text-gray-600">
                Get personalized restaurant suggestions based on your preferences and dining history.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Story</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg text-gray-700 mb-6">
            TableTalk was founded by a group of food enthusiasts who were tired of sifting through endless restaurant options without reliable guidance. We started in a small apartment, mapping out our favorite local eateries and sharing recommendations with friends.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              What began as a passion project quickly grew into a comprehensive platform as more people sought authentic dining experiences. Today, we're proud to help thousands of users discover exceptional restaurants in their communities.
            </p>
            <p className="text-lg text-gray-700">
              Our team has grown, but our mission remains the same: to celebrate culinary excellence and connect food lovers with memorable dining experiences.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <Globe className="h-6 w-6 text-food-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Local Focus</h3>
                <p className="text-gray-600">
                  We prioritize local businesses and regional cuisine, celebrating the unique flavors of every community.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <Users className="h-6 w-6 text-food-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                <p className="text-gray-600">
                  We believe food brings people together and work to foster connections through shared dining experiences.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <Coffee className="h-6 w-6 text-food-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-gray-600">
                  We maintain high standards for the restaurants we feature, ensuring memorable experiences for our users.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <CalendarClock className="h-6 w-6 text-food-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Timely Information</h3>
                <p className="text-gray-600">
                  We strive to provide up-to-date, accurate information about restaurant hours, menus, and special offers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">TableTalk </h3>
              <p className="text-gray-400">
                Connecting food lovers with authentic local dining experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/browse" className="text-gray-400 hover:text-white">Browse</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">
                info@TableTalk.com
              </p>
              <p className="text-gray-400">
                123 Foodie Ave, Flavor Town
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} TableTalk . All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
