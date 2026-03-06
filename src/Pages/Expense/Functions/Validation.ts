import { toast } from "sonner";
import type { VehicleExpense } from "../Types/ExpenseVehicle.types";

export const validateExpense = (data: VehicleExpense): boolean => {
  if (!data.categoryId) {
    toast.error("Falta la categoría", { description: "Por favor selecciona una categoría válida." });
    return false;
  }

  if (!data.isShared && !data.mainVehicleId) {
    toast.error("Vehículo no seleccionado", { description: "Debes elegir un vehículo para este movimiento." });
    return false;
  }

  if (data.isShared && data.involvedVehicles.length === 0) {
    toast.error("Lista vacía", { description: "Agrega al menos un vehículo a la lista de compartidos." });
    return false;
  }

  if (data.amount <= 0) {
    toast.error("Monto inválido", { description: "El monto debe ser mayor a 0." });
    return false;
  }

  return true;
};