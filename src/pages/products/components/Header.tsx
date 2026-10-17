import { Plus } from "lucide-react";
import useAppStore from "../../../store/AppStore";

const Header = () => {
  const setIsCreateProductsVisible = useAppStore(
    (e) => e.setIsAddProductsVisible,
  );
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-2xl font-bold sm:text-3xl">Products</h1>
        <p className="text-sm text-zinc-700 sm:text-base">
          Manage your store products
        </p>
      </div>

      <button
        onClick={setIsCreateProductsVisible}
        className="flex w-full shrink-0 items-center justify-center cursor-pointer gap-2 rounded-lg bg-blue-500 px-4 py-3 text-white transition-colors hover:bg-blue-600 sm:w-auto"
      >
        <Plus size={20} />
        <span className="whitespace-nowrap font-semibold">Add Products</span>
      </button>
    </header>
  );
};

export default Header;
