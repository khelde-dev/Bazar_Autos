import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerInvestment } from "../../../Services/investors.service";

export const useRegisterInvestment = (resetForm: () => void) =>
  useMutation({
    mutationFn: registerInvestment,
    onSuccess: () => {
      toast.success("Inversión Registrada", {
        description: "El capital se ha asignado correctamente al vehículo.",
      });
      resetForm();
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error("Error al registrar", {
        description: msg || "Hubo un problema con el servidor.",
      });
    },
  });
