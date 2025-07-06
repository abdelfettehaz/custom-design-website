import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PaintBrushIcon, 
  TrashIcon, 
  ShoppingCartIcon,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useStore } from '../../store/useStore';

interface Design {
  id: string;
  type: 'custom' | 'order';
  frontDesign?: string;
  backDesign?: string;
  leftDesign?: string;
  rightDesign?: string;
  basePrice: number;
  designPrice: number;
  totalPrice: number;
  quantity: number;
  status: string;
  createdAt: string;
  viewAngle?: string;
}

export const DesignGallery: React.FC = () => {
  const { user } = useStore();
  const [designs, setDesigns] = useState<Design[]>([
    {
      id: '1',
      type: 'custom',
      frontDesign: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      basePrice: 5.99,
      designPrice: 9.99,
      totalPrice: 15.98,
      quantity: 1,
      status: 'pending',
      createdAt: new Date().toISOString(),
      viewAngle: 'front'
    },
    {
      id: '2',
      type: 'order',
      frontDesign: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=300&fit=crop',
      backDesign: 'https://images.unsplash.com/photo-1583743814966-8936f37f3820?w=300&h=300&fit=crop',
      basePrice: 5.99,
      designPrice: 19.99,
      totalPrice: 25.98,
      quantity: 1,
      status: 'approved',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      type: 'custom',
      leftDesign: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=300&h=300&fit=crop',
      basePrice: 5.99,
      designPrice: 9.99,
      totalPrice: 15.98,
      quantity: 1,
      status: 'pending',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      viewAngle: 'left'
    }
  ]);

  const [selectedDesigns, setSelectedDesigns] = useState<Set<string>>(new Set());
  const [combineMode, setCombineMode] = useState(false);

  const handleDeleteDesign = (designId: string) => {
    if (confirm('Are you sure you want to delete this design?')) {
      setDesigns(prev => prev.filter(design => design.id !== designId));
    }
  };

  const handleAddToCart = (designId: string) => {
    const design = designs.find(d => d.id === designId);
    if (design) {
      // Add to cart logic here
      alert(`Design #${designId} added to cart!`);
    }
  };

  const toggleDesignSelection = (designId: string) => {
    const newSelected = new Set(selectedDesigns);
    if (newSelected.has(designId)) {
      newSelected.delete(designId);
    } else {
      newSelected.add(designId);
    }
    setSelectedDesigns(newSelected);
  };

  const handleCombineDesigns = () => {
    if (selectedDesigns.size === 0) {
      alert('Please select at least one design to combine.');
      return;
    }

    const selectedDesignsList = Array.from(selectedDesigns).map(id => 
      designs.find(d => d.id === id)
    ).filter(Boolean);

    // Create combined design
    const combinedDesign: Design = {
      id: Date.now().toString(),
      type: 'order',
      frontDesign: selectedDesignsList.find(d => d?.frontDesign || d?.viewAngle === 'front')?.frontDesign,
      backDesign: selectedDesignsList.find(d => d?.backDesign || d?.viewAngle === 'back')?.backDesign,
      leftDesign: selectedDesignsList.find(d => d?.leftDesign || d?.viewAngle === 'left')?.leftDesign,
      rightDesign: selectedDesignsList.find(d => d?.rightDesign || d?.viewAngle === 'right')?.rightDesign,
      basePrice: 5.99,
      designPrice: selectedDesigns.size * 9.99,
      totalPrice: 5.99 + (selectedDesigns.size * 9.99),
      quantity: 1,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setDesigns(prev => [combinedDesign, ...prev]);
    setSelectedDesigns(new Set());
    setCombineMode(false);
    alert(`Combined ${selectedDesigns.size} designs successfully!`);
  };

  const getDesignSides = (design: Design) => {
    const sides = [];
    if (design.frontDesign) sides.push({ label: 'Front', image: design.frontDesign });
    if (design.backDesign) sides.push({ label: 'Back', image: design.backDesign });
    if (design.leftDesign) sides.push({ label: 'Left', image: design.leftDesign });
    if (design.rightDesign) sides.push({ label: 'Right', image: design.rightDesign });
    return sides;
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (designs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <PaintBrushIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No designs yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't created any designs yet. Start designing your custom T-shirt!
            </p>
            <div className="mt-6">
              <Button variant="primary">
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Your First Design
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Creative Designs</h1>
          <p className="text-xl text-gray-600">
            Your collection of custom T-shirt designs. Combine, edit, or order your favorites!
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant={combineMode ? "primary" : "outline"}
              onClick={() => {
                setCombineMode(!combineMode);
                setSelectedDesigns(new Set());
              }}
            >
              {combineMode ? 'Cancel Combine' : 'Combine Designs'}
            </Button>
            
            {combineMode && selectedDesigns.size > 0 && (
              <Button variant="primary" onClick={handleCombineDesigns}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Combine {selectedDesigns.size} Design{selectedDesigns.size > 1 ? 's' : ''}
              </Button>
            )}
          </div>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-4 relative" hover>
                {combineMode && (
                  <div className="absolute top-2 right-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedDesigns.has(design.id)}
                      onChange={() => toggleDesignSelection(design.id)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {design.type === 'custom' ? 'Custom' : 'Order'} Design #{design.id}
                    </h3>
                    {getStatusBadge(design.status)}
                  </div>
                  
                  {design.viewAngle && (
                    <p className="text-sm text-gray-600 mb-2">
                      View: {design.viewAngle.charAt(0).toUpperCase() + design.viewAngle.slice(1)}
                    </p>
                  )}
                </div>

                {/* Design Preview */}
                <div className={`grid gap-2 mb-4 ${
                  getDesignSides(design).length === 1 ? 'grid-cols-1' :
                  getDesignSides(design).length === 2 ? 'grid-cols-2' :
                  'grid-cols-2'
                }`}>
                  {getDesignSides(design).map((side, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {side.label}
                      </span>
                      <img
                        src={side.image}
                        alt={`${side.label} Design`}
                        className="w-full h-32 object-contain bg-gray-100 rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Quantity and Side Selection */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      min="1"
                      defaultValue={design.quantity}
                      className="w-20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Add to Cart on Side
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="front">Front</option>
                      <option value="back">Back</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>${design.basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Design Price:</span>
                    <span>${design.designPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-blue-600">
                    <span>Total:</span>
                    <span>${design.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Created: {new Date(design.createdAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddToCart(design.id)}
                    className="flex-1"
                  >
                    <ShoppingCartIcon className="h-4 w-4 mr-1" />
                    Cart
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteDesign(design.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};