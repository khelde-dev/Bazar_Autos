import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExpense, getCategories } from "../../../Services/expenseVehicle.service";

export const useExpense = (resetForm: () => void) => {
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      toast.success("Movimiento registrado", {
        description: "La base de datos se ha actualizado correctamente.",
      });
      resetForm();
    },
    onError: (error: any) => {
      toast.error("Error al registrar", {
        description: error.response?.data?.message || "Hubo un fallo en la conexión.",
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
