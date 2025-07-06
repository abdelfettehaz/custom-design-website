import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface ProductViewerProps {
  view: 'front' | 'back' | 'left' | 'right';
}

const TShirtModel: React.FC<{ view: string }> = ({ view }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const getRotationForView = (view: string) => {
    switch (view) {
      case 'front': return [0, 0, 0];
      case 'back': return [0, Math.PI, 0];
      case 'left': return [0, -Math.PI / 2, 0];
      case 'right': return [0, Math.PI / 2, 0];
      default: return [0, 0, 0];
    }
  };

  return (
    <group rotation={getRotationForView(view)}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial color={hovered ? '#3b82f6' : '#6b7280'} />
      </mesh>
    </group>
  );
};

export const ProductViewer: React.FC<ProductViewerProps> = ({ view }) => {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <TShirtModel view={view} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxDistance={10}
          minDistance={3}
        />
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
        />
      </Canvas>
    </motion.div>
  );
};