import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Stage, Layer, Text, Image, Rect, Circle } from 'react-konva';
import { 
  PaintBrushIcon, 
  PhotoIcon, 
  PlusIcon,
  EyeIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { useStore } from '../../store/useStore';
import { AIDesignGenerator } from './AIDesignGenerator';
import { ProductViewer } from './ProductViewer';

export const DesignStudio: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<'select' | 'text' | 'image' | 'shape'>('select');
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentView, setCurrentView] = useState<'front' | 'back' | 'left' | 'right'>('front');
  const [previewMode, setPreviewMode] = useState<'2d' | '3d'>('2d');
  const stageRef = useRef<any>(null);

  const { currentDesign, setCurrentDesign } = useStore();

  const tools = [
    { id: 'select', name: 'Select', icon: PlusIcon },
    { id: 'text', name: 'Text', icon: PaintBrushIcon },
    { id: 'image', name: 'Image', icon: PhotoIcon },
    { id: 'shape', name: 'Shape', icon: PaintBrushIcon },
  ];

  const views = [
    { id: 'front', name: 'Front', active: true },
    { id: 'back', name: 'Back', active: false },
    { id: 'left', name: 'Left', active: false },
    { id: 'right', name: 'Right', active: false },
  ];

  const handleAddText = () => {
    // Add text element to current design
    console.log('Adding text element');
  };

  const handleAddImage = () => {
    // Add image element to current design
    console.log('Adding image element');
  };

  const handleSaveDesign = () => {
    // Save current design
    console.log('Saving design');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Design Studio</h1>
          <p className="mt-2 text-gray-600">Create amazing custom designs for your products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Tools */}
          <div className="lg:col-span-3">
            <Card className="p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
              <div className="space-y-2">
                {tools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant={selectedTool === tool.id ? 'primary' : 'outline'}
                    size="sm"
                    fullWidth
                    leftIcon={<tool.icon className="h-4 w-4" />}
                    onClick={() => setSelectedTool(tool.id as any)}
                  >
                    {tool.name}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">AI Assistant</h3>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                leftIcon={<SparklesIcon className="h-4 w-4" />}
                onClick={() => setShowAIModal(true)}
              >
                Generate Design
              </Button>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
              <div className="space-y-4">
                <Input
                  label="X Position"
                  type="number"
                  placeholder="0"
                  size="sm"
                />
                <Input
                  label="Y Position"
                  type="number"
                  placeholder="0"
                  size="sm"
                />
                <Input
                  label="Width"
                  type="number"
                  placeholder="100"
                  size="sm"
                />
                <Input
                  label="Height"
                  type="number"
                  placeholder="100"
                  size="sm"
                />
              </div>
            </Card>
          </div>

          {/* Main Canvas Area */}
          <div className="lg:col-span-6">
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {views.map((view) => (
                    <Button
                      key={view.id}
                      variant={currentView === view.id ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentView(view.id as any)}
                    >
                      {view.name}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={previewMode === '2d' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('2d')}
                  >
                    2D
                  </Button>
                  <Button
                    variant={previewMode === '3d' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('3d')}
                  >
                    3D
                  </Button>
                </div>
              </div>

              <div className="relative bg-white rounded-lg border-2 border-gray-200 aspect-square">
                {previewMode === '2d' ? (
                  <Stage
                    ref={stageRef}
                    width={500}
                    height={500}
                    className="border rounded-lg"
                  >
                    <Layer>
                      <Rect
                        x={0}
                        y={0}
                        width={500}
                        height={500}
                        fill="#f3f4f6"
                      />
                      <Text
                        x={50}
                        y={50}
                        text="Your Design Here"
                        fontSize={24}
                        fill="#374151"
                        fontFamily="Arial"
                      />
                    </Layer>
                  </Stage>
                ) : (
                  <ProductViewer view={currentView} />
                )}
              </div>
            </Card>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<EyeIcon className="h-4 w-4" />}
                >
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<DevicePhoneMobileIcon className="h-4 w-4" />}
                >
                  Mobile Preview
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Save Draft
                </Button>
                <Button variant="primary" size="sm" onClick={handleSaveDesign}>
                  Save Design
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Layers & History */}
          <div className="lg:col-span-3">
            <Card className="p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Layers</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                  <span className="text-sm font-medium">Text Layer</span>
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <span className="text-sm font-medium">Background</span>
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">History</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  Added text element
                </div>
                <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  Changed background color
                </div>
                <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  Moved element
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title="AI Design Generator"
        size="lg"
      >
        <AIDesignGenerator onClose={() => setShowAIModal(false)} />
      </Modal>
    </div>
  );
};