"use client";

import {
  OverlayStore,
  createOverlayStore,
  initOverlayStore,
} from "@/stores/modal-store";
import {
  Fragment,
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";

export type OverlayStoreApi = ReturnType<typeof createOverlayStore>;

export const OverlayStoreContext = createContext<OverlayStoreApi | undefined>(
  undefined,
);

export const OverlayStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<OverlayStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createOverlayStore(initOverlayStore());
  }
  return (
    <OverlayStoreContext.Provider value={storeRef.current}>
      {children}
    </OverlayStoreContext.Provider>
  );
};

export const OverlayProvider = () => {
  const store = useOverlayStore((store) => store);
  return (
    <>
      {[...store.ElementsInMemory.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>
  );
};

export const useOverlayStore = <T,>(
  selector: (store: OverlayStore) => T,
): T => {
  const overlayStoreContext = useContext(OverlayStoreContext);

  if (!overlayStoreContext) {
    throw new Error(`useModalStore must be used within ModalStoreProvider`);
  }

  return useStoreWithEqualityFn(overlayStoreContext, selector);
};
