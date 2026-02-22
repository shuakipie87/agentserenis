import { create } from 'zustand';
import type { Toast } from '@/types';
import { generateId } from '@/lib/utils';

interface UIState {
  isMobileNavOpen: boolean;
  toasts: Toast[];
}

interface UIActions {
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

type UIStore = UIState & UIActions;

const DEFAULT_TOAST_DURATION = 5000;

export const useUIStore = create<UIStore>((set, get) => ({
  // --- State ---
  isMobileNavOpen: false,
  toasts: [],

  // --- Actions ---
  openMobileNav: () => {
    set({ isMobileNavOpen: true });
  },

  closeMobileNav: () => {
    set({ isMobileNavOpen: false });
  },

  toggleMobileNav: () => {
    set({ isMobileNavOpen: !get().isMobileNavOpen });
  },

  addToast: (toast: Omit<Toast, 'id'>) => {
    const id = generateId();
    const duration = toast.duration ?? DEFAULT_TOAST_DURATION;

    set({ toasts: [...get().toasts, { ...toast, id }] });

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }

    return id;
  },

  removeToast: (id: string) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));
