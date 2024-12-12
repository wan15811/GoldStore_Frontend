import { api } from "@/services/api";

export interface AssetData {
  cashDrawer: {
    id: string;
  };
  assetType: string;
  amount: number;
}

async function createAsset(assetData: AssetData): Promise<any> {
  try {
    const response = await api("/assets/", {
      method: "POST",
      body: JSON.stringify(assetData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating asset:", error);
    throw error;
  }
}

async function deleteAsset(id: string): Promise<any> {
  try {
    const response = await api(`/assets/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing asset:", error);
    throw error;
  }
}

async function getAllAssets(page: number = 1, drawer_id: number): Promise<any> {
  try {
    const response = await api(`/assets/?page=${page}&drawer_id=${drawer_id}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all assets:", error);
    throw error;
  }
}

export { createAsset, deleteAsset, getAllAssets };
