import { api } from "@/services/api";

export interface UpdateUserData {
  staff?: {
    id: number;
  };
  userCode?: string;
  userAddress?: string;
}

async function updateUser(
  id: number,
  updateData: UpdateUserData,
): Promise<any> {
  try {
    const response = await api(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleteUser(id: string): Promise<any> {
  try {
    const response = await api(`/users/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing user:", error);
    throw error;
  }
}

async function getAllUsers(page: number = 1): Promise<any> {
  try {
    const response = await api(`/users/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all users:", error);
    throw error;
  }
}

export { updateUser, deleteUser, getAllUsers };
