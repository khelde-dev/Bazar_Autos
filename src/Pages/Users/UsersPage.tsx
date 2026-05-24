import { Loader2, Pencil, Plus, Trash2, Users } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CreateUserPayload, UpdateUserPayload, UserItem } from "./Types/Users.types";
import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from "./Hooks/useUsers";
import { UserFormDialog } from "./Components/UserFormDialog";

// ── helpers ───────────────────────────────────────────────────────────────────

type DialogMode = "create" | "edit" | null;

const AVATAR_COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#14b8a6",
];

function avatarColor(id: string) {
  return AVATAR_COLORS[(id?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
}

function getInitial(name: string) {
  return (name ?? "?").trim().charAt(0).toUpperCase();
}

// ── component ─────────────────────────────────────────────────────────────────

export const UsersPage: React.FC = () => {
  const { data, isLoading } = useUsers();
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [editing, setEditing] = useState<UserItem | null>(null);
  const [toDelete, setToDelete] = useState<UserItem | null>(null);

  const createMutation = useCreateUser(closeDialog);
  const updateMutation = useUpdateUser(closeDialog);
  const deleteMutation = useDeleteUser();

  // API returns { data: UserItem[] } directly
  const rows: UserItem[] = Array.isArray(data?.data) ? data.data : [];

  function closeDialog() {
    setDialogMode(null);
    setEditing(null);
  }

  const handleSave = (payload: CreateUserPayload | UpdateUserPayload) => {
    if (dialogMode === "create") {
      createMutation.mutate(payload as CreateUserPayload);
    } else if (dialogMode === "edit" && editing) {
      updateMutation.mutate({ userId: editing.id, payload: payload as UpdateUserPayload });
    }
  };

  const handleDeleteConfirm = () => {
    if (!toDelete) return;
    deleteMutation.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Alta de Usuarios</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} {rows.length === 1 ? "usuario registrado" : "usuarios registrados"}
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setDialogMode("create"); }} className="gap-2 sm:w-auto">
          <Plus className="size-4" />
          Nuevo usuario
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-primary" strokeWidth={2.5} />
        </div>
      ) : rows.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 p-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <Users className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold">Sin usuarios</p>
          <p className="text-xs text-muted-foreground">
            Registra el primer usuario con el botón de arriba.
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden sm:table-cell">Usuario</TableHead>
                <TableHead className="hidden md:table-cell">Correo</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="w-24 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((user) => {
                const isAdmin = user.role === "admin";
                return (
                  <TableRow key={user.id}>
                    {/* Avatar + name */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                          style={{ backgroundColor: avatarColor(user.id) }}
                        >
                          {getInitial(user.name)}
                        </div>
                        <p className="truncate text-sm font-semibold">{user.name}</p>
                      </div>
                    </TableCell>

                    {/* Username */}
                    <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                      @{user.username}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {user.email}
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      {isAdmin ? (
                        <Badge className="border-transparent bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Usuario</Badge>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => { setEditing(user); setDialogMode("edit"); }}
                          aria-label="Editar usuario"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                          onClick={() => setToDelete(user)}
                          aria-label="Eliminar usuario"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Form dialog */}
      <UserFormDialog
        mode={dialogMode}
        editing={editing}
        isPending={isSaving}
        onSave={handleSave}
        onClose={closeDialog}
      />

      {/* Delete confirm */}
      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/60">
              <Trash2 className="text-red-500 dark:text-red-400" size={26} />
            </div>
            <DialogTitle className="text-center">¿Eliminar usuario?</DialogTitle>
            <DialogDescription className="text-center">
              <span className="font-semibold text-foreground">{toDelete?.name}</span> será
              eliminado permanentemente del sistema.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3 sm:justify-center">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setToDelete(null)}
              disabled={deleteMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="animate-spin" />}
              Sí, eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
