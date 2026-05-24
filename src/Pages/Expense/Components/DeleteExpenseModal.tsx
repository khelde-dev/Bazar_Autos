import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SharedExpenseRow } from "../Types/ExpenseList.types";

interface Props {
  row: SharedExpenseRow | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteExpenseModal = ({ row, isDeleting, onConfirm, onCancel }: Props) => (
  <Dialog open={!!row} onOpenChange={(open) => !open && onCancel()}>
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/60">
          <Trash2 className="text-red-500 dark:text-red-400" size={26} />
        </div>
        <DialogTitle className="text-center">¿Eliminar gasto?</DialogTitle>
        <DialogDescription className="text-center">
          <span className="font-semibold text-foreground">{row?.category.name}</span> (
          {row?.cars.length ?? 0} {(row?.cars.length ?? 0) === 1 ? "vehículo" : "vehículos"}) será
          eliminado permanentemente.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex-row gap-3 sm:justify-center">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="flex-1"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
          {isDeleting ? "Eliminando..." : "Sí, eliminar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
