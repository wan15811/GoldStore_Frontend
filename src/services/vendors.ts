import { api } from "@/services/api";

export interface VendorData {
  vendorName: string;
  vendorCode: string;
  vendorAddress: string;
}

export interface UpdateVendorData {
  vendorName?: string;
  vendorCode?: string;
  vendorAddress?: string;
}

async function createVendor(vendorData: VendorData): Promise<any> {
  try {
    const response = await api("/vendors/", {
      method: "POST",
      body: JSON.stringify(vendorData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error;
  }
}

async function updateVendor(
  id: number,
  updateData: UpdateVendorData,
): Promise<any> {
  try {
    const response = await api(`/vendors/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw error;
  }
}

async function deleteVendor(id: string): Promise<any> {
  try {
    const response = await api(`/vendors/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing vendor:", error);
    throw error;
  }
}

async function getAllVendors(page: number = 1): Promise<any> {
  try {
    const response = await api(`/vendors/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all vendors:", error);
    throw error;
  }
}

export { createVendor, updateVendor, deleteVendor, getAllVendors };
