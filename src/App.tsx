
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Index from "./pages/Index";
import RestaurantDetail from "./pages/RestaurantDetail";
import NotFound from "./pages/NotFound";
import Browse from "./pages/Browse";
import About from "./pages/About";
import MyFavorites from "./pages/MyFavorites";
import MyReviews from "./pages/MyReviews";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/about" element={<About />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<MyFavorites />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
