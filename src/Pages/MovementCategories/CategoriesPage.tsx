import { Box, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CategoryPayload, CategoryType, MovementCategory } from "./Types/Categories.types";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "./Hooks/useCategories";

// ── helpers ───────────────────────────────────────────────────────────────────

const TYPE_STYLES: Record<CategoryType, string> = {
  Activo:
    "bg-emerald-100 text-emerald-700 border-transparent dark:bg-emerald-950/60 dark:text-emerald-300",
  Pasivo: "bg-rose-100 text-rose-700 border-transparent dark:bg-rose-950/60 dark:text-rose-300",
};

const EMPTY_FORM: CategoryPayload = { name: "", type: "Pasivo" };

type DialogMode = "create" | "edit" | null;

// ── component ─────────────────────────────────────────────────────────────────

export const CategoriesPage: React.FC = () => {
  const { data, isLoading } = useCategories();
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [editing, setEditing] = useState<MovementCategory | null>(null);
  const [toDelete, setToDelete] = useState<MovementCategory | null>(null);
  const [form, setForm] = useState<CategoryPayload>(EMPTY_FORM);

  const createMutation = useCreateCategory(() => closeDialog());
  const updateMutation = useUpdateCategory(() => closeDialog());
  const deleteMutation = useDeleteCategory();

  // Flatten — backend returns { data: Category[] } or similar
  const rows: MovementCategory[] = Array.isArray(data?.data) ? data.data : (data?.data?.rows ?? []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogMode("create");
  };

  const openEdit = (cat: MovementCategory) => {
    setEditing(cat);
    setForm({ name: cat.name, type: cat.type });
    setDialogMode("edit");
  };

  const closeDialog = () => {
    setDialogMode(null);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (dialogMode === "create") {
      createMutation.mutate(form);
    } else if (dialogMode === "edit" && editing) {
      updateMutation.mutate({ id: editing.category_id, payload: form });
    }
  };

  const handleDeleteConfirm = () => {
    if (!toDelete) return;
    deleteMutation.mutate(toDelete.category_id, { onSuccess: () => setToDelete(null) });
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Catálogo de movimientos</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} {rows.length === 1 ? "categoría registrada" : "categorías registradas"}
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" />
          Nueva categoría
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-primary" strokeWidth={2.5} />
        </div>
      ) : rows.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 p-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <Box className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold">Sin categorías</p>
          <p className="text-xs text-muted-foreground">
            Agrega la primera categoría de movimiento.
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="w-24 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((cat) => (
                <TableRow key={cat.category_id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        TYPE_STYLES[cat.type] ?? "bg-muted text-muted-foreground border-transparent"
                      }
                    >
                      {cat.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => openEdit(cat)}
                        aria-label="Editar categoría"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                        onClick={() => setToDelete(cat)}
                        aria-label="Eliminar categoría"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Create / Edit dialog */}
      <Dialog open={!!dialogMode} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "create" ? "Nueva categoría" : "Editar categoría"}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === "create"
                ? "Define el nombre y tipo del movimiento."
                : "Modifica la categoría de movimiento."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="cat-name">Nombre</Label>
              <Input
                id="cat-name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Ej. Gasolina"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cat-type">Tipo</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((p) => ({ ...p, type: v as CategoryType }))}
              >
                <SelectTrigger id="cat-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Pasivo">Pasivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} disabled={isSaving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !form.name.trim()}>
              {isSaving && <Loader2 className="animate-spin" />}
              {dialogMode === "create" ? "Crear" : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/60">
              <Trash2 className="text-red-500 dark:text-red-400" size={26} />
            </div>
            <DialogTitle className="text-center">¿Eliminar categoría?</DialogTitle>
            <DialogDescription className="text-center">
              <span className="font-semibold text-foreground">{toDelete?.name}</span> será eliminada
              permanentemente del catálogo.
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
