import type { Product, ApiProduct } from "../pages/products/ProductTypes";

import type { ProductFormValue, ProductOutputValue } from "../schema";
import axios from "axios";
const FetchData = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const START_DATE = Date.UTC(2025, 0, 1);

// Generate a SKU, such as SKU-001.
function generateSKU(id: number) {
  return `SKU-${String(id).padStart(3, "0")}`;
}

// Use the first word of the product title as its brand.
function getBrand(title: string) {
  return title.split(/[\s-]+/)[0] || "Generic";
}

// Convert the API product into the format used by our app.
function formatProduct(product: ApiProduct): Product {
  const stock = product.id % 6 === 0 ? 0 : product.rating.count;

  const createdDate = new Date(START_DATE + product.id * 6 * DAY_IN_MS);

  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,

    stock,
    status: stock > 0 ? "Active" : "Inactive",

    brand: getBrand(product.title),
    sku: generateSKU(product.id),

    createdAt: createdDate.toISOString(),
    updatedAt: new Date(createdDate.getTime() + 20 * DAY_IN_MS).toISOString(),
  };
}

// Send only the fields supported by the API.
function formatProductForAPI(values: ProductFormValue) {
  return {
    title: values.title,
    price: values.price,
    description: values.description,
    category: values.category,
    image: values.image.startsWith("http") ? values.image : "",
  };
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read product image"));
      }
    };

    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read product image"));
    };

    reader.readAsDataURL(file);
  });
}

// Get all products.
export async function fetchProducts(): Promise<Product[]> {
  const { data } = await FetchData.get<ApiProduct[]>("/products");

  return data.map(formatProduct);
}

// Get all categories.
export async function fetchCategories(): Promise<string[]> {
  const { data } = await FetchData.get<string[]>("/products/categories");

  return data;
}

// Create a product.

export async function createProduct(
  values: ProductOutputValue,
  id: number,
): Promise<Product> {
  if (!values.image) {
    throw new Error("Please upload a product image");
  }

  const image = await fileToDataURL(values.image);

  const productValues: ProductFormValue = {
    ...values,
    image,
  };

  await FetchData.post("/products", formatProductForAPI(productValues));

  const now = new Date().toISOString();

  return {
    id,
    ...productValues,
    brand: getBrand(productValues.title),
    sku: generateSKU(id),
    createdAt: now,
    updatedAt: now,
    local: true,
  };
}

// Update a product.
export async function updateProduct(
  existing: Product,
  values: ProductFormValue,
): Promise<Product> {
  if (!existing.local) {
    await FetchData.put(
      `/products/${existing.id}`,
      formatProductForAPI(values),
    );
  }

  return {
    ...existing,
    ...values,
    updatedAt: new Date().toISOString(),
  };
}

// Delete a product.
export async function deleteProduct(existing: Product): Promise<number> {
  if (!existing.local) {
    await FetchData.delete(`/products/${existing.id}`);
  }

  return existing.id;
}
