import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExpense,
  deleteExpense,
  getCategories,
  updateExpense,
} from "../../../Services/expenseVehicle.service";

export const useExpense = (resetForm: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      toast.success("Movimiento registrado", {
        description: "La base de datos se ha actualizado correctamente.",
      });
      qc.invalidateQueries({ queryKey: ["expenses-list"] });
      resetForm();
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message;
      toast.error("Error al registrar", { description: msg || "Hubo un fallo en la conexión." });
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
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      toast.success("Gasto actualizado", {
        description: "Los cambios se guardaron correctamente.",
      });
      qc.invalidateQueries({ queryKey: ["expenses-list"] });
      onSuccess();
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message;
      toast.error("Error al actualizar", { description: msg || "Hubo un fallo en la conexión." });
    },
  });
};

export const useDeleteExpense = (onSuccess: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (movements_ids: string[]) => deleteExpense(movements_ids),
    onSuccess: () => {
      toast.success("Gasto eliminado");
      qc.invalidateQueries({ queryKey: ["expenses-list"] });
      onSuccess();
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message;
      toast.error("Error al eliminar", { description: msg || "Hubo un fallo en la conexión." });
    },
  });
};
