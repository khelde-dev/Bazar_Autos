import React from "react";
import { Save } from "lucide-react";
import { Status } from "./Components/Status";
import { Details } from "./Components/Details";
import { Expense } from "./Components/Expense";
import { BoxMoney } from "../../Utils/Screen/Boxes/BoxMoney";
import { useVehicleForm } from "./Hooks/useVehicleForm";
import type { VehicleStatus } from "./Types/ShooppVehicle.types";
import { validateVehicleForm } from "./Functions/Validation";
import { useCreateVehicle } from "./Hooks/useVehicle";

const ShoppVehicle: React.FC = () => {
  const {
    vehicleData,
    setVehicleData,
    handleInputChange,
    expenses,
    handleExpenseChange,
  } = useVehicleForm();

  const { mutate, isPending } = useCreateVehicle();

  const handleStatusChange = (newStatus: VehicleStatus) => {
    setVehicleData((prev) => ({ ...prev, status: newStatus }));
  };

  const sum = Object.values(expenses).reduce(
    (acc, curr) => acc + (parseFloat(curr as string) || 0),
    0,
  );

  const totalInvestment = Math.round(sum * 100) / 100;

  const handleSave = () => {
    //Test
    if (!validateVehicleForm(vehicleData, expenses)) return;
    const payload = {
      ...vehicleData,
      expenses,
      totalInvestment,
    };
    mutate(payload);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] pb-10">
      <main className="max-w-md mx-auto p-4 space-y-6">
        <Details data={vehicleData} onInputChange={handleInputChange} />

        <Status
          currentStatus={vehicleData.status}
          onStatusChange={handleStatusChange}
        />

        <Expense expenses={expenses} onExpenseChange={handleExpenseChange} />

        <BoxMoney value={totalInvestment.toLocaleString("es-MX")} />

        <button 
          onClick={handleSave}
          disabled={isPending}
          className={`w-full mt-4 bg-linear-to-br from-[#2f63f6] to-[#1a4bd3] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${
            isPending ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#2552d6]'
          }`}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </span>
          ) : (
            <>
              <Save size={20} />
              Guardar en Catálogo
            </>
          )}
        </button>
      </main>
    </div>
  );
};

export default ShoppVehicle;
