import { ShopType } from "@/services/api/shop";
import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ShopType | undefined;
  setData: (data: ShopType) => void;
  resetData: () => void;
}

const useShopModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: undefined,
  setData: (data) => set({ data: data }),
  resetData: () => set({ data: undefined }),
}));

export default useShopModal;
