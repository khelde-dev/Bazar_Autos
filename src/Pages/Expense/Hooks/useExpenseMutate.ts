import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExpense, getCategories, updateExpense } from "../../../Services/expenseVehicle.service";

export const useExpense = (resetForm: () => void) => {
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      toast.success("Movimiento registrado", {
        description: "La base de datos se ha actualizado correctamente.",
      });
      resetForm();
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error("Error al registrar", {
        description: msg || "Hubo un fallo en la conexión.",
      });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["ex-categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  });
};

export const useUpdateExpense = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({ movementId, payload }: { movementId: string; payload: any }) =>
      updateExpense(movementId, payload),
    onSuccess: () => {
      toast.success("Gasto actualizado", {
        description: "Los cambios se guardaron correctamente.",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error("Error al actualizar", {
        description: msg || "Endpoint en desarrollo.",
      });
    },
  });
};
