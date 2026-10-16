import { Search } from "lucide-react";
import {
  type ProductFilterProps,
  type ProductSortOption,
  type ProductStatusFilter,
} from "../ProductTypes";

const ProductFilters = ({
  categories,
  category,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onStatusChange,
  search,
  sort,
  status,
}: ProductFilterProps) => {
  return (
    <div className="grid grid-flow-col grid-cols-2 grid-rows-2 lg:grid-rows-1 gap-3 border-b border-slate-200 p-4 lg:flex-row">
      {/* Search */}
      <div className="relative min-w-0 flex-1">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
      >
        <option value="all">All Categories</option>

        {categories.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as ProductStatusFilter)
        }
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
      >
        <option value="all">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select
        value={sort}
        onChange={(event) =>
          onSortChange(event.target.value as ProductSortOption)
        }
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default ProductFilters;
