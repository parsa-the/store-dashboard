import Header from "./components/Header";
import Statistics from "./components/Statistics";
import ProductsPanel from "./components/ProductsPanel";
import AddProducts from "./components/AddProducts";
import useAppStore from "../../store/AppStore";
import EditProducts from "./components/EditProducts";
import { useState } from "react";
import type { Product } from "./ProductTypes";

const Products = () => {
  const isCreateProductsVisible = useAppStore((e) => e.isAddProductsVisible);
  const isEditProductsVisible = useAppStore((e) => e.isEditProductVisible);
  const setIsEditVisible = useAppStore((e) => e.setIsEditProductVisible);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEditProduct = (Products: Product) => {
    setSelectedProduct(Products);
    setIsEditVisible();
  };
  return (
    <main className="flex min-h-full w-full min-w-0 flex-1 flex-col gap-4 bg-slate-100 p-4 sm:gap-6 sm:p-6 lg:p-8">
      <Header />
      <Statistics />
      <ProductsPanel onEditProduct={handleEditProduct} />{" "}
      {isCreateProductsVisible && <AddProducts />}
      {isEditProductsVisible && selectedProduct && (
        <EditProducts product={selectedProduct} />
      )}{" "}
    </main>
  );
};

export default Products;
