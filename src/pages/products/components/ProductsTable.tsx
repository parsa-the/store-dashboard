import { CircleX, PackageXFreeIcons } from "@hugeicons/core-free-icons";
import { type ProductsTableProps } from "../ProductTypes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loader } from "lucide-react";

const ProductsTable = ({
  isError,
  isLoading,
  onRetry,
  products,
}: ProductsTableProps) => {
  if (isLoading) {
    return (
      <div className="flex gap-5  flex-col min-h-64 items-center justify-center">
        <Loader size={30} className="animate-spin" />
        <p className="flex items-center gap-2 flex-col">
          <span className="text-md font-semibold text-zinc-600">
            Loading products...
          </span>
          <span className="text-sm text-zinc-500">Please wait</span>
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-5 p-6 text-center">
        <HugeiconsIcon size={50} className="text-red-500" icon={CircleX} />
        <p className=" gap-2 flex flex-col ">
          <span className="text-md font-semibold ">Something went wrong !</span>
          <span className="text-xs text-zinc-500">
            Failed to load products Please try again.
          </span>
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-5 p-6">
        <HugeiconsIcon
          size={50}
          className="text-blue-500"
          icon={PackageXFreeIcons}
        />
        <p className=" gap-2 flex flex-col ">
          <span className="text-md font-semibold ">No products found </span>
          <span className="text-xs text-zinc-500">
            Try changing your filters.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <table className="w-full min-w-200 text-left text-sm">
        <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr key={product.id} className="transition hover:bg-slate-50">
              {/* Image */}
              <td className="px-4 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-100 bg-white p-1">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
              </td>

              {/* Product name and SKU */}
              <td className="max-w-64 px-4 py-3">
                <p
                  title={product.title}
                  className="truncate font-medium text-slate-800"
                >
                  {product.title}
                </p>

                <p className="mt-1 text-xs text-slate-400">{product.sku}</p>
              </td>

              {/* Category */}
              <td className="px-4 py-3">
                <span className="inline-flex max-w-40 truncate rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  {product.category}
                </span>
              </td>

              {/* Price */}
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </td>

              {/* Stock */}
              <td className="whitespace-nowrap px-4 py-3">
                <span className="inline-flex items-center gap-2 text-xs text-slate-600">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      product.stock > 0 ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />

                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </span>
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    product.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
