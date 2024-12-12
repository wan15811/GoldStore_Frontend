import { api } from "@/services/api";

export interface ContactData {
  name: string;
  phone: string;
  phoneType: string;
  description: string;
}

export interface UpdateContactData {
  name?: string;
  phone?: string;
  phoneType?: string;
  description?: string;
}

async function createContact(contactData: ContactData): Promise<any> {
  try {
    const response = await api("/contacts/", {
      method: "POST",
      body: JSON.stringify(contactData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
}

async function updateContact(
  id: number,
  updateData: UpdateContactData,
): Promise<any> {
  try {
    const response = await api(`/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}

async function deleteContact(id: string): Promise<any> {
  try {
    const response = await api(`/contacts/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing contact:", error);
    throw error;
  }
}

async function getAllContacts(page: number = 1): Promise<any> {
  try {
    const response = await api(`/contacts/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all contacts:", error);
    throw error;
  }
}

export { createContact, updateContact, deleteContact, getAllContacts };
