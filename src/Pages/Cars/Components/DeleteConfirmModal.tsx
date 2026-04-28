import { Loader2, Trash2 } from "lucide-react";
import type React from "react";
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
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button
        type="button"
        aria-label="Cerrar"
        className="fixed inset-0 bg-black/40 dark:bg-black/60 cursor-default"
        onClick={onCancel}
      />
      <div className="relative bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl p-6 w-full sm:max-w-sm shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-950/60 rounded-full flex items-center justify-center">
            <Trash2 className="text-red-500 dark:text-red-400" size={26} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">¿Eliminar vehículo?</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {car.brand} {car.model} ({car.year_of_car})
            </span>{" "}
            será eliminado permanentemente del catálogo.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3.5 rounded-2xl bg-red-500 dark:bg-red-600 text-white font-bold text-sm hover:bg-red-600 dark:hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            {isDeleting ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};
