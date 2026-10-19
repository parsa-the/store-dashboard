import { Trash, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAppStore from "../../../store/AppStore";
import {
  EditProductSchema,
  type EditProductInputValue,
  type EditProductOutputValue,
  type ProductFormValue,
} from "../../../schema";
import useDeleteProducts from "../hooks/useDeleteProducts";
import useCategories from "../hooks/useCategories";
import useEditProduct from "../hooks/useEditProduct";
import type { Product } from "../ProductTypes";
import EditProductImage from "./EditImage";
import fileToDataUrl from "../../../utils/fileToDataUrl";

interface EditProps {
  product: Product;
}

const EditProducts = ({ product }: EditProps) => {
  const CloseModal = useAppStore((state) => state.setIsEditProductVisible);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductInputValue, any, EditProductOutputValue>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      image: null,
      title: product.title,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      description: product.description,
    },
  });
  const { mutate: deleteMutation, isPending: isDeletePend } =
    useDeleteProducts();
  const { mutate, isPending } = useEditProduct();
  const { data: categories = [] } = useCategories();

  const handleDelete = () => {
    deleteMutation(product, {
      onSuccess: () => CloseModal(),
      onError: (err: any) => console.error("deleting failed", err),
    });
  };

  const submitFunc = async (data: EditProductOutputValue) => {
    try {
      const values: ProductFormValue = {
        title: data.title,
        category: data.category,
        price: data.price,
        stock: data.stock,
        status: data.status,
        description: data.description,
        image:
          data.image instanceof File
            ? await fileToDataUrl(data.image)
            : product.image,
      };

      mutate(
        {
          existing: product,
          values,
        },
        {
          onSuccess: () => CloseModal(),
          onError: (error) => console.error("Update failed:", error),
        },
      );
    } catch (error) {
      console.error("Failed to process image:", error);
    }
  };

  return (
    <section className="fixed inset-0 z-100 flex items-center justify-center bg-black/10 p-3 backdrop-blur-xs sm:p-5">
      <div className="flex h-full max-h-[94dvh] w-full flex-col overflow-hidden rounded-lg bg-white p-4 sm:h-[75%]
       sm:w-230 sm:p-5">
        <header className="flex border-b border-zinc-200 w-full shrink-0 flex-row items-center justify-between gap-3 pb-5">
          <p className="text-xl font-semibold">Edit Product</p>
          <button
            type="button"
            className="shrink-0 cursor-pointer text-zinc-300"
            onClick={CloseModal}
          >
            <X />
          </button>
        </header>

        <form
          onSubmit={handleSubmit(submitFunc)}
          className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto mt-5 md:flex-row md:justify-between"
        >
          <div className="flex mt-1 shrink-0 flex-col items-center gap-5 md:w-40">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <EditProductImage
                  image={product.image}
                  onChange={field.onChange}
                  error={errors.image?.message}
                />
              )}
            />
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeletePend || isPending}
              className="flex items-center gap-2 text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash size={20} />
              <span>{isDeletePend ? "Deleting..." : "Remove "}</span>
            </button>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Product Name</label>
              <input
                id="title"
                type="text"
                className="w-full min-w-0 rounded-md border border-zinc-300 p-3 focus:outline-none"
                placeholder="Enter Product Name"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="w-full min-w-0 rounded-md border border-zinc-300 p-3 focus:outline-none"
                {...register("category")}
              >
                <option value="">Select a category</option>
                {categories.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  min={0}
                  step={0.01}
                  className="w-full min-w-0 rounded-md border border-zinc-300 p-3 focus:outline-none"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-xs text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  type="number"
                  min={0}
                  step={1}
                  className="w-full min-w-0 rounded-md border border-zinc-300 p-3 focus:outline-none"
                  {...register("stock", { valueAsNumber: true })}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="text-xs text-red-600">{errors.stock.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="w-full rounded-md border border-zinc-300 p-3 focus:outline-none"
                {...register("status")}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-xs text-red-600">{errors.status.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                {...register("description")}
                className="min-h-30 w-full resize-y rounded-md border border-zinc-300 p-2 focus:outline-none"
                placeholder="Enter Product description"
              />
              {errors.description && (
                <p className="text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <footer className="flex justify-end gap-4">
              <button
                type="button"
                onClick={CloseModal}
                className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-3 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="cursor-pointer rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Product"}
              </button>
            </footer>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProducts;
