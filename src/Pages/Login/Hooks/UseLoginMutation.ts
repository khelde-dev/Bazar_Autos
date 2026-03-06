import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUser } from "../../../Services/auth.service";
import type { LoginForm } from "../types/Login.types";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginForm) => loginUser(data),
    onSuccess: (response) => {
    //Se cambiara segun quede mas HD Dummy 7w7
      localStorage.setItem("token", response.token);
      toast.success("¡Bienvenido al Bazar de Autos!");
      setTimeout(() => navigate("/dashboard"), 1000);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Error de credenciales";
      toast.error(msg);
    },
  });
};