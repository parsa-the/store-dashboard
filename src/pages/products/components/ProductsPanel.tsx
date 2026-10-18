import ProductFilters from "./ProductFilters";
import ProductsTable from "./ProductsTable";
import Pagination from "../../../components/Pagination";

import { useProductList } from "../hooks/useProductsList";
import type { Product } from "../ProductTypes";

interface ProductsPanelProps {
  onEditProduct: (product: Product) => void;
}

const ProductsPanel = ({ onEditProduct }: ProductsPanelProps) => {
  const {
    search,
    category,
    status,
    sort,
    categories,
    filteredProducts,
    visibleProducts,
    isLoading,
    isError,
    refetch,
    currentPage,
    pageCount,
    pageSize,
    handleSearchChange,
    handleCategoryChange,
    handleStatusChange,
    handleSortChange,
    setPage,
  } = useProductList();

  return (
    <section className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 p-4 sm:px-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            All Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your product inventory
          </p>
        </div>
      </div>

      <ProductFilters
        search={search}
        category={category}
        status={status}
        sort={sort}
        categories={categories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />

      <ProductsTable
        products={visibleProducts}
        isLoading={isLoading}
        isError={isError}
        onEditProduct={onEditProduct}
        onRetry={() => {
          void refetch();
        }}
      />

      {!isLoading && !isError && (
        <Pagination
          total={filteredProducts.length}
          pageSize={pageSize}
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={setPage}
        />
      )}
    </section>
  );
};

export default ProductsPanel;
