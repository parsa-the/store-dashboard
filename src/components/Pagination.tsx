import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ProductPaginationProps } from "../pages/products/ProductTypes";

const Pagination = ({
  currentPage,
  onPageChange,
  pageCount,
  pageSize,
  total,
}: ProductPaginationProps) => {
  if (total === 0) return null;

  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, total);

  return (
    <footer className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-zinc-600">
        Showing {firstItem}-{lastItem} of {total} Products
      </p>
      <div className="flex items-center justify-end gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          disabled={currentPage === pageCount}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </footer>
  );
};

export default Pagination;
