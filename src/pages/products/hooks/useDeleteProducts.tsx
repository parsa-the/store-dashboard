import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../ProductTypes";
import { deleteProduct } from "../../../utils/axiosCofig";
const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  return useMutation<number, Error, Product>({
    mutationFn: deleteProduct,
    onSuccess: (deletedID) => {
      {
        queryClient.setQueriesData<Product[]>(
          { queryKey: ["products"] },
          (products) =>
            products?.filter((products) => products.id !== deletedID),
        );
      }
    },
  });
};

export default useDeleteProducts;
