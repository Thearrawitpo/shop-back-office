import { BannerType } from "@/services/api/banner";
import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: BannerType | undefined;
  setData: (data: BannerType) => void;
  resetData: () => void;
}

const useBannerModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: undefined,
  setData: (data) => set({ data: data }),
  resetData: () => set({ data: undefined }),
}));

export default useBannerModal;
