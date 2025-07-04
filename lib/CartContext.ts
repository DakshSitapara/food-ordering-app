import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [], 
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: quantity || 1 } : i
          ),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart',
    }
  )
);