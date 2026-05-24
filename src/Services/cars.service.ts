import type { CarFilters, CarListResponse, UpdateCarPayload } from "../Pages/Cars/Types/Cars.types";
import { api } from "./axiosConfig";

export const getCars = async (filters: CarFilters): Promise<CarListResponse> => {
  const params: Record<string, string | number> = {
    limit: filters.limit,
    page: filters.page,
  };
  if (filters.search) params.search = filters.search;
  if (filters.year) params.year = filters.year;
  if (filters.month) params.month = filters.month;
  const { data } = await api.get<CarListResponse>("/cars", { params });
  return data;
};

export const updateCar = async (id: string, payload: UpdateCarPayload) => {
  const { data } = await api.put(`/cars/${id}`, payload);
  return data;
};

export const deleteCar = async (id: string) => {
  const { data } = await api.delete(`/cars/${id}`);
  return data;
};
