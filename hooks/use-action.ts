import { create } from "zustand";

interface ActionStore {
  del: boolean;
  toggleDel: () => void;
}

const useAction = create<ActionStore>((set) => ({
  del: false,
  toggleDel: () =>
    set((state) => ({
      del: !state.del,
    })),
}));

export default useAction;
