import { Save, Wallet } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BoxMoney } from "../../Utils/Screen/Boxes/BoxMoney";
import { Card } from "../../Utils/Screen/Boxes/Card";
import { BackBar } from "./Components/BackBar";
import { OperationTypeTabs } from "./Components/OperationTypeTabs";
import { validateTransaction } from "./Functions/Validation";
import { useRegisterTransaction } from "./Hooks/useRegisterTransaction";
import {
  INITIAL_TRANSACTION_STATE,
  type TransactionFormState,
  type TransactionType,
} from "./Types/Investments.types";
import { formatMoney } from "./Utils/format";

const RequiredLabel = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label
    htmlFor={htmlFor}
    className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-1.5 block"
  >
    {children}{" "}
    <span className="text-red-500" aria-hidden="true">
      *
    </span>
    <span className="sr-only">(obligatorio)</span>
  </label>
);

export const InvestmentOperation = () => {
  const { userId = "", investmentId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const investmentAmount: string | undefined = location.state?.investmentAmount;
  const [form, setForm] = useState<TransactionFormState>(INITIAL_TRANSACTION_STATE);

  const { mutate, isPending } = useRegisterTransaction(() => navigate(`/investments/${userId}`));

  const handleTypeChange = (type: TransactionType) => setForm((prev) => ({ ...prev, type }));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, amount: Number(e.target.value) }));

  const handleConceptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, concept: e.target.value }));

  const handleConfirm = () => {
    if (!validateTransaction(form)) return;
    mutate({
      investorId: investmentId,
      payload: {
        amount: Number(form.amount),
        type: form.type,
        concept: form.concept.trim(),
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 pb-10 font-sans w-full">
      <main className="max-w-md mx-auto p-4 space-y-5" aria-label="Nueva transacción">
        <BackBar title="Nueva transacción" />

        <div className="space-y-2">
          <RequiredLabel>Tipo de operación</RequiredLabel>
          <OperationTypeTabs value={form.type} onChange={handleTypeChange} />
        </div>
        {investmentAmount && (
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600/10 p-2.5 rounded-xl text-blue-600">
                <Wallet size={20} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest">
                  Monto actual
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  Total de inversión activa
                </span>
              </div>
            </div>

            <span className="text-xl font-black text-blue-700 tracking-tight">
              {formatMoney(investmentAmount)}
            </span>
          </div>
        )}
        <BoxMoney
          label={form.type === "Entrada" ? "Monto a agregar *" : "Monto a retirar *"}
          name="amount"
          value={form.amount}
          onChange={handleAmountChange}
        />

        <Card>
          <div>
            <RequiredLabel htmlFor="concept">Concepto</RequiredLabel>
            <textarea
              id="concept"
              name="concept"
              value={form.concept}
              onChange={handleConceptChange}
              rows={3}
              placeholder="Describe el motivo de la operación..."
              aria-required="true"
              aria-label="Concepto de la operación"
              className="w-full bg-gray-50 dark:bg-gray-700 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 p-3 rounded-xl text-sm transition-all outline-none text-slate-700 dark:text-slate-200 resize-none"
            />
          </div>
        </Card>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={isPending}
          aria-disabled={isPending}
          aria-busy={isPending}
          className={`w-full mt-4 bg-linear-to-br from-[#2f63f6] to-[#1a4bd3] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${
            isPending ? "opacity-70 cursor-not-allowed" : "hover:from-[#2552d6]"
          }`}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              Procesando...
            </div>
          ) : (
            <>
              <Save size={22} aria-hidden="true" />
              Confirmar operación
            </>
          )}
        </button>
      </main>
    </div>
  );
};
