import { create } from "zustand";

interface UseDeleteProduct {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDeleteProduct = create<UseDeleteProduct>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));