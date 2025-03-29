
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-food-500 font-bold text-2xl">Savories</span>
                <span className="text-gray-700 font-bold text-2xl">Scout</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-food-500 text-sm font-medium">
                Home
              </Link>
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Browse
              </Link>
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500">
              Sign In
            </Button>
            <Button size="sm" className="bg-food-500 hover:bg-food-600 text-white">
              Sign Up
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-6">
                  <Link to="/" className="text-lg font-medium">
                    Home
                  </Link>
                  <Link to="/" className="text-lg font-medium text-gray-500 hover:text-gray-900">
                    Browse
                  </Link>
                  <Link to="/" className="text-lg font-medium text-gray-500 hover:text-gray-900">
                    About
                  </Link>
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="justify-start">
                      Sign In
                    </Button>
                    <Button size="sm" className="bg-food-500 hover:bg-food-600 text-white justify-start">
                      Sign Up
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
