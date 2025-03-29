
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
  className?: string;
  variant?: 'default' | 'simple';
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  className = '',
  variant = 'default'
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, location);
    }
  };

  if (variant === 'simple') {
    return (
      <form onSubmit={handleSubmit} className={`flex w-full items-center ${className}`}>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for restaurants, cuisines, or dishes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 rounded-l-md rounded-r-none border-r-0 focus-visible:ring-0"
          />
        </div>
        <Button type="submit" className="bg-food-500 hover:bg-food-600 rounded-l-none h-10">
          Search
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for restaurants, cuisines, or dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="relative flex-grow">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Location (city, neighborhood, address)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" className="bg-food-500 hover:bg-food-600">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
