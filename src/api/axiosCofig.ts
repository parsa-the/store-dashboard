import axios from "axios";

const FetchData = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

export default FetchData;

import type { Product, ApiProduct } from "../pages/products/ProductTypes";
import type { ProductFormValue } from "../schema";

const DAY = 86_400_000;
const BASE_DATE = Date.UTC(2025, 0, 1);

const pad = (id: number) => `SKU-${String(id).padStart(3, "0")}`;

const brandOf = (title: string) => title.split(/[\s-]+/)[0] || "Generic";

/**
 * Convert the API response into our application's Product model.
 * Fake Store API does not provide stock, status, SKU, or dates,
 * so we derive demo values for those fields.
 */
function toProduct(p: ApiProduct): Product {
  const stock = p.id % 6 === 0 ? 0 : p.rating.count;
  const created = BASE_DATE + p.id * 6 * DAY;

  return {
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.image,

    stock,
    status: stock > 0 ? "Active" : "Inactive",

    brand: brandOf(p.title),
    sku: pad(p.id),

    createdAt: new Date(created).toISOString(),
    updatedAt: new Date(created + 20 * DAY).toISOString(),
  };
}

/**
 * Only send fields supported by Fake Store API.
 * Local image data URLs cannot be sent as regular image URLs.
 */
function remotePayload(values: ProductFormValue) {
  return {
    title: values.title,
    price: values.price,
    description: values.description,
    category: values.category,
    image: values.image.startsWith("http") ? values.image : "",
  };
}

// GET /products
export async function fetchProducts(): Promise<Product[]> {
  const { data } = await FetchData.get<ApiProduct[]>("/products");

  return data.map(toProduct);
}

// GET /products/categories
export async function fetchCategories(): Promise<string[]> {
  const { data } = await FetchData.get<string[]>("/products/categories");

  return data;
}

// POST /products
export async function createProduct(
  values: ProductFormValue,
  id: number,
): Promise<Product> {
  await FetchData.post("/products", remotePayload(values));

  const now = new Date().toISOString();

  return {
    id,
    ...values,

    brand: brandOf(values.title),
    sku: pad(id),

    createdAt: now,
    updatedAt: now,

    local: true,
  };
}

// PUT /products/:id
export async function updateProduct(
  existing: Product,
  values: ProductFormValue,
): Promise<Product> {
  if (!existing.local) {
    await FetchData.put(`/products/${existing.id}`, remotePayload(values));
  }

  return {
    ...existing,
    ...values,
    updatedAt: new Date().toISOString(),
  };
}

// DELETE /products/:id
export async function deleteProduct(existing: Product): Promise<number> {
  if (!existing.local) {
    await FetchData.delete(`/products/${existing.id}`);
  }

  return existing.id;
}
