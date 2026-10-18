import { X } from "lucide-react";
import useAppStore from "../../../store/AppStore";
import useCategories from "../hooks/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import HandleImage from "../../../components/handleImage";
import { useForm, Controller } from "react-hook-form";
import {
  ProductInputSchema,
  type ProductInputValue,
  type ProductOutputValue,
} from "../../../schema";
import useCreateProduct from "../hooks/useCreateProduct";
const AddProducts = () => {
  const CloseModal = useAppStore((e) => e.setIsAddProductsVisible);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInputValue, any, ProductOutputValue>({
    resolver: zodResolver(ProductInputSchema),
    defaultValues: {
      image: null,
      title: "",
      category: "",
      price: undefined,
      stock: undefined,
      status: "Active",
      description: "",
    },
  });

  const { mutate, isPending } = useCreateProduct();

  const submitFunc = (data: ProductOutputValue) => {
    mutate(
      {
        values: data,
        id: Date.now(),
      },
      {
        onSuccess: () => {
          CloseModal();
        },
      },
    );
  };

  const { data: categories = [] } = useCategories();
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center backdrop-blur-xs bg-black/10 ">
      <div className="px-6 overflow-auto p-5 rounded-lg w-full h-full sm:h-[92%] sm:w-130 bg-white">
        <header className="flex pb-5 w-full justify-between items-center flex-row">
          <p className="font-semibold text-xl">Add Product</p>
          <button className="cursor-pointer text-zinc-300" onClick={CloseModal}>
            <X />
          </button>
        </header>

        <form
          onSubmit={handleSubmit(submitFunc)}
          className="flex-col gap-3 sm:gap-5 flex justify-between "
        >
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <HandleImage onImageChange={field.onChange} />
            )}
          />
          {errors.image && (
            <p className="text-xs text-red-600">{errors.image.message}</p>
          )}

          <div className="flex gap-2 flex-col">
            <label htmlFor="title">Product Name</label>
            <input
              type="text"
              className="p-3 focus:outline-none border rounded-md border-zinc-300"
              placeholder="Enter Product Name"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="category">Category</label>
            <select
              className="rounded-md border border-zinc-300 p-3 focus:outline-none"
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
              <p className="text-xs text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div className="flex justify-between flex-col gap-3 sm:flex-row">
            <div className="flex gap-2 flex-col">
              <label htmlFor="price">Price</label>
              <input
                min={0}
                step={0.1}
                className="p-3 focus:outline-none border rounded-md border-zinc-300"
                type="number"
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-xs text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div className="flex gap-2 flex-col">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                min={0}
                step={1}
                className="rounded-md border border-zinc-300 p-3 focus:outline-none"
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
              className="p-3 focus:outline-none border rounded-md border-zinc-300"
              {...register("status")}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-600">{errors.status.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              {...register("description")}
              className="min-h-30 border-zinc-300 p-2 rounded-md border focus:outline-none"
              placeholder="Enter Product description"
            />
            {errors.description && (
              <p className="text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <footer className="gap-4 flex justify-end">
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
              className="rounded-lg cursor-pointer bg-blue-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Product"}
            </button>
          </footer>
        </form>
      </div>
    </section>
  );
};

export default AddProducts;
