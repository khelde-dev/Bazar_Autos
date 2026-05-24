import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/Services/expenseVehicle.service";
import type { CategoryPayload } from "../Types/Categories.types";

export const useCategories = () =>
  useQuery({
    queryKey: ["movement-categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateCategory = (onSuccess?: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryPayload) => createCategory(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["movement-categories"] });
      toast.success("Categoría creada");
      onSuccess?.();
    },
  });
};

export const useUpdateCategory = (onSuccess?: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CategoryPayload }) =>
      updateCategory(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["movement-categories"] });
      toast.success("Categoría actualizada");
      onSuccess?.();
    },
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["movement-categories"] });
      toast.success("Categoría eliminada");
    },
  });
};
