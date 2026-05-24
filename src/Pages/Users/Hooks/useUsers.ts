import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUser, deleteUser, getListUser, updateUser } from "@/Services/auth.service";
import type { CreateUserPayload, UpdateUserPayload } from "../Types/Users.types";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getListUser,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateUser = (onSuccess?: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuario creado");
      onSuccess?.();
    },
  });
};

export const useUpdateUser = (onSuccess?: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: UpdateUserPayload }) =>
      updateUser(userId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuario actualizado");
      onSuccess?.();
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuario eliminado");
    },
  });
};
