import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../../api/axiosCofig";
import type { Product } from "../ProductTypes";
import type { ProductFormValue } from "../../../schema";

interface UpdateProductVariables {
  existing: Product;
  values: ProductFormValue;
}

const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, UpdateProductVariables>({
    mutationFn: ({ existing, values }) => updateProduct(existing, values),

    onSuccess: (updatedProduct) => {
      queryClient.setQueriesData<Product[]>(
        { queryKey: ["products"] },
        (oldProducts) =>
          oldProducts?.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          ),
      );
    },
  });
};

export default useEditProduct;
