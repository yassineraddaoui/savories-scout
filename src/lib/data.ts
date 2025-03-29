
import { Restaurant, Review } from "./types";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Pasta Paradise",
    imageUrl: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80",
    cuisine: "Italian",
    priceRange: "moderate",
    rating: 4.7,
    reviewCount: 284,
    address: "123 Main St",
    neighborhood: "Downtown",
    city: "Metropolis",
    description: "Authentic Italian pasta made with traditional recipes passed down through generations. Our pasta is made fresh daily with locally sourced ingredients.",
    features: ["Outdoor Seating", "Wheelchair Accessible", "Full Bar", "Takeout", "Reservations"],
    openingHours: {
      Monday: "11:00 AM - 10:00 PM",
      Tuesday: "11:00 AM - 10:00 PM",
      Wednesday: "11:00 AM - 10:00 PM",
      Thursday: "11:00 AM - 10:00 PM",
      Friday: "11:00 AM - 11:00 PM",
      Saturday: "10:00 AM - 11:00 PM",
      Sunday: "10:00 AM - 9:00 PM"
    },
    phoneNumber: "(555) 123-4567",
    website: "https://pastaparadise.example.com"
  },
  {
    id: "2",
    name: "Burger Barn",
    imageUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80",
    cuisine: "American",
    priceRange: "cheap",
    rating: 4.5,
    reviewCount: 512,
    address: "456 Oak Ave",
    neighborhood: "Midtown",
    city: "Metropolis",
    description: "Juicy, handcrafted burgers made with 100% Angus beef. Try our famous Barn Burner with spicy jalapeños and house-made sauce!",
    features: ["Outdoor Seating", "Kid-friendly", "Takeout", "Delivery"],
    openingHours: {
      Monday: "11:00 AM - 9:00 PM",
      Tuesday: "11:00 AM - 9:00 PM",
      Wednesday: "11:00 AM - 9:00 PM",
      Thursday: "11:00 AM - 9:00 PM",
      Friday: "11:00 AM - 10:00 PM",
      Saturday: "11:00 AM - 10:00 PM",
      Sunday: "12:00 PM - 8:00 PM"
    },
    phoneNumber: "(555) 234-5678"
  },
  {
    id: "3",
    name: "Sushi Supreme",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80",
    cuisine: "Japanese",
    priceRange: "expensive",
    rating: 4.8,
    reviewCount: 367,
    address: "789 Maple Dr",
    neighborhood: "Harbor District",
    city: "Metropolis",
    description: "Premium sushi prepared by master chefs using fresh fish delivered daily. Experience authentic Japanese flavors in an elegant setting.",
    features: ["Reservations", "Wheelchair Accessible", "Full Bar", "Private Dining"],
    openingHours: {
      Monday: "5:00 PM - 10:00 PM",
      Tuesday: "5:00 PM - 10:00 PM",
      Wednesday: "5:00 PM - 10:00 PM",
      Thursday: "5:00 PM - 10:00 PM",
      Friday: "5:00 PM - 11:00 PM",
      Saturday: "5:00 PM - 11:00 PM",
      Sunday: "5:00 PM - 10:00 PM"
    },
    phoneNumber: "(555) 345-6789",
    website: "https://sushisupreme.example.com"
  },
  {
    id: "4",
    name: "Taco Tienda",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80",
    cuisine: "Mexican",
    priceRange: "cheap",
    rating: 4.6,
    reviewCount: 423,
    address: "101 Elm St",
    neighborhood: "Arts District",
    city: "Metropolis",
    description: "Authentic Mexican street food with homemade tortillas and family recipes. Our salsa bar features six different varieties made fresh daily.",
    features: ["Outdoor Seating", "Takeout", "Delivery", "Full Bar"],
    openingHours: {
      Monday: "11:00 AM - 9:00 PM",
      Tuesday: "11:00 AM - 9:00 PM",
      Wednesday: "11:00 AM - 9:00 PM",
      Thursday: "11:00 AM - 9:00 PM",
      Friday: "11:00 AM - 10:00 PM",
      Saturday: "11:00 AM - 10:00 PM",
      Sunday: "11:00 AM - 8:00 PM"
    },
    phoneNumber: "(555) 456-7890"
  },
  {
    id: "5",
    name: "Golden Dragon",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80",
    cuisine: "Chinese",
    priceRange: "moderate",
    rating: 4.4,
    reviewCount: 215,
    address: "202 Pine St",
    neighborhood: "Chinatown",
    city: "Metropolis",
    description: "Traditional Chinese cuisine with a modern twist. Our dim sum is made to order and our Peking duck is slow-roasted to perfection.",
    features: ["Family-style", "Takeout", "Delivery", "Private Dining"],
    openingHours: {
      Monday: "11:30 AM - 10:00 PM",
      Tuesday: "11:30 AM - 10:00 PM",
      Wednesday: "11:30 AM - 10:00 PM",
      Thursday: "11:30 AM - 10:00 PM",
      Friday: "11:30 AM - 11:00 PM",
      Saturday: "11:30 AM - 11:00 PM",
      Sunday: "12:00 PM - 9:30 PM"
    },
    phoneNumber: "(555) 567-8901"
  },
  {
    id: "6",
    name: "Farm & Table",
    imageUrl: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80",
    cuisine: "American",
    priceRange: "expensive",
    rating: 4.9,
    reviewCount: 178,
    address: "303 Willow Ave",
    neighborhood: "Green Valley",
    city: "Metropolis",
    description: "Farm-to-table dining featuring seasonal ingredients from local farms. Our menu changes weekly based on what's fresh and available.",
    features: ["Organic", "Locally Sourced", "Outdoor Seating", "Reservations"],
    openingHours: {
      Monday: "Closed",
      Tuesday: "5:00 PM - 9:30 PM",
      Wednesday: "5:00 PM - 9:30 PM",
      Thursday: "5:00 PM - 9:30 PM",
      Friday: "5:00 PM - 10:30 PM",
      Saturday: "10:00 AM - 2:00 PM, 5:00 PM - 10:30 PM",
      Sunday: "10:00 AM - 2:00 PM"
    },
    phoneNumber: "(555) 678-9012",
    website: "https://farmandtable.example.com"
  }
];

