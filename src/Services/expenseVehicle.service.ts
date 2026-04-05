import api from "./axiosConfig";

export const createExpense = async (payload: any) => {
  const { data } = await api.post("/expenses", payload);
  return data;
};
export const getCategories = async () => {
  const { data } = await api.get("/expenses/categories");
  return data;
};
