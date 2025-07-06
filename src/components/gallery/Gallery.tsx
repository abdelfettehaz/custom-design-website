import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  HeartIcon,
  EyeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

const designs = [
  {
    id: 1,
    title: 'Cosmic Dragon',
    designer: 'Alex Chen',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
    likes: 234,
    views: 1200,
    category: 'Fantasy',
    liked: false,
  },
  {
    id: 2,
    title: 'Vintage Sunset',
    designer: 'Maria Garcia',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    likes: 189,
    views: 890,
    category: 'Vintage',
    liked: true,
  },
  {
    id: 3,
    title: 'Minimalist Geometry',
    designer: 'David Kim',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f37f3820?w=400&h=400&fit=crop',
    likes: 156,
    views: 670,
    category: 'Minimalist',
    liked: false,
  },
  {
    id: 4,
    title: 'Nature Spirit',
    designer: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=400&h=400&fit=crop',
    likes: 298,
    views: 1450,
    category: 'Nature',
    liked: true,
  },
];

const categories = ['All', 'Fantasy', 'Vintage', 'Minimalist', 'Nature', 'Abstract', 'Typography'];

export const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedDesigns, setLikedDesigns] = useState<number[]>([2, 4]);

  const toggleLike = (designId: number) => {
    setLikedDesigns(prev => 
      prev.includes(designId) 
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
    );
  };

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.designer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || design.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Gallery</h1>
          <p className="text-xl text-gray-600">
            Discover amazing designs created by our community
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search designs or designers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              variant="outline"
              leftIcon={<FunnelIcon className="h-5 w-5" />}
            >
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer" hover>
                <div className="relative">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<EyeIcon className="h-4 w-4" />}
                      >
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<ShareIcon className="h-4 w-4" />}
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{design.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">by {design.designer}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        {design.views}
                      </span>
                      <span className="flex items-center">
                        <HeartIcon className="h-4 w-4 mr-1" />
                        {design.likes}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(design.id)}
                      className={`p-1 ${likedDesigns.includes(design.id) ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      {likedDesigns.includes(design.id) ? (
                        <HeartIconSolid className="h-5 w-5" />
                      ) : (
                        <HeartIcon className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Designs
          </Button>
        </div>
      </div>
    </div>
  );
};