import { ArrowLeft, Loader2, Save } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { BoxMoney } from "../../Utils/Screen/Boxes/BoxMoney";
import type { VehicleStatus } from "../Shopping/Types/ShooppVehicle.types";
import { Details } from "../Shopping/Components/Details";
import { Expense } from "../Shopping/Components/Expense";
import { Status } from "../Shopping/Components/Status";
import { validateVehicleForm } from "../Shopping/Functions/Validation";
import { useCarEditForm } from "./Hooks/useCarEditForm";
import { useCarFromCache } from "./Hooks/useCarFromCache";
import { useEditCar } from "./Hooks/useEditCar";
import type { CarDetail, CarListItem } from "./Types/Cars.types";
import { mapListItemToDetail } from "./Utils/carMappers";

export const CarEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const stateCar = (location.state as { listItem?: CarListItem } | null)?.listItem;
  const cachedCar = useCarFromCache(id ?? "");
  const sourceCar = stateCar ?? cachedCar;

  if (!sourceCar) return <Navigate to="/cars" replace />;

  const car = mapListItemToDetail(sourceCar);
  const goBack = () => (location.state ? navigate(-1) : navigate("/cars"));

  return <CarEditForm car={car} onBack={goBack} />;
};

interface CarEditFormProps {
  car: CarDetail;
  onBack: () => void;
}

const CarEditForm: React.FC<CarEditFormProps> = ({ car, onBack }) => {
  const {
    vehicleData,
    setVehicleData,
    handleInputChange,
    expenses,
    handleExpenseChange,
    handleExpenseNoteChange,
    buildPayload,
  } = useCarEditForm(car);

  const { mutate, isPending } = useEditCar(car.car_id, onBack);

  const totalInvestment = useMemo(() => {
    const sumExpenses = Object.values(expenses).reduce(
      (acc, curr) => acc + (Number(curr.amount) || 0),
      0
    );
    return Math.round(((Number(vehicleData.purchase_price) || 0) + sumExpenses) * 100) / 100;
  }, [expenses, vehicleData.purchase_price]);

  const handleStatusChange = (status: VehicleStatus) =>
    setVehicleData((prev) => ({ ...prev, status }));

  const handleSave = () => {
    if (!validateVehicleForm(vehicleData, expenses)) return;
    mutate(buildPayload());
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] dark:bg-slate-900 pb-10 transition-colors">
      <main className="max-w-md mx-auto p-4 space-y-6">
        <div className="flex items-center gap-3 py-2">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 active:scale-95 transition-all shadow-sm"
            aria-label="Volver atrás"
            title="Volver"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          <h1 className="font-bold text-slate-800 dark:text-slate-100 text-lg tracking-tight">Editar Vehículo</h1>
        </div>

        <Details data={vehicleData} onInputChange={handleInputChange} onAutoStatusChange={handleStatusChange} />
        <Status currentStatus={vehicleData.status} onStatusChange={handleStatusChange} />
        <BoxMoney label="PRECIO DE COMPRA" name="purchase_price" value={vehicleData.purchase_price} onChange={handleInputChange} />
        <Expense
          expenses={expenses}
          onExpenseChange={handleExpenseChange}
          onExpenseNoteChange={handleExpenseNoteChange}
          totalInvestment={totalInvestment.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        />
        <BoxMoney label="PRECIO DE VENTA OBJETIVO" name="price_for_sale" value={vehicleData.price_for_sale} onChange={handleInputChange} />

        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className={`w-full bg-linear-to-br from-[#2f63f6] to-[#1a4bd3] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${isPending ? "opacity-70 cursor-not-allowed" : "hover:from-[#2552d6]"}`}
        >
          {isPending ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {isPending ? "Guardando..." : "Guardar Cambios"}
        </button>
      </main>
    </div>
  );
};
