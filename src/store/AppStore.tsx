import { create } from "zustand";
import { persist } from "zustand/middleware";
interface IAppStore {
  Theme: "Dark" | "Light";
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
  setTheme: (theme: "Dark" | "Light") => void;
  isAddProductsVisible: boolean;
  setIsAddProductsVisible: () => void;
  isEditProductVisible: boolean;
  setIsEditProductVisible: () => void;
}

const useAppStore = create<IAppStore>()(
  persist(
    (set) => ({
      Theme: "Light",
      isSideBarOpen: false,
      isAddProductsVisible: false,
      isEditProductVisible: false,
      toggleSideBar: () =>
        set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
      setTheme: (theme) => set({ Theme: theme }),
      setIsAddProductsVisible: () =>
        set((state) => ({ isAddProductsVisible: !state.isAddProductsVisible })),
      setIsEditProductVisible: () =>
        set((state) => ({ isEditProductVisible: !state.isEditProductVisible })),
    }),
    { name: "app-storage" },
  ),
);

export default useAppStore;
