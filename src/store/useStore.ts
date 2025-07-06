import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Design, Product, CartItem, Order, Theme } from '../types';

interface AppState {
  // User Management
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  
  // Theme
  theme: Theme['name'];
  toggleTheme: () => void;
  
  // Design Studio
  currentDesign: Design | null;
  designs: Design[];
  setCurrentDesign: (design: Design | null) => void;
  saveDesign: (design: Design) => void;
  deleteDesign: (designId: string) => void;
  
  // Products
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Shopping Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  
  // UI State
  sidebarOpen: boolean;
  modalOpen: boolean;
  loading: boolean;
  setSidebarOpen: (open: boolean) => void;
  setModalOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User Management
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({ 
        user: state.user ? { ...state.user, ...updates } : null 
      })),
      
      // Theme
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      
      // Design Studio
      currentDesign: null,
      designs: [],
      setCurrentDesign: (design) => set({ currentDesign: design }),
      saveDesign: (design) => set((state) => ({
        designs: [
          ...state.designs.filter(d => d.id !== design.id),
          design
        ]
      })),
      deleteDesign: (designId) => set((state) => ({
        designs: state.designs.filter(d => d.id !== designId)
      })),
      
      // Products
      products: [],
      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      
      // Shopping Cart
      cart: [],
      addToCart: (item) => set((state) => ({
        cart: [...state.cart, item]
      })),
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== itemId)
      })),
      updateCartItem: (itemId, updates) => set((state) => ({
        cart: state.cart.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        )
      })),
      clearCart: () => set({ cart: [] }),
      
      // Orders
      orders: [],
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, order]
      })),
      updateOrder: (orderId, updates) => set((state) => ({
        orders: state.orders.map(order => 
          order.id === orderId ? { ...order, ...updates } : order
        )
      })),
      
      // UI State
      sidebarOpen: false,
      modalOpen: false,
      loading: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setModalOpen: (open) => set({ modalOpen: open }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'tshirt-design-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        designs: state.designs,
        cart: state.cart,
        orders: state.orders,
      }),
    }
  )
);