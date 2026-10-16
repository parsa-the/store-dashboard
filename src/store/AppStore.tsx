import { create } from "zustand";
import { persist } from "zustand/middleware/persist";

interface IAppStore {
  Theme: "Dark" | "Light";
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
  setTheme: (theme: "Dark" | "Light") => void;
}

const useAppStore = create<IAppStore>()(
  persist(
    (set) => ({
      Theme: "Light",
      isSideBarOpen: false,
      toggleSideBar: () =>
        set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
      setTheme: (theme) => set({ Theme: theme }),
    }),
    { name: "app-storage" },
  ),
);

export default useAppStore;
