'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

// Define the cart item structure
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

// Define context type with updated addToCart accepting quantity
type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity: number }) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

// Create the actual context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook for accessing the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};

// CartProvider implementation
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Add or update item in the cart with quantity
  const addToCart = (
    item: Omit<CartItem, 'quantity'> & { quantity: number }
  ) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, { ...item }];
      }
    });
  };

  // Update quantity for a specific item
  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
      )
    );
  };

  // Remove an item from the cart
  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
