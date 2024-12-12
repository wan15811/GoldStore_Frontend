import { api } from "@/services/api";

export interface GoldPriceData {
  goldType: string;
  askPrice: number;
  bidPrice: number;
}

export interface UpdateGoldPriceData {
  askPrice?: number;
  bidPrice?: number;
}

async function createGoldPrice(goldPriceData: GoldPriceData): Promise<any> {
  try {
    const response = await api("/prices/", {
      method: "POST",
      body: JSON.stringify(goldPriceData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating gold price:", error);
    throw error;
  }
}

async function updateGoldPrice(
  goldType: string,
  updateData: UpdateGoldPriceData,
): Promise<any> {
  try {
    const response = await api(`/prices/${goldType}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating gold price:", error);
    throw error;
  }
}

async function deleteGoldPrice(id: string): Promise<any> {
  try {
    const response = await api(`/prices/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing gold price:", error);
    throw error;
  }
}

async function getAllGoldPrices(page: number = 1): Promise<any> {
  try {
    const response = await api(`/prices/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all gold prices:", error);
    throw error;
  }
}

export { createGoldPrice, updateGoldPrice, deleteGoldPrice, getAllGoldPrices };
