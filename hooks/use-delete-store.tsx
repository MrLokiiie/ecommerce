import { create } from "zustand";

interface UseDeleteStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDeleteStore = create<UseDeleteStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));