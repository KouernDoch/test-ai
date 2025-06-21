'use client';

import { useState } from 'react';
import HouseCard from '../../components/HouseCard';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Heart, Home, Trash2, Star, Filter, SortAsc } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Modern Downtown Loft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop",
      owner: "John Smith",
      ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      price: 2500,
      location: "SoHo, Manhattan, NY",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      rating: 4.8,
      featured: true,
      dateAdded: "2024-01-15",
      available: true
    },
    {
      id: 3,
      name: "Luxury Upper East Side Penthouse",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
      owner: "Mike Davis",
      ownerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      price: 4200,
      location: "Upper East Side, Manhattan, NY",
      coordinates: { lat: 40.7831, lng: -73.9712 },
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      rating: 4.9,
      featured: true,
      dateAdded: "2024-01-20",
      available: true
    },
    {
      id: 5,
      name: "Industrial Warehouse Conversion",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=250&fit=crop",
      owner: "David Chen",
      ownerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      price: 3200,
      location: "DUMBO, Brooklyn, NY",
      coordinates: { lat: 40.7033, lng: -73.9903 },
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      rating: 4.7,
      dateAdded: "2024-01-25",
      available: false
    }
  ]);

  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterAvailable, setFilterAvailable] = useState('all');

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const sortedAndFilteredFavorites = favorites
    .filter(fav => {
      if (filterAvailable === 'available') return fav.available;
      if (filterAvailable === 'unavailable') return !fav.available;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'dateAdded':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Hero Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Heart className="h-16 w-16 text-red-500 fill-red-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {favorites.length}
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">My Favorites</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your saved properties with love ❤️
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Favorites</p>
                    <p className="text-3xl font-bold text-gray-900">{favorites.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Home className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Now</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {favorites.filter(fav => fav.available).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {favorites.length > 0 
                        ? (favorites.reduce((acc, fav) => acc + fav.rating, 0) / favorites.length).toFixed(1)
                        : '0.0'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          {favorites.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-600" />
                      <select 
                        value={filterAvailable} 
                        onChange={(e) => setFilterAvailable(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="all">All Properties</option>
                        <option value="available">Available Only</option>
                        <option value="unavailable">Unavailable Only</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4 text-gray-600" />
                      <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="dateAdded">Date Added</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={clearAllFavorites}
                    className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Favorites List */}
          {sortedAndFilteredFavorites.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Saved Properties ({sortedAndFilteredFavorites.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedAndFilteredFavorites.map(house => (
                  <div key={house.id} className="relative group">
                    <HouseCard house={house} isFavorite={true} />
                    
                    {/* Status badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {!house.available && (
                        <Badge variant="destructive" className="text-xs bg-red-500">
                          Not Available
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs bg-white/90">
                        Added {new Date(house.dateAdded).toLocaleDateString()}
                      </Badge>
                    </div>

                    {/* Remove button with heart animation */}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      onClick={() => removeFavorite(house.id)}
                    >
                      <Heart className="h-5 w-5 fill-red-500 group-hover:fill-white transition-colors" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : favorites.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="relative mb-6">
                  <Heart className="h-20 w-20 text-gray-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="h-12 w-12 text-red-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-600 text-center mb-6 max-w-md">
                  Start exploring properties and save your favorites by clicking the heart icon. 
                  Your saved properties will appear here with love! ❤️
                </p>
                <Button asChild className="bg-red-500 hover:bg-red-600">
                  <a href="/">Browse Properties</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Heart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matching favorites</h3>
                <p className="text-gray-600 text-center mb-6">
                  Try adjusting your filters to see more properties.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilterAvailable('all')}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}