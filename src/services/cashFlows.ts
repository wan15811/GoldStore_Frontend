import { api } from "@/services/api";

export interface CashFlowData {
  asset: {
    id: number;
  };
  amount: number;
}

async function createCashFlow(cashFlowData: CashFlowData): Promise<any> {
  try {
    const response = await api("/cash_flows/", {
      method: "POST",
      body: JSON.stringify(cashFlowData),
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error creating cash flow statement:", error);
    throw error;
  }
}

async function deleteCashFlow(id: string): Promise<any> {
  try {
    const response = await api(`/cash_flows/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return response.data;
  } catch (error) {
    console.error("Error removing cash flow statement:", error);
    throw error;
  }
}

async function getAllCashFlows(page: number = 1): Promise<any> {
  try {
    const response = await api(`/cash_flows/?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("Error get all cash flow statements:", error);
    throw error;
  }
}

export { createCashFlow, deleteCashFlow, getAllCashFlows };
