import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCar } from "../../../Services/cars.service";

export const useDeleteCar = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      toast.success("Vehículo eliminado", {
        description: "El vehículo fue removido del catálogo.",
      });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error("No se pudo eliminar", { description: msg || "Error de conexión" });
    },
  });
};
