import { number, z } from "zod";

export const ProductSchema = z.object({
  title: z.string().trim().min(2, "Product name is required"),
  category: z.string().min(1, "Select a category"),
  price: number({ error: "Enter a valid price" }).positive(
    "Price  must be greater than 0",
  ),

  stock: z
    .number({ error: "Enter the stock quantity" })
    .int("Stock must be a whole number")
    .min(0, "Stock can not be nagative"),
  status: z.enum(["Active", "Inactive"]),
  description: z
    .string()
    .trim()
    .max(1000, "Keep the description under 1000 characters"),
  image: z.string(),
});

export type ProductFormValue = z.infer<typeof ProductSchema>;

export const ProductInputSchema = z.object({
  title: z.string().trim().min(2, "Product name is required"),
  category: z.string().min(1, "Select a category"),
  price: number({ error: "Enter a valid price" }).positive(
    "Price  must be greater than 0",
  ),

  stock: z
    .number({ error: "Enter the stock quantity" })
    .int("Stock must be a whole number")
    .min(0, "Stock can not be nagative"),
  status: z.enum(["Active", "Inactive"]),
  description: z
    .string()
    .trim()
    .max(1000, "Keep the description under 1000 characters"),
  image: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null, "Please upload a product image"),
});


export type ProductInputValue = z.input<typeof ProductInputSchema>;
export type ProductOutputValue = z.output<typeof ProductInputSchema>;