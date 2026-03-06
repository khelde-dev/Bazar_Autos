import { toast } from "sonner";
import type { SaleInvestment } from "../Types/SaleVehicle.types";


export const validateInvestment = (data: SaleInvestment): boolean => {
  if (!data.investorName) {
    toast.error("Falta el inversionista", { description: "Selecciona quién realiza la inversión." });
    return false;
  }

  if (data.amount <= 0) {
    toast.error("Monto inválido", { description: "La inversión debe ser mayor a $0." });
    return false;
  }

  if (!data.registrationDate) {
    toast.error("Falta la fecha", { description: "La fecha de registro es obligatoria." });
    return false;
  }

  return true;
};