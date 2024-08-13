"use client";

import { SortStore, createSortStore, initSortStore } from "@/stores/sort-store";
import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";

export type SortStoreApi = ReturnType<typeof createSortStore>;

export const SortStoreContext = createContext<SortStoreApi | undefined>(
  undefined,
);

export const SortStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<SortStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSortStore(initSortStore());
  }
  return (
    <SortStoreContext.Provider value={storeRef.current}>
      {children}
    </SortStoreContext.Provider>
  );
};

export const useSortStore = <T,>(selector: (store: SortStore) => T): T => {
  const sortStoreContext = useContext(SortStoreContext);

  if (!sortStoreContext) {
    throw new Error(`useModalStore must be used within ModalStoreProvider`);
  }

  return useStoreWithEqualityFn(sortStoreContext, selector);
};
