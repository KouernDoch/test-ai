'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  History, 
  Home, 
  Calendar, 
  MapPin, 
  DollarSign,
  User,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function RentingHistoryPage() {
  const [rentingHistory] = useState([
    {
      id: 1,
      propertyName: "Modern Downtown Loft",
      propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop",
      address: "123 Broadway, SoHo, Manhattan, NY",
      landlord: "John Smith",
      landlordAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      monthlyRent: 2500,
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      status: "completed",
      duration: "12 months",
      deposit: 5000,
      rating: 4.8
    },
    {
      id: 2,
      propertyName: "Cozy Brooklyn Brownstone",
      propertyImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&h=150&fit=crop",
      address: "456 Park Ave, Park Slope, Brooklyn, NY",
      landlord: "Sarah Johnson",
      landlordAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3af?w=32&h=32&fit=crop&crop=face",
      monthlyRent: 1800,
      startDate: "2024-06-01",
      endDate: null,
      status: "active",
      duration: "Ongoing",
      deposit: 3600,
      rating: null
    },
    {
      id: 3,
      propertyName: "Studio Near Central Park",
      propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=150&fit=crop",
      address: "789 West 85th St, Upper West Side, Manhattan, NY",
      landlord: "Emma Wilson",
      landlordAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      monthlyRent: 1400,
      startDate: "2022-09-01",
      endDate: "2023-05-15",
      status: "left",
      duration: "8 months",
      deposit: 2800,
      rating: 4.2
    }
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'left':
        return <Badge variant="outline">Left</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'left':
        return <XCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotalRent = () => {
    return rentingHistory.reduce((total, rental) => total + rental.monthlyRent, 0);
  };

  const activeRentals = rentingHistory.filter(r => r.status === 'active');
  const completedRentals = rentingHistory.filter(r => r.status === 'completed');

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <History className="h-8 w-8" />
              Renting History
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your rental history and current leases
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Rentals</p>
                    <p className="text-2xl font-bold">{rentingHistory.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active Leases</p>
                    <p className="text-2xl font-bold">{activeRentals.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{completedRentals.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Monthly</p>
                    <p className="text-2xl font-bold">
                      ${Math.round(calculateTotalRent() / rentingHistory.length).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rental History */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Rental Timeline</h2>
            
            <div className="space-y-4">
              {rentingHistory.map((rental) => (
                <Card key={rental.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Property Image */}
                      <div className="lg:w-48 flex-shrink-0">
                        <img
                          src={rental.propertyImage}
                          alt={rental.propertyName}
                          className="w-full h-32 lg:h-36 object-cover rounded-lg"
                        />
                      </div>

                      {/* Property Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold">{rental.propertyName}</h3>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{rental.address}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(rental.status)}
                            {getStatusBadge(rental.status)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Start Date</p>
                              <p className="font-medium">{formatDate(rental.startDate)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">End Date</p>
                              <p className="font-medium">
                                {rental.endDate ? formatDate(rental.endDate) : 'Ongoing'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Monthly Rent</p>
                              <p className="font-medium">${rental.monthlyRent.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Duration</p>
                              <p className="font-medium">{rental.duration}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 border-t">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={rental.landlordAvatar} alt={rental.landlord} />
                              <AvatarFallback>
                                {rental.landlord.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm text-muted-foreground">Landlord</p>
                              <p className="font-medium">{rental.landlord}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {rental.rating && (
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(rental.rating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    >
                                      ★
                                    </div>
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground ml-1">
                                  {rental.rating}
                                </span>
                              </div>
                            )}
                            
                            {rental.status === 'active' && (
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}