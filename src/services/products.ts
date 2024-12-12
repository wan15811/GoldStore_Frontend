import { api } from "@/services/api";

export interface ProductData {
  productName: string;
  category: string;
  goldPrice: {
    goldType: string;
  };
  totalWeight: number;
  goldWeight: number;
  gemWeight: number;
  wage: number;
  vendor: {
    id: number;
  };
}

export interface UpdateProductData {
  productName?: string;
  category?: string;
  goldPrice?: {
    goldType: string;
  };
  totalWeight?: number;
  goldWeight?: number;
  gemWeight?: number;
  wage?: number;
  vendor?: {
    id: number;
  };
}

async function createProduct(productData: ProductData): Promise<any> {
  try {
    const response = await api("/products/", {
      method: "POST",
      body: JSON.stringify(productData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

async function updateProduct(
  id: number,
  updateData: UpdateProductData,
): Promise<any> {
  try {
    const response = await api(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

async function deleteProduct(id: string): Promise<any> {
  try {
    const response = await api(`/products/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing product:", error);
    throw error;
  }
}

async function getAllProducts(page: number = 1): Promise<any> {
  try {
    const response = await api(`/products/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all products:", error);
    throw error;
  }
}

export { createProduct, updateProduct, deleteProduct, getAllProducts };
