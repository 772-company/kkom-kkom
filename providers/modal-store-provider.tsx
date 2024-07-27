"use client";

import {
  ModalStore,
  createModalStore,
  initModalStore,
} from "@/stores/modal-store";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type ModalStoreApi = ReturnType<typeof createModalStore>;

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(
  undefined,
);

export interface ModalStoreProviderProps {
  children: ReactNode;
}

export const ModalStoreProvider = ({ children }: ModalStoreProviderProps) => {
  const storeRef = useRef<ModalStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createModalStore(initModalStore());
  }

  return (
    <ModalStoreContext.Provider value={storeRef.current}>
      {children}
    </ModalStoreContext.Provider>
  );
};

export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
  const modalStoreContext = useContext(ModalStoreContext);

  if (!modalStoreContext) {
    throw new Error(`useModalStore must be used within ModalStoreProvider`);
  }

  return useStore(modalStoreContext, selector);
};