export const reviews: Review[] = [
  {
    id: "101",
    restaurantId: "1",
    userId: "u1",
    userName: "Sarah Johnson",
    userAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    title: "Best pasta in town!",
    content: "I've been to Italy multiple times, and this place brings me right back to Rome. The carbonara was perfectly creamy with just the right amount of pancetta. Service was excellent too - our server was knowledgeable about wine pairings and very attentive.",
    date: "2023-10-15",
    photos: ["https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"],
    helpfulCount: 24
  },
  {
    id: "102",
    restaurantId: "1",
    userId: "u2",
    userName: "Michael Chen",
    userAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4,
    title: "Great food but a bit noisy",
    content: "The pasta was fantastic, especially the mushroom ravioli. Fresh ingredients and generous portions. My only complaint is that it got very loud as the evening went on, making conversation difficult. Would still go back, but maybe earlier in the evening.",
    date: "2023-09-28",
    helpfulCount: 12
  },
  {
    id: "103",
    restaurantId: "1",
    userId: "u3",
    userName: "Emily Rodriguez",
    userAvatar: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 5,
    title: "Amazing anniversary dinner",
    content: "My husband and I celebrated our anniversary here and it was perfect. The staff went above and beyond to make our night special - they even brought us complimentary dessert. The pasta is made fresh in-house and you can really taste the difference.",
    date: "2023-11-02",
    photos: ["https://images.unsplash.com/photo-1624797399563-28e1705e49c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"],
    helpfulCount: 18
  },
  {
    id: "201",
    restaurantId: "2",
    userId: "u4",
    userName: "Jason Williams",
    userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4,
    title: "Solid burgers at a good price",
    content: "Burger Barn isn't fancy, but they make a darn good burger. The patty was juicy and the toppings were fresh. Their house sauce is fantastic! I also appreciated that they cook to your preferred doneness, even at this price point.",
    date: "2023-10-10",
    helpfulCount: 9
  },
  {
    id: "301",
    restaurantId: "3",
    userId: "u5",
    userName: "Aiko Tanaka",
    userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    title: "Authentic Japanese experience",
    content: "As someone who grew up in Japan, I'm very picky about sushi. Sushi Supreme gets it right - fresh fish, properly seasoned rice, and excellent knife work. The omakase option is worth every penny. One of the few places in the city serving authentic Japanese dishes.",
    date: "2023-11-05",
    photos: ["https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"],
    helpfulCount: 31
  },
  {
    id: "401",
    restaurantId: "4",
    userId: "u6",
    userName: "Carlos Mendez",
    userAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
    title: "Just like my abuela's cooking",
    content: "Finally found a place that makes tacos like back home in Mexico City! The handmade tortillas make all the difference, and their carnitas are slow-cooked to perfection. Don't miss the horchata - it's the perfect beverage with spicy food.",
    date: "2023-10-22",
    helpfulCount: 15
  }
];

export const getCuisines = (): string[] => {
  const cuisines = new Set(restaurants.map(r => r.cuisine));
  return Array.from(cuisines);
};

export const getNeighborhoods = (): string[] => {
  const neighborhoods = new Set(restaurants.map(r => r.neighborhood));
  return Array.from(neighborhoods);
};

export const getFeatures = (): string[] => {
  const features = new Set<string>();
  restaurants.forEach(r => {
    r.features.forEach(f => features.add(f));
  });
  return Array.from(features);
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(r => r.id === id);
};

export const getReviewsByRestaurantId = (restaurantId: string): Review[] => {
  return reviews.filter(r => r.restaurantId === restaurantId);
};
