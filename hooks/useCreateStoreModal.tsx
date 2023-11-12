import { create } from "zustand";

interface UseCreateStoreModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateStore = create<UseCreateStoreModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));