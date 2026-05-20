import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  // baseURL: 'http://104.248.178.41:3000/api/v1',
  baseURL: 'https://api.bazar-auto.com/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status === 401 && !original._retry) {
      original._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(original);
      } catch {
        localStorage.removeItem("isAuthenticated");
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }

    if (status === 404) return Promise.reject(error);

    const data = error.response?.data;
    if (data?.errores && Array.isArray(data.errores) && data.errores.length > 0) {
      data.errores.forEach((e: { field: string; message: string }) => {
        toast.error(e.message, { id: e.message.slice(0, 40) });
      });
    } else {
      const message = data?.error?.message ?? data?.message ?? "Ocurrió un error inesperado";
      toast.error(message, { id: message.slice(0, 40) });
    }

    return Promise.reject(error);
  }
);

