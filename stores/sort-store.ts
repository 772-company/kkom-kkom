import { devtools } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type SortState = {
  keyword: string;
  orderBy: "like" | "recent";
  page: number;
};

export type SortActions = {
  setKeyword: (keyword: string) => void;
  setOrderBy: (orderBy: "like" | "recent") => void;
  setPage: (page: number) => void;
  reset: () => void;
};

export type SortStore = SortState & SortActions;

export const initSortStore = (): SortState => {
  return { keyword: "", orderBy: "recent", page: 1 };
};

export const defaultInitState: SortState = {
  keyword: "",
  orderBy: "recent",
  page: 1,
};

export const createSortStore = (initState: SortState = defaultInitState) => {
  return createStore<SortStore>()(
    devtools((set) => ({
      ...initState,
      setKeyword: (keyword) => {
        set({ keyword });
      },
      setOrderBy: (orderBy) => {
        set({ orderBy });
      },
      setPage: (page) => {
        set({ page });
      },
      reset: () => {
        set({ keyword: "", orderBy: "recent", page: 1 });
      },
    })),
  );
};
