import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { fetchProducts, fetchCategories } from "../../../api/axiosCofig";

import type { ProductSortOption, ProductStatusFilter } from "../ProductTypes";

const PAGE_SIZE = 7;

export const useProductList = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<ProductStatusFilter>("all");
  const [sort, setSort] = useState<ProductSortOption>("newest");
  const [page, setPage] = useState(1);

  // Fetch products
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });

  //search filter sort
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    const filtered = products.filter((products) => {
      const matchesSearch =
        products.title.toLowerCase().includes(query) ||
        products.category.toLocaleLowerCase().includes(query) ||
        products.sku.toLocaleLowerCase().includes(query);

      const matchesCategory =
        category === "all" || products.category === category;

      const MatchesStatus = status === "all" || products.status === status;

      return matchesCategory && matchesSearch && MatchesStatus;
    });
    return filtered.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.createdAt.localeCompare(b.createdAt);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;

        case "newest":
        default:
          return b.createdAt.localeCompare(a.createdAt);
      }
    });
  }, [products, search, category, status, sort]);

  //pagination
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  const currentPage = Math.min(page, pageCount);

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Update filters and return to the first page
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value: ProductStatusFilter) => {
    setStatus(value);
    setPage(1);
  };
  const handleSortChange = (value: ProductSortOption) => {
    setSort(value);
    setPage(1);
  };

  return {
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
    pageSize: PAGE_SIZE,
    handleSearchChange,
    handleCategoryChange,
    handleStatusChange,
    handleSortChange,
    setPage,
  };
};

