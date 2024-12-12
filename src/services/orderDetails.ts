import { api } from "@/services/api";

export interface UpdateOrderData {
  total?: number;
  goldToCash?: number;
  discount?: number;
  description?: string;
}

async function updateOrder(
  id: number,
  updateData: UpdateOrderData,
): Promise<any> {
  try {
    const response = await api(`/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

async function deleteOrder(id: string): Promise<any> {
  try {
    const response = await api(`/orders/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing order:", error);
    throw error;
  }
}

async function getAllOrders(page: number = 1): Promise<any> {
  try {
    const response = await api(`/orders/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all orders:", error);
    throw error;
  }
}

export { updateOrder, deleteOrder, getAllOrders };
