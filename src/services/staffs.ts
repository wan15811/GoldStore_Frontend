import { api } from "@/services/api";

export interface StaffData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export interface UpdateStaffData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

async function createStaff(staffData: StaffData): Promise<any> {
  try {
    const response = await api("/staffs/", {
      method: "POST",
      body: JSON.stringify(staffData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating staff:", error);
    throw error;
  }
}

async function updateStaff(
  id: number,
  updateData: UpdateStaffData,
): Promise<any> {
  try {
    const response = await api(`/staffs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating staff:", error);
    throw error;
  }
}

async function deleteStaff(id: string): Promise<any> {
  try {
    const response = await api(`/staffs/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing staff:", error);
    throw error;
  }
}

async function getAllStaffs(page: number = 1): Promise<any> {
  try {
    const response = await api(`/staffs/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all staffs:", error);
    throw error;
  }
}

export { createStaff, updateStaff, deleteStaff, getAllStaffs };
