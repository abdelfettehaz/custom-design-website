import React from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  CubeIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Card } from '../ui/Card';

const features = [
  {
    icon: SparklesIcon,
    title: 'AI-Powered Design',
    description: 'Create stunning designs with our advanced AI that understands your vision.',
  },
  {
    icon: CubeIcon,
    title: '3D Preview',
    description: 'See your designs in realistic 3D before ordering with our interactive preview.',
  },
  {
    icon: PaintBrushIcon,
    title: 'Advanced Tools',
    description: 'Professional-grade design tools with layers, effects, and precise controls.',
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile Optimized',
    description: 'Design on the go with our touch-optimized mobile interface.',
  },
  {
    icon: CloudIcon,
    title: 'Cloud Sync',
    description: 'Your designs are automatically saved and synced across all devices.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Premium Quality',
    description: 'High-quality materials and printing with satisfaction guarantee.',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge technology with intuitive design to give you the best 
            custom apparel creation experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center" hover>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};