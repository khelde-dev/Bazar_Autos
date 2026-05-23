import axios from "axios";
import type { LoginForm } from "../Pages/Login/types/Login.types";
import { api } from "./axiosConfig";

export const loginUser = async (data: LoginForm) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logOutUser = async () => {
  await api.post("/auth/logout");
};

export const validateSession = async () => {
  const { data } = await axios.get("/auth/validate");
  return data;
};

export const getUser = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const getListUser = async () => {
  const { data } = await api.get("/users");
  return data;
};
