'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Edit3, Save, X, Camera, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Looking for a comfortable and affordable place to call home. I work remotely in tech and enjoy quiet neighborhoods with good coffee shops nearby.',
    memberSince: '2023',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: true,
    preferences: {
      priceRange: '$1500 - $3000',
      propertyType: 'Apartment',
      location: 'Manhattan, Brooklyn',
      bedrooms: '1-2 bedrooms'
    }
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Profile</h1>
            {!isEditing ? (
              <Button onClick={handleEdit} className="flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Profile Overview */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profile.profileImage} alt={profile.name} />
                      <AvatarFallback className="text-2xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <h2 className="text-xl font-semibold">{profile.name}</h2>
                      {profile.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">Member since {profile.memberSince}</p>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editedProfile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{profile.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedProfile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={editedProfile.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={editedProfile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <p className="text-muted-foreground">{profile.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range</Label>
                  {isEditing ? (
                    <Input
                      id="priceRange"
                      value={editedProfile.preferences.priceRange}
                      onChange={(e) => handlePreferenceChange('priceRange', e.target.value)}
                    />
                  ) : (
                    <p className="text-muted-foreground">{profile.preferences.priceRange}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  {isEditing ? (
                    <Input
                      id="propertyType"
                      value={editedProfile.preferences.propertyType}
                      onChange={(e) => handlePreferenceChange('propertyType', e.target.value)}
                    />
                  ) : (
                    <p className="text-muted-foreground">{profile.preferences.propertyType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredLocation">Preferred Location</Label>
                  {isEditing ? (
                    <Input
                      id="preferredLocation"
                      value={editedProfile.preferences.location}
                      onChange={(e) => handlePreferenceChange('location', e.target.value)}
                    />
                  ) : (
                    <p className="text-muted-foreground">{profile.preferences.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  {isEditing ? (
                    <Input
                      id="bedrooms"
                      value={editedProfile.preferences.bedrooms}
                      onChange={(e) => handlePreferenceChange('bedrooms', e.target.value)}
                    />
                  ) : (
                    <p className="text-muted-foreground">{profile.preferences.bedrooms}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}