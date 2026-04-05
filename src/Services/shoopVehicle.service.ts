import { api } from "./axiosConfig";

export const createVehicle = async (payload: any) => {
  const { data } = await api.post("/cars", payload);
  return data;
};

export const getCarModels = async () => {
  const { data } = await api.get("/cars/models");
  return data;
};
