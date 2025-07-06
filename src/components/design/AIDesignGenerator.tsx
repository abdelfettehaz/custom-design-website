import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface AIDesignGeneratorProps {
  onClose: () => void;
}

export const AIDesignGenerator: React.FC<AIDesignGeneratorProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [loading, setLoading] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);

  const styles = [
    { id: 'realistic', name: 'Realistic', preview: 'bg-gradient-to-br from-gray-400 to-gray-600' },
    { id: 'cartoon', name: 'Cartoon', preview: 'bg-gradient-to-br from-yellow-400 to-red-500' },
    { id: 'minimalist', name: 'Minimalist', preview: 'bg-gradient-to-br from-gray-100 to-gray-300' },
    { id: 'vintage', name: 'Vintage', preview: 'bg-gradient-to-br from-amber-400 to-orange-600' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated designs
    const mockDesigns = [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f37f3820?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=400&h=400&fit=crop',
    ];
    
    setGeneratedDesigns(mockDesigns);
    setLoading(false);
  };

  const handleUseDesign = (designUrl: string) => {
    // Add the selected design to the canvas
    console.log('Using design:', designUrl);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div>
        <Input
          label="Describe your design"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A majestic lion with a crown in golden colors..."
          fullWidth
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Style
        </label>
        <div className="grid grid-cols-2 gap-3">
          {styles.map((styleOption) => (
            <motion.button
              key={styleOption.id}
              className={`p-3 rounded-lg border-2 transition-all ${
                style === styleOption.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setStyle(styleOption.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-full h-16 rounded-md ${styleOption.preview} mb-2`} />
              <span className="text-sm font-medium">{styleOption.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        onClick={handleGenerate}
        disabled={!prompt.trim() || loading}
        leftIcon={loading ? <LoadingSpinner size="sm" color="white" /> : <SparklesIcon className="h-5 w-5" />}
      >
        {loading ? 'Generating...' : 'Generate Design'}
      </Button>

      {generatedDesigns.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Generated Designs</h3>
          <div className="grid grid-cols-2 gap-4">
            {generatedDesigns.map((design, index) => (
              <Card key={index} className="p-2" hover>
                <div className="relative group">
                  <img
                    src={design}
                    alt={`Generated design ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUseDesign(design)}
                      leftIcon={<PhotoIcon className="h-4 w-4" />}
                    >
                      Use This
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};