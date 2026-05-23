import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCar } from "../../../Services/cars.service";
import type { UpdateCarPayload } from "../Types/Cars.types";

export const useEditCar = (id: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCarPayload) => updateCar(id, payload),
    onSuccess: () => {
      toast.success("Vehículo actualizado", {
        description: "Los cambios se guardaron correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["car", id] });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error("No se pudo actualizar", { description: msg || "Error de conexión" });
    },
  });
};
