import { api } from "@/services/api";

export interface CashDrawerData {
  drawerName: string;
  drawerType: string;
}

export interface UpdateCashDrawerData {
  drawerName?: string;
  drawerType?: string;
}

async function createCashDrawer(cashDrawerData: CashDrawerData): Promise<any> {
  try {
    const response = await api("/drawers/", {
      method: "POST",
      body: JSON.stringify(cashDrawerData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating cash drawer:", error);
    throw error;
  }
}

async function updateCashDrawer(
  id: number,
  updateData: UpdateCashDrawerData,
): Promise<any> {
  try {
    const response = await api(`/drawers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating cash drawer:", error);
    throw error;
  }
}

async function deleteCashDrawer(id: string): Promise<any> {
  try {
    const response = await api(`/drawers/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing cash drawer:", error);
    throw error;
  }
}

async function getAllCashDrawers(page: number = 1): Promise<any> {
  try {
    const response = await api(`/drawers/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all cash drawers:", error);
    throw error;
  }
}

export {
  createCashDrawer,
  updateCashDrawer,
  deleteCashDrawer,
  getAllCashDrawers,
};
