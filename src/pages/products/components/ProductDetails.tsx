import { Calendar, Tag, Timer, TimerReset, X } from "lucide-react";
import type { Product } from "../ProductTypes";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onEdit: (product: Product) => void;
}

const formatDate = (value: string | Date) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const ProductDetailsModal = ({
  product,
  onClose,
  onEdit,
}: ProductDetailsModalProps) => {
  return (
    <section className="fixed inset-0 z-100 flex items-center justify-center bg-black/10 p-3 backdrop-blur-xs sm:p-5">
      <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white sm:max-h-[85dvh]">
        <header className="flex w-full shrink-0 items-center justify-between gap-3 border-b border-zinc-200 p-4">
          <p className="text-lg font-semibold sm:text-xl">Product Details</p>

          <button
            type="button"
            className="shrink-0 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-700"
            onClick={onClose}
            aria-label="Close product details"
          >
            <X size={22} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-5 p-4 text-left sm:flex-row sm:items-start sm:gap-8 sm:p-6 md:p-8">
            <div className="flex shrink-0 items-center justify-center sm:w-48">
              <div className="h-40 w-40 shrink-0 rounded-lg bg-zinc-100 p-2 sm:h-48 sm:w-48">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
              <p className="wrap-break-word text-lg font-bold sm:text-xl">
                {product.title}
              </p>

              <p className="text-xl font-bold sm:text-2xl">
                ${Number(product.price).toFixed(2)}
              </p>

              <span className="max-w-full truncate rounded-full bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
                {product.category}
              </span>

              <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                <span
                  className={`h-3 w-3 shrink-0 rounded-full ${
                    product.stock > 0 ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>

              <p className="text-sm leading-6 font-light text-zinc-600">
                {product.description}
              </p>
            </div>
          </div>

          <div className="px-4 pb-5 sm:px-6 md:px-8">
            <table className="w-full table-fixed border-collapse text-sm text-zinc-500 sm:text-base">
              <tbody>
                <tr className="border-b border-zinc-100">
                  <th className="w-2/5 py-3 pr-2 text-left font-semibold">
                    <span className="flex items-center gap-2">
                      <Tag size={17} className="shrink-0" />
                      Brand
                    </span>
                  </th>
                  <td className="wrap-break-word py-3 text-right">
                    {product.brand || "N/A"}
                  </td>
                </tr>

                <tr className="border-b border-zinc-100">
                  <th className="py-3 pr-2 text-left font-semibold">
                    <span className="flex items-center gap-2">
                      <TimerReset size={17} className="shrink-0" />
                      SKU
                    </span>
                  </th>
                  <td className="wrap-break-word py-3 text-right">
                    {product.sku || "N/A"}
                  </td>
                </tr>

                <tr className="border-b border-zinc-100">
                  <th className="py-3 pr-2 text-left font-semibold">
                    <span className="flex items-center gap-2">
                      <Calendar size={17} className="shrink-0" />
                      Created at
                    </span>
                  </th>
                  <td className="py-3 text-right text-xs leading-5 sm:text-sm">
                    {formatDate(product.createdAt)}
                  </td>
                </tr>

                <tr>
                  <th className="py-3 pr-2 text-left font-semibold">
                    <span className="flex items-center gap-2">
                      <Timer size={17} className="shrink-0" />
                      Updated at
                    </span>
                  </th>
                  <td className="py-3 text-right text-xs leading-5 sm:text-sm">
                    {formatDate(product.updatedAt)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => onEdit(product)}
              className="w-full mt-5 bg-blue-500 p-3 text-white font-black rounded-lg cursor-pointer"
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsModal;
