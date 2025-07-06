import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  EyeIcon, 
  TrashIcon, 
  CreditCardIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { AIOrderConfirmation } from '../design/AIOrderConfirmation';

interface Order {
  id: string;
  userId: string;
  frontDesign?: string;
  backDesign?: string;
  leftDesign?: string;
  rightDesign?: string;
  basePrice: number;
  designPrice: number;
  totalPrice: number;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected' | 'confirmed';
  createdAt: string;
  isHidden?: boolean;
  isCartOrder?: boolean;
}

export const OrderManagement: React.FC = () => {
  const { user } = useStore();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      userId: user?.id || '1',
      frontDesign: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      basePrice: 5.99,
      designPrice: 9.99,
      totalPrice: 15.98,
      quantity: 1,
      status: 'pending',
      createdAt: new Date().toISOString(),
      isCartOrder: true
    },
    {
      id: '2',
      userId: user?.id || '1',
      backDesign: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=300&fit=crop',
      frontDesign: 'https://images.unsplash.com/photo-1583743814966-8936f37f3820?w=300&h=300&fit=crop',
      basePrice: 5.99,
      designPrice: 19.99,
      totalPrice: 25.98,
      quantity: 2,
      status: 'approved',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      isCartOrder: false
    }
  ]);

  const [showAIConfirmation, setShowAIConfirmation] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');

  const handleConfirmOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowAIConfirmation(true);
  };

  const handleAIConfirmation = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'confirmed' as const }
        : order
    ));
    setShowAIConfirmation(false);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      confirmed: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getDesignSides = (order: Order) => {
    const sides = [];
    if (order.frontDesign) sides.push({ label: 'Front', image: order.frontDesign });
    if (order.backDesign) sides.push({ label: 'Back', image: order.backDesign });
    if (order.leftDesign) sides.push({ label: 'Left', image: order.leftDesign });
    if (order.rightDesign) sides.push({ label: 'Right', image: order.rightDesign });
    return sides;
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders yet. Start by creating a design!
            </p>
            <div className="mt-6">
              <Button variant="primary">
                Start Designing
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-xl text-gray-600">
            View and manage your current and past T-shirt orders
          </p>
        </motion.div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6" hover>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                    {order.isHidden && (
                      <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        Hidden
                      </span>
                    )}
                  </h3>
                  {getStatusBadge(order.status)}
                </div>

                {/* Design Preview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  {getDesignSides(order).map((side, idx) => (
                    <div key={idx} className="text-center">
                      <span className="block text-sm font-medium text-gray-700 mb-2">
                        {side.label}
                      </span>
                      <img
                        src={side.image}
                        alt={`${side.label} Design`}
                        className="w-full h-24 object-contain bg-white rounded border"
                      />
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-semibold">{order.quantity}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Base Price</p>
                    <p className="font-semibold">${order.basePrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Design Price</p>
                    <p className="font-semibold">${order.designPrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-semibold text-lg text-blue-600">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Created: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div className="flex space-x-2">
                    {order.status === 'approved' ? (
                      <Button variant="primary" size="sm">
                        <CreditCardIcon className="h-4 w-4 mr-2" />
                        Proceed to Payment
                      </Button>
                    ) : order.status === 'pending' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleConfirmOrder(order.id)}
                      >
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Confirm Order
                      </Button>
                    ) : null}
                    
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AIOrderConfirmation
        isOpen={showAIConfirmation}
        onClose={() => setShowAIConfirmation(false)}
        orderId={selectedOrderId}
        onConfirm={handleAIConfirmation}
      />
    </div>
  );
};