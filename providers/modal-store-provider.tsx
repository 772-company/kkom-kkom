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

/**
 * 모달을 열고 닫는 스토어입니다.
 * context provider 내에서 사용해야 합니다.
 * 스토어 전체를 사용하거나 일부만 사용할 수 있습니다.
 * 스토어 전체를 사용할 경우 하나만 바뀌어도 전체를 사용했던 컴포넌트는 모두 리렌더링됩니다.
 * 되도록 일부만 사용하는 것이 좋습니다.
 * @author 이승현
 * @param selector
 * @returns store 데이터
 * @example
 * // 스토어 전체 사용
 * const { isOpen, openModal, closeModal } = useModalStore((store) => store);
 * // 스토어 일부 사용
 * const { isOpen } = useModalStore((store) => ({ isOpen: store.isOpen }));
 */
export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
  const modalStoreContext = useContext(ModalStoreContext);

  if (!modalStoreContext) {
    throw new Error(`useModalStore must be used within ModalStoreProvider`);
  }

  return useStore(modalStoreContext, selector);
};
