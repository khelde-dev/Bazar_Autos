import type { CarModelsResponse } from "../Pages/Shopping/Types/ShooppVehicle.types";
import { api } from "./axiosConfig";

export const createVehicle = async (payload: any) => {
  const { data } = await api.post("/cars", payload);
  return data;
};

export const getCarModels = async (inStock?: boolean): Promise<CarModelsResponse> => {
  const params = inStock ? { inStock: true } : undefined;
  const { data } = await api.get<CarModelsResponse>("/cars/models", { params });
  return data;
};
