import create from "zustand";

export const useNavbarStore = create<{
  show: boolean;
  setShow: (show: boolean) => void;
  transparent: boolean;
  setTransparent: (show: boolean) => void;
}>((set) => ({
  show: true,
  setShow: (show) => set(() => ({ show })),
  transparent: true,
  setTransparent: (transparent) => set(() => ({ transparent })),
}));
