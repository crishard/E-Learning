import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '../types/cart';

interface CartStore {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: { items: [], total: 0 },
      addItem: (item) =>
        set((state) => {
          if (state.cart.items.some((i) => i.courseId === item.courseId)) {
            return state;
          }
          const newItems = [...state.cart.items, item];
          return {
            cart: {
              items: newItems,
              total: newItems.reduce((sum, item) => sum + item.price, 0),
            },
          };
        }),
      removeItem: (courseId) =>
        set((state) => {
          const newItems = state.cart.items.filter((item) => item.courseId !== courseId);
          return {
            cart: {
              items: newItems,
              total: newItems.reduce((sum, item) => sum + item.price, 0),
            },
          };
        }),
      clearCart: () => set({ cart: { items: [], total: 0 } }),
      isInCart: (courseId) => get().cart.items.some((item) => item.courseId === courseId),
    }),
    {
      name: 'cart-storage',
      skipHydration: false,
    }
  )
);

