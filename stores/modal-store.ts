import { createStore } from "zustand/vanilla";

export type ModalState = {
  isOpen: boolean;
};

export type ModalActions = {
  openModal: () => void;
  closeModal: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const initModalStore = (): ModalState => {
  return { isOpen: false };
};

export const defaultInitState: ModalState = {
  isOpen: false,
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    openModal: () => set((state) => ({ isOpen: true })),
    closeModal: () => set((state) => ({ isOpen: false })),
  }));
};
