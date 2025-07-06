export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isAdmin?: boolean;
  preferences?: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr' | 'ar';
  notifications: boolean;
}

export interface Design {
  id: string;
  name: string;
  userId: string;
  productId: string;
  elements: DesignElement[];
  preview: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
}

export interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  properties: TextProperties | ImageProperties | ShapeProperties;
}

export interface TextProperties {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: 'left' | 'center' | 'right';
}

export interface ImageProperties {
  src: string;
  filters: ImageFilter[];
}

export interface ShapeProperties {
  fill: string;
  stroke: string;
  strokeWidth: number;
  shapeType: 'rectangle' | 'circle' | 'triangle' | 'polygon';
}

export interface ImageFilter {
  type: 'blur' | 'brightness' | 'contrast' | 'saturation' | 'hue';
  value: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  materials: ProductMaterial[];
  description: string;
  features: string[];
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  view: 'front' | 'back' | 'left' | 'right';
  color: string;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface ProductSize {
  id: string;
  name: string;
  measurements: Record<string, number>;
  priceModifier: number;
}

export interface ProductMaterial {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface CartItem {
  id: string;
  designId: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
  material: string;
  price: number;
  customization: CustomizationOptions;
}

export interface CustomizationOptions {
  front?: Design;
  back?: Design;
  left?: Design;
  right?: Design;
  name?: string;
  number?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AIRequest {
  prompt: string;
  style?: 'realistic' | 'cartoon' | 'minimalist' | 'vintage';
  colors?: string[];
  size?: 'small' | 'medium' | 'large';
}

export interface AIResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  credits?: number;
}

export interface Theme {
  name: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}