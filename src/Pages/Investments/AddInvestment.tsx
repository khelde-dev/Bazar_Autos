import React from "react";
import { Loader2, Save } from "lucide-react";
import { Investor } from "./Components/Investor";
import { BoxMoney } from "../../Utils/Screen/Boxes/BoxMoney";
import { RegistrationDate } from "./Components/RegistrationDate";
import { useInvestmentForm } from "./Hooks/useInvestmentForm";
import { useRegisterInvestment } from "./Hooks/useRegisterInvestment";
import { validateInvestment } from "./Functions/Validation";
import { useUserList } from "../Menu/Hooks/UserProfile";

export const AddInvestment: React.FC = () => {
  const { saleData, handleSaleChange, resetForm } = useInvestmentForm();
  const { mutate, isPending } = useRegisterInvestment(resetForm);
  const { data: ListUsers, isLoading } = useUserList();

  const handleSaveInvestment = () => {
    if (!validateInvestment(saleData)) return;
    mutate({
      user_id: saleData.user_id,
      investment_amount: Number(saleData.investment_amount),
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      <main className="max-w-md mx-auto p-4 space-y-5">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 size={20} className="animate-spin text-blue-600" strokeWidth={3} />
          </div>
        ) : (
          <Investor
            value={saleData.user_id}
            onChange={handleSaleChange}
            listUsers={ListUsers?.data ?? []}
          />
        )}

        <BoxMoney
          label="MONTO DE INVERSIÓN"
          name="investment_amount"
          value={saleData.investment_amount}
          onChange={handleSaleChange}
        />

        <RegistrationDate />

        <button
          type="button"
          onClick={handleSaveInvestment}
          disabled={isPending}
          className={`w-full mt-4 bg-linear-to-br from-[#2f63f6] to-[#1a4bd3] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${
            isPending ? "opacity-70 cursor-not-allowed" : "hover:from-[#2552d6]"
          }`}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Procesando...
            </div>
          ) : (
            <>
              <Save size={22} />
              Registrar Inversión
            </>
          )}
        </button>
      </main>
    </div>
  );
};
