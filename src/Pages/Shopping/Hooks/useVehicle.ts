import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createVehicle, getCarModels } from "../../../Services/shoopVehicle.service";

export const useCreateVehicle = (resetForm: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success("Vehículo guardado", {
        description: "Se ha registrado exitosamente en el catálogo.",
      });
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["car-models"] });
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Error al conectar con el servidor";
      toast.error("No se pudo guardar", { description: message });
    },
  });
};

export const useCarModels = (inStock?: boolean) => {
  return useQuery({
    queryKey: inStock ? ["car-models", "inStock"] : ["car-models"],
    queryFn: () => getCarModels(inStock),
    staleTime: 1000 * 60 * 10,
  });
};
