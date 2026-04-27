import { Loader2, Save } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { NormalizeText } from "../../Utils/Functions/Normalize";
import { BoxMoney } from "../../Utils/Screen/Boxes/BoxMoney";
import { Details } from "./Components/Details";
import { Expense } from "./Components/Expense";
import { Status } from "./Components/Status";
import { validateVehicleForm } from "./Functions/Validation";
import { useCreateVehicle } from "./Hooks/useVehicle";
import { useVehicleForm } from "./Hooks/useVehicleForm";
import {
  COLOR_PRESETS,
  COST_TYPE_OVERRIDES,
  EXPENSE_ITEMS,
  type VehicleStatus,
} from "./Types/ShooppVehicle.types";

export const ShoppVehicle: React.FC = () => {
  const {
    vehicleData,
    setVehicleData,
    handleInputChange,
    expenses,
    handleExpenseChange,
    handleExpenseNoteChange,
    resetForm,
  } = useVehicleForm();

  const { mutate, isPending } = useCreateVehicle(resetForm);

  const handleStatusChange = (newStatus: VehicleStatus) => {
    setVehicleData((prev) => ({ ...prev, status: newStatus }));
  };

  const totalInvestment = useMemo(() => {
    const sumExpenses = Object.values(expenses).reduce(
      (acc, curr) => acc + (Number(curr.amount) || 0),
      0
    );

    const purchasePrice = Number(vehicleData.purchase_price) || 0;
    return Math.round((sumExpenses + purchasePrice) * 100) / 100;
  }, [expenses, vehicleData.purchase_price]);

  const handleSave = () => {
    if (!validateVehicleForm(vehicleData, expenses)) return;

    const formattedCosts = EXPENSE_ITEMS.map((item) => ({
      cost_type: COST_TYPE_OVERRIDES[item.label] || NormalizeText(item.label),
      amount: Number(expenses[item.key].amount) || 0,
      note: expenses[item.key].note || "",
    }));

    const payload = {
      ...vehicleData,
      price_for_sale: Number(vehicleData.price_for_sale) || 0,
      year_of_car: Number(vehicleData.year_of_car) || 0,
      color: COLOR_PRESETS.find((c) => c.value === vehicleData.color)?.name || vehicleData.color,
      purchase_price: totalInvestment,
      costs: formattedCosts,
    };
    mutate(payload);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] pb-10">
      <main className="max-w-md mx-auto p-4 space-y-6">
        <Details
          data={vehicleData}
          onInputChange={handleInputChange}
          onAutoStatusChange={handleStatusChange}
        />

        <Status currentStatus={vehicleData.status} onStatusChange={handleStatusChange} />

        <BoxMoney
          label="PRECIO DE COMPRA"
          name="purchase_price"
          value={vehicleData.purchase_price}
          onChange={handleInputChange}
        />

        <Expense
          expenses={expenses}
          onExpenseChange={handleExpenseChange}
          onExpenseNoteChange={handleExpenseNoteChange} // Pasamos la prop
          totalInvestment={totalInvestment.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
          })}
        />

        <BoxMoney
          label="PRECIO DE VENTA OBJETIVO"
          name="price_for_sale"
          value={vehicleData.price_for_sale}
          onChange={handleInputChange}
        />

        <button
          onClick={handleSave}
          disabled={isPending}
          className={`w-full mt-4 bg-linear-to-br from-[#2f63f6] to-[#1a4bd3] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${
            isPending ? "opacity-70 cursor-not-allowed" : "hover:from-[#2552d6]"
          }`}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 size={20} className="animate-spin text-white opacity-90" strokeWidth={3} />
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
