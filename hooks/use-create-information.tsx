import { create } from "zustand";

interface UseCreateInformation {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateInformation = create<UseCreateInformation>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));