import { ReactNode } from "react";
import { devtools } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type OverlayState = {
  ElementsInMemory: Map<string, ReactNode>;
};

export type OverlayActions = {
  mount: (id: string, element: ReactNode) => void;
  unmount: (id: string) => void;
};

export type OverlayStore = OverlayState & OverlayActions;

export const initOverlayStore = (): OverlayState => {
  return { ElementsInMemory: new Map() };
};

export const defaultInitState: OverlayState = {
  ElementsInMemory: new Map(),
};

export const createOverlayStore = (
  initState: OverlayState = defaultInitState,
) => {
  return createStore<OverlayStore>()(
    devtools((set) => ({
      ...initState,
      mount: (id, element) => {
        set(
          (state) => {
            state.ElementsInMemory.set(id, element);
            return { ElementsInMemory: new Map(state.ElementsInMemory) };
          },
          undefined,
          "mount",
        );
      },
      unmount: (id) => {
        set(
          (state) => {
            state.ElementsInMemory.delete(id);
            return { ElementsInMemory: new Map(state.ElementsInMemory) };
          },
          undefined,
          "unmount",
        );
      },
    })),
  );
};
