import { api } from "./axiosConfig";
import type { ExpenseListParams } from "../Pages/Expense/Types/ExpenseList.types";

export const createExpense = async (payload: any) => {
  const { data } = await api.post("/expenses", payload);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export const getExpenses = async (params: ExpenseListParams) => {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
  const { data } = await api.get("/expenses", { params: clean });
  return data;
};

export const updateExpense = async (payload: {
  movements_ids: string[];
  movements_category_id: string;
  car_id: string[];
  type: string;
  amount: number;
  description: string;
  closing_date: string;
}) => {
  const { data } = await api.put("/expenses", payload);
  return data;
};

export const deleteExpense = async (movements_ids: string[]) => {
  const { data } = await api.delete("/expenses", { data: { movements_ids } });
  return data;
};

export const createCategory = async (payload: { name: string; type: string }) => {
  const { data } = await api.post("/categories", payload);
  return data;
};

export const updateCategory = async (id: string, payload: { name: string; type: string }) => {
  const { data } = await api.put(`/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
