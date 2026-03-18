import { toast } from "sonner";
import type { SaleInvestment } from "../Types/SaleVehicle.types";


export const validateInvestment = (data: SaleInvestment): boolean => {


  if (Number(data.investment_amount) <= 0) {
    toast.error("Monto inválido", { description: "La inversión debe ser mayor a $0." });
    return false;
  }

  return true;
};