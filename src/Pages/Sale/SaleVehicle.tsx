import React from "react";
import { Save } from "lucide-react";
import { Investor } from "./Components/Investor";
import { BoxMoney } from "../../Utils/Screen/Boxes/BoxMoney";
import { RegistrationDate } from "./Components/RegistrationDate";
import { Notes } from "./Components/Notes";
import { useSaleForm } from "./Hooks/useSaleForm";
import { useRegisterInvestment } from "./Hooks/useRegisterInvestmentMutate";
import { validateInvestment } from "./Functions/Validation";

export const SaleVehicle: React.FC = () => {
  const { saleData, handleSaleChange } = useSaleForm();
  const { mutate, isPending } = useRegisterInvestment();

  const handleSaveInvestment = () => {
    if (!validateInvestment(saleData)) return;
    mutate(saleData);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      <main className="max-w-md mx-auto p-4 space-y-5">
        <Investor value={saleData.investorName} onChange={handleSaleChange} />

        <BoxMoney value={saleData.amount.toString()} />

        <RegistrationDate
          value={saleData.registrationDate}
          onChange={handleSaleChange}
        />

        <Notes value={saleData.notes} onChange={handleSaleChange} />

        <button
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
