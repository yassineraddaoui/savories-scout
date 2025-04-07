
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, LogOut, User } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/auth/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import SignInForm from './auth/SignInForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, isLoggedIn, logout, register } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "border-food-500 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-food-500 font-bold text-2xl">Table</span>
                <span className="text-gray-700 font-bold text-2xl">Talk</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/')}`}>
                Home
              </Link>
              <Link to="/browse" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/browse')}`}>
                Browse
              </Link>
              <Link to="/about" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/about')}`}>
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.username || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full flex">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-reviews" className="w-full flex">My Reviews</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/favorites" className="w-full flex">Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Sign In</DialogTitle>
                    <DialogClose className="hidden" id="sign-in-dialog-close" />
                    <SignInForm
                      onSuccess={() => {
                        document.getElementById('sign-in-dialog-close')?.click();
                      }}
                    />
                  </DialogContent>
                </Dialog>
                <Button 
                  size="sm" 
                  className="bg-food-500 hover:bg-food-600 text-white"
                  onClick={register}
                >
                  Sign Up
                </Button>
              </>
            )}
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
                  <Link to="/" className={`text-lg font-medium ${location.pathname === '/' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                    Home
                  </Link>
                  <Link to="/browse" className={`text-lg font-medium ${location.pathname === '/browse' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                    Browse
                  </Link>
                  <Link to="/about" className={`text-lg font-medium ${location.pathname === '/about' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                    About
                  </Link>
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                    {isLoggedIn ? (
                      <>
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          Signed in as <span className="font-bold text-gray-700">{user?.username}</span>
                        </div>
                        <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                          Profile
                        </Link>
                        <Link to="/my-reviews" className="text-gray-700 hover:text-gray-900">
                          My Reviews
                        </Link>
                        <Link to="/favorites" className="text-gray-700 hover:text-gray-900">
                          Favorites
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start mt-2 text-red-600 border-red-200"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="justify-start">
                                Sign In
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogTitle>Sign In</DialogTitle>
                              <DialogClose className="hidden" id="mobile-sign-in-dialog-close" />
                              <SignInForm 
                                onSuccess={() => {
                                  document.getElementById('mobile-sign-in-dialog-close')?.click();
                                }}
                              />
                            </DialogContent>
                          </Dialog>
                        </SheetClose>
                        <Button 
                          size="sm" 
                          className="bg-food-500 hover:bg-food-600 text-white justify-start"
                          onClick={register}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
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
