export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  status: "Active" | "Inactive";
  brand: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
  local?: boolean;
}

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export type ProductStatusFilter = "all" | Product["status"];

export type ProductSortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high";

export interface ProductFilterProps {
  search: string;
  category: string;
  status: "all" | Product["status"];
  sort: ProductSortOption;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: ProductStatusFilter) => void;
  onSortChange: (value: ProductSortOption) => void;
}

export type ProductsTableProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export type ProductPaginationProps = {
  total: number;
  pageSize: number;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};
