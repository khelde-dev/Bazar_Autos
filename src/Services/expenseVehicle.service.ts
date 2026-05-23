import { api } from "./axiosConfig";
import type { ExpenseListParams } from "../Pages/Expense/Types/ExpenseList.types";

export const createExpense = async (payload: any) => {
  const { data } = await api.post("/expenses", payload);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/expenses/categories");
  return data;
};

export const getExpenses = async (params: ExpenseListParams) => {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
  const { data } = await api.get("/expenses", { params: clean });
  return data;
};

// TODO: endpoint PUT /expenses/:id pending implementation
export const updateExpense = async (movementId: string, payload: any) => {
  const { data } = await api.put(`/expenses/${movementId}`, payload);
  return data;
};
