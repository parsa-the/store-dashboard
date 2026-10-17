import Header from "./components/Header";
import Statistics from "./Statistics";
import ProductsPanel from "./components/ProductsPanel";
import AddProducts from "./components/AddProducts";
import useAppStore from "../../store/AppStore";

const Products = () => {
  const isCreateProductsVisible = useAppStore((e) => e.isAddProductsVisible);
  return (
    <main className="flex min-h-full w-full min-w-0 flex-1 flex-col gap-4 bg-slate-100 p-4 sm:gap-6 sm:p-6 lg:p-8">
      <Header />

      <Statistics />

      <ProductsPanel />

      {isCreateProductsVisible && <AddProducts />}
    </main>
  );
};

export default Products;
