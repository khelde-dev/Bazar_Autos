import React from "react";
import { Save } from "lucide-react";
import { Status } from "./Components/Status";
import { Details } from "./Components/Details";
import { Expense } from "./Components/Expense";
import { BoxMoney } from "../../Utils/Screen/Boxes/BoxMoney";
import { useVehicleForm } from "./Hooks/useVehicleForm";
import type { VehicleStatus } from "./Types/ShooppVehicle.types";

const ShoppVehicle: React.FC = () => {
  const { vehicleData, setVehicleData, handleInputChange, expenses,handleExpenseChange } = useVehicleForm();

  const handleStatusChange = (newStatus: VehicleStatus) => {
    setVehicleData((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] pb-10">
      <main className="max-w-md mx-auto p-4 space-y-6">
        <Details data={vehicleData} onInputChange={handleInputChange} />
        <Status
          currentStatus={vehicleData.status}
          onStatusChange={handleStatusChange}
        />
        <Expense expenses={expenses} onExpenseChange={handleExpenseChange}/>
        <BoxMoney />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-200 transition-all active:scale-95">
          <Save size={20} />
          Guardar en Catálogo
        </button>
      </main>
    </div>
  );
};

export default ShoppVehicle;
