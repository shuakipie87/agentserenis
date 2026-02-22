import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';
import { calculateItemTotal } from '@/lib/utils';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateWeight: (productId: string, weightGrams: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

interface CartComputed {
  totalItems: () => number;
  subtotal: () => number;
}

type CartStore = CartState & CartActions & CartComputed;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // --- State ---
      items: [],
      isOpen: false,

      // --- Actions ---
      addItem: (item: CartItem) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (i) => i.productId === item.productId && i.weightGrams === item.weightGrams,
        );

        if (existingIndex > -1) {
          // Increment quantity if same product and same weight
          const updatedItems = [...items];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + item.quantity,
          };
          set({ items: updatedItems, isOpen: true });
        } else {
          set({ items: [...items, item], isOpen: true });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
        });
      },

      updateWeight: (productId: string, weightGrams: number) => {
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, weightGrams } : item,
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleDrawer: () => {
        set({ isOpen: !get().isOpen });
      },

      openDrawer: () => {
        set({ isOpen: true });
      },

      closeDrawer: () => {
        set({ isOpen: false });
      },

      // --- Computed ---
      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + calculateItemTotal(item.pricePerKg, item.weightGrams, item.quantity),
          0,
        );
      },
    }),
    {
      name: 'meatshop-cart',
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
