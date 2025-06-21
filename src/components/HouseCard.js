'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, MapPin, Star, Bed, Bath, Square } from 'lucide-react';

export default function HouseCard({ house, isFavorite = false }) {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleFavoriteClick = () => {
    setIsFavoriteState(!isFavoriteState);
    // Here you would typically call a function to update favorites in parent component
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <Image
          src={house.image}
          alt={house.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-red-50 shadow-lg transition-all duration-200 hover:scale-110"
          onClick={handleFavoriteClick}
        >
          <Heart 
            className={`h-5 w-5 transition-all duration-200 ${
              isFavoriteState 
                ? 'fill-red-500 text-red-500 scale-110' 
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </Button>
        
        {house.featured && (
          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
            Featured
          </Badge>
        )}
        
        {house.rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{house.rating}</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight mb-1">{house.name}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{house.location}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {house.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{house.bedrooms} bed</span>
              </div>
            )}
            {house.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{house.bathrooms} bath</span>
              </div>
            )}
            {house.area && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{house.area} sq ft</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={house.ownerAvatar} alt={house.owner} />
                <AvatarFallback className="text-xs">
                  {getInitials(house.owner)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{house.owner}</span>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${house.price.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}