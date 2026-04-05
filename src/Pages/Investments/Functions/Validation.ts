import { toast } from "sonner";
import type { InvestmentFormState, TransactionFormState } from "../Types/Investments.types";

export const validateInvestment = (data: InvestmentFormState): boolean => {
  if (!data.user_id) {
    toast.error("Selecciona un inversionista");
    return false;
  }
  if (Number(data.investment_amount) <= 0) {
    toast.error("Monto inválido", {
      description: "La inversión debe ser mayor a $0.",
    });
    return false;
  }
  return true;
};

export const validateTransaction = (data: TransactionFormState): boolean => {
  if (Number(data.amount) <= 0) {
    toast.error("Monto inválido", {
      description: "El monto debe ser mayor a $0.",
    });
    return false;
  }
  if (!data.concept.trim()) {
    toast.error("Falta el concepto", {
      description: "Describe brevemente la operación.",
    });
    return false;
  }
  return true;
};
