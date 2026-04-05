import { toast } from "sonner";
import type { VehicleDetails, VehicleExpenses } from "../Types/ShooppVehicle.types";

export const validateVehicleForm = (
  vehicleData: VehicleDetails,
  expenses: VehicleExpenses
): boolean => {
  const requiredFields: Record<string, string> = {
    brand: "La marca",
    model: "El modelo",
    year_of_car: "El año del auto",
    color: "El color del vehículo",
    purchase_date: "La fecha de compra",
    status: "El estatus del vehículo",
  };

  for (const [key, label] of Object.entries(requiredFields)) {
    const value = vehicleData[key as keyof VehicleDetails];

    if (value === "" || value === null || value === undefined) {
      toast.error(`¡Faltan datos! ${label} es obligatorio.`, {
        description: "Por favor, completa todos los campos antes de guardar.",
        style: {
          background: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #fecaca",
        },
      });
      return false;
    }
  }

  const invalidExpense = Object.entries(expenses).find(([_, value]) => {
    const amountStr = value.amount;
    if (amountStr === "") return false;
    const num = Number(amountStr);
    return isNaN(num) || num < 0;
  });

  if (invalidExpense) {
    toast.error("Hay un error en los gastos", {
      description: "Asegúrate de que todos los montos sean números válidos y positivos.",
    });
    return false;
  }
  return true;
};
