import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../../utils/axiosCofig";
import type { ProductOutputValue } from "../../../schema";
import type { Product } from "../ProductTypes";

interface CreateProductVariables {
  values: ProductOutputValue;
  id: number;
}

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-product"],

    mutationFn: ({ values, id }: CreateProductVariables) =>
      createProduct(values, id),

    onSuccess: (newProduct) => {
      queryClient.setQueryData<Product[]>(["products"], (products = []) => [
        newProduct,
        ...products.filter((product) => product.id !== newProduct.id),
      ]);
    },
  });
};

export default useCreateProduct;
