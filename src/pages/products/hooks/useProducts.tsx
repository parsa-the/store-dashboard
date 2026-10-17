import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../api/axiosCofig";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useProducts;
