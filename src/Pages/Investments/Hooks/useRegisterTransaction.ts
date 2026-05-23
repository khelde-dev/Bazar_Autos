import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerTransaction } from "../../../Services/investors.service";
import type { TransactionPayload } from "../Types/Investments.types";

interface Args {
  investorId: string;
  payload: TransactionPayload;
}

export const useRegisterTransaction = (onDone?: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ investorId, payload }: Args) => registerTransaction(investorId, payload),
    onSuccess: (_data, { investorId, payload }) => {
      toast.success("Operación registrada", {
        description:
          payload.type === "Entrada"
            ? "Se agregó el monto a la inversión."
            : "Se retiró el monto de la inversión.",
      });
      qc.invalidateQueries({ queryKey: ["investments"] });
      qc.invalidateQueries({ queryKey: ["investment-history", investorId] });
      onDone?.();
    },
    onError: (error: any) => {
      toast.error("Error al registrar", {
        description: error?.response?.data?.message || "Hubo un problema con el servidor.",
      });
    },
  });
};
