import { create } from "zustand";

interface UseCreatePodruct {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateProduct = create<UseCreatePodruct>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));