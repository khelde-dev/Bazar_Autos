import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUser, logOutUser } from "../../../Services/auth.service";
import type { LoginForm } from "../types/Login.types";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginForm) => loginUser(data),
    onSuccess: () => {
      localStorage.setItem('isAuthenticated', 'true'); 
      toast.success("¡Bienvenido al Bazar de Autos!");
      setTimeout(() => navigate("/dashboard"), 1000);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Error de credenciales";
      toast.error(msg);
    },
  });
};

export const useLogOutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn:() => logOutUser(),
    onSuccess: () => {
      localStorage.removeItem('isAuthenticated');
      toast.success("Sesión cerrada");
      navigate("/login");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Ocurrio un error";
      toast.error(msg);
      navigate("/login");
    },
  });
};