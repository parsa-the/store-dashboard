import { create } from "zustand";
import { persist } from "zustand/middleware";
interface IAppStore {
  Theme: "Dark" | "Light";
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
  setTheme: (theme: "Dark" | "Light") => void;
  isAddProductsVisible: boolean;
  setIsAddProductsVisible: () => void;
}

const useAppStore = create<IAppStore>()(
  persist(
    (set) => ({
      Theme: "Light",
      isSideBarOpen: false,
      isAddProductsVisible: false,
      toggleSideBar: () =>
        set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
      setTheme: (theme) => set({ Theme: theme }),
      setIsAddProductsVisible: () =>
        set((state) => ({ isAddProductsVisible: !state.isAddProductsVisible })),
    }),
    { name: "app-storage" },
  ),
);

export default useAppStore;
