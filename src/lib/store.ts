import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface AppState {
  cartCount: number;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
  activeProduct: any | null;
  cartItems: CartItem[];

  // Actions
  addToCart: (product: any, size: string, color: string) => void;
  removeFromCart: (itemId: number, size: string, color: string) => void;
  updateQuantity: (itemId: number, size: string, color: string, quantity: number) => void;
  setSearchOpen: (isOpen: boolean) => void;
  setCartOpen: (isOpen: boolean) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setActiveSection: (sectionId: string) => void;
  setActiveProduct: (product: any | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cartCount: 0,
  isSearchOpen: false,
  isCartOpen: false,
  isMobileMenuOpen: false,
  activeSection: 'home',
  activeProduct: null,
  cartItems: [],

  addToCart: (product, size, color) => set((state) => {
    const existingIndex = state.cartItems.findIndex(
      (item) => item.id === product.id && item.size === size && item.color === color
    );
    let newItems;
    if (existingIndex > -1) {
      newItems = state.cartItems.map((item, index) => 
        index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newItems = [
        ...state.cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color,
          quantity: 1,
        },
      ];
    }
    const newCount = newItems.reduce((acc, item) => acc + item.quantity, 0);
    return { cartItems: newItems, cartCount: newCount };
  }),

  removeFromCart: (itemId, size, color) => set((state) => {
    const newItems = state.cartItems.filter(
      (item) => !(item.id === itemId && item.size === size && item.color === color)
    );
    const newCount = newItems.reduce((acc, item) => acc + item.quantity, 0);
    return { cartItems: newItems, cartCount: newCount };
  }),

  updateQuantity: (itemId, size, color, quantity) => set((state) => {
    if (quantity <= 0) {
      const newItems = state.cartItems.filter(
        (item) => !(item.id === itemId && item.size === size && item.color === color)
      );
      const newCount = newItems.reduce((acc, item) => acc + item.quantity, 0);
      return { cartItems: newItems, cartCount: newCount };
    }
    const newItems = state.cartItems.map((item) => 
      item.id === itemId && item.size === size && item.color === color
        ? { ...item, quantity }
        : item
    );
    const newCount = newItems.reduce((acc, item) => acc + item.quantity, 0);
    return { cartItems: newItems, cartCount: newCount };
  }),

  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
  setActiveProduct: (product) => set({ activeProduct: product }),
}));
