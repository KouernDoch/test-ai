'use client';

import { useState, useEffect } from 'react';
import HouseCard from '../components/HouseCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, Filter, MapPin, SlidersHorizontal } from 'lucide-react';

const mockHouses = [
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
    featured: true
  },
  {
    id: 2,
    name: "Cozy Brooklyn Brownstone",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop",
    owner: "Sarah Johnson",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3af?w=32&h=32&fit=crop&crop=face",
    price: 1800,
    location: "Park Slope, Brooklyn, NY",
    coordinates: { lat: 40.6782, lng: -73.9442 },
    bedrooms: 3,
    bathrooms: 1,
    area: 1400,
    rating: 4.6
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
    featured: true
  },
  {
    id: 4,
    name: "Charming Studio Near Central Park",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop",
    owner: "Emma Wilson",
    ownerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    price: 1400,
    location: "Upper West Side, Manhattan, NY",
    coordinates: { lat: 40.7282, lng: -73.7949 },
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    rating: 4.3
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
    rating: 4.7
  },
  {
    id: 6,
    name: "Sunny Queens Family Home",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=250&fit=crop",
    owner: "Maria Rodriguez",
    ownerAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face",
    price: 2100,
    location: "Astoria, Queens, NY",
    coordinates: { lat: 40.7598, lng: -73.9442 },
    bedrooms: 4,
    bathrooms: 2,
    area: 1600,
    rating: 4.5
  }
];

export default function Home() {
  const [houses, setHouses] = useState(mockHouses);
  const [filteredHouses, setFilteredHouses] = useState(mockHouses);
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }
  }, []);

  useEffect(() => {
    let filtered = houses.filter(house => {
      const matchesName = house.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesLocation = house.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesMinPrice = !filters.minPrice || house.price >= parseInt(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || house.price <= parseInt(filters.maxPrice);
      
      return matchesName && matchesLocation && matchesMinPrice && matchesMaxPrice;
    });

    if (userLocation) {
      filtered = filtered.sort((a, b) => {
        const distanceA = getDistance(userLocation, a.coordinates);
        const distanceB = getDistance(userLocation, b.coordinates);
        return distanceA - distanceB;
      });
    }

    setFilteredHouses(filtered);
  }, [filters, houses, userLocation]);

  const getDistance = (pos1, pos2) => {
    const R = 3959;
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const featuredHouses = filteredHouses.filter(house => house.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <div className="relative h-[500px] bg-cover bg-center bg-no-repeat" 
           style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=500&fit=crop&crop=center')`
           }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white space-y-6 px-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
              Find Your Perfect Home
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Discover amazing rental properties in your area with our curated selection of homes and apartments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg">
                Start Searching
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search and Filters */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="pl-9"
                />
              </div>
              <Input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Featured Properties */}
        {featuredHouses.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">Featured Properties</h2>
              <Badge variant="secondary">Premium</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHouses.map(house => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          </div>
        )}

        {/* All Properties */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                {userLocation ? 'Properties Near You' : 'All Properties'}
              </h2>
              <p className="text-muted-foreground">
                {userLocation 
                  ? `${filteredHouses.length} properties sorted by distance` 
                  : `${filteredHouses.length} properties available`
                }
              </p>
            </div>
            {userLocation && (
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" />
                Location enabled
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHouses.map(house => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>

          {filteredHouses.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No properties found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria to find more properties.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({ name: '', location: '', minPrice: '', maxPrice: '' })}
                    className="mt-4"
                  >
                    Clear filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
