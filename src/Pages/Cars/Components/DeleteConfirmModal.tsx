import { Loader2, Trash2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CarListItem } from "../Types/Cars.types";

interface DeleteConfirmModalProps {
  car: CarListItem | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  car,
  isDeleting,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={!!car} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/60">
            <Trash2 className="text-red-500 dark:text-red-400" size={26} />
          </div>
          <DialogTitle className="text-center">¿Eliminar vehículo?</DialogTitle>
          <DialogDescription className="text-center">
            <span className="font-semibold text-foreground">
              {car?.brand} {car?.model} ({car?.year_of_car})
            </span>{" "}
            será eliminado permanentemente del catálogo.
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
};
