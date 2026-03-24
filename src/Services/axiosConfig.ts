import axios from "axios";
import { toast } from "sonner";


export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  // baseURL: 'http://104.248.178.41:3000/api/v1',
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || "Ocurrió un error inesperado";
    const status = error.response?.status;

    if (status === 401) {
      toast.error(message);
      localStorage.removeItem('isAuthenticated');
    
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } 
    
    else if (status === 404) {
      toast.error(message);
    } 
    
    else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;