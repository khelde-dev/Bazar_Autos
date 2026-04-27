import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: 'http://104.248.178.41:3000/api/v1',
  // baseURL: 'https://api.bazar-auto.com/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const status = error.response?.status;

    // Errores de validación Joi: { errores: [{ field, message }] }
    if (data?.errores && Array.isArray(data.errores) && data.errores.length > 0) {
      data.errores.forEach((e: { field: string; message: string }) => {
        toast.error(e.message);
      });
    } else {
      // Error estándar: { error: { message } } o { message }
      const message = data?.error?.message ?? data?.message ?? "Ocurrió un error inesperado";
      toast.error(message);
    }

    if (status === 401) {
      localStorage.removeItem("isAuthenticated");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

