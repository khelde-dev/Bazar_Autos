import { ChevronDown, DollarSign, Loader2, ReceiptText } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import type { CarModel } from "../Shopping/Types/ShooppVehicle.types";
import { Card } from "../../Utils/Screen/Boxes/Card";
import { InputField } from "../../Utils/Screen/Inputs/InputField";
import { Label } from "../../Utils/Screen/Text/Label";
import { useCarModels } from "../Shopping/Hooks/useVehicle";
import { GenerateArray } from "./Functions/Utils";
import { validateExpense } from "./Functions/Validation";
import { useExpenseForm } from "./Hooks/useExpenseForm";
import { useCategories, useExpense } from "./Hooks/useExpenseMutate";
import { type Category, MAIN_MOVEMENT_TYPES } from "./Types/ExpenseVehicle.types";
import { SharedVehiclesSection } from "./Components/SharedVehiclesSection";
import { VehicleSearchInput } from "./Components/VehicleSearchInput";
import { Link } from "react-router-dom";

export const ExpenseVehicle: React.FC = () => {
  const { expenseData, setExpenseData, handleChange, toggleShared, removeVehicleTag, resetForm } =
    useExpenseForm();

  const { mutate, isPending } = useExpense(resetForm);
  const { data: categoriesData, isLoading } = useCategories();
  const { data: modelsData, isLoading: isLoadingModels } = useCarModels(true);

  const categoriesArray = useMemo<Category[]>(() => categoriesData?.data ?? [], [categoriesData]);
  const modelsArray = useMemo<CarModel[]>(() => modelsData?.data ?? [], [modelsData]);

  const categoryTypes = useMemo(
    () => Array.from(new Set(categoriesArray.map((cat) => cat.type))),
    [categoriesArray]
  );

  const handleSave = () => {
    if (!validateExpense(expenseData)) return;
    mutate({
      type: expenseData.type,
      movements_category_id: expenseData.movements_category_id,
      amount: expenseData.amount,
      isShared: expenseData.isShared,
      description: expenseData.description,
      closing_date: expenseData.closing_date,
      car_id: GenerateArray(expenseData, modelsArray),
    });
  };

  const handleSelectModel = (fullName: string) => {
    if (expenseData.isShared) {
      setExpenseData((prev) => {
        if (prev.involvedVehicles.includes(fullName)) return prev;
        return { ...prev, involvedVehicles: [...prev.involvedVehicles, fullName] };
      });
    } else {
      setExpenseData((prev) => ({ ...prev, mainVehicleId: fullName }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 pb-10 font-sans">
      <main className="max-w-md mx-auto p-4 space-y-6">

        <Link
          to="/expenses/list"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Ver / editar gastos registrados →
        </Link>

        <Card>
          <div className="space-y-2">
            <Label>Tipo de Movimiento</Label>
            <div className="flex gap-2">
              {MAIN_MOVEMENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setExpenseData((prev) => ({ ...prev, type: t }))}
                  className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all border ${expenseData.type === t
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100 dark:shadow-blue-900/40"
                      : "bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-400 border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <Loader2 size={14} className="animate-spin text-blue-600 opacity-90" strokeWidth={3} />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Subtipo</Label>
                <div className="relative">
                  <select
                    name="subType"
                    value={expenseData.subType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-200 outline-none border border-transparent appearance-none"
                  >
                    {categoryTypes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="animate-in fade-in duration-300">
                <Label>Categoría</Label>
                <div className="relative">
                  <select
                    name="movements_category_id"
                    value={expenseData.movements_category_id}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl text-sm text-gray-700 dark:text-gray-200 appearance-none outline-none border border-transparent"
                  >
                    <option value="">Seleccionar...</option>
                    {categoriesArray.map(
                      (cat) =>
                        cat.type === expenseData.subType && (
                          <option key={cat.category_id} value={cat.category_id}>
                            {cat.name}
                          </option>
                        )
                    )}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          )}

          {!isLoadingModels && (
            <VehicleSearchInput
              modelsArray={modelsArray}
              isShared={expenseData.isShared}
              mainVehicleId={expenseData.mainVehicleId}
              involvedVehicles={expenseData.involvedVehicles}
              onSelectModel={handleSelectModel}
            />
          )}

          <div>
            <Label>Monto (MXN)</Label>
            <div className="relative">
              <DollarSign
                className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold transition-colors ${expenseData.subType === "Activo" ? "text-emerald-500" : "text-blue-500"
                  }`}
                size={22}
              />
              <input
                name="amount"
                type="number"
                placeholder="0.00"
                value={expenseData.amount || ""}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-700 pl-12 py-5 rounded-2xl text-xl font-bold text-gray-700 dark:text-gray-200 outline-none border border-transparent focus:bg-white dark:focus:bg-gray-600 transition-all"
              />
            </div>
          </div>

          <SharedVehiclesSection
            isShared={expenseData.isShared}
            involvedVehicles={expenseData.involvedVehicles}
            onToggle={toggleShared}
            onRemoveTag={removeVehicleTag}
          />

          <div>
            <InputField
              label="Fecha de cierre"
              name="closing_date"
              type="date"
              value={expenseData.closing_date}
              onChange={handleChange}
            />
            <Label>Descripción</Label>
            <textarea
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              placeholder="Detalles adicionales..."
              rows={3}
              className="w-full bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20 resize-none text-gray-700 dark:text-gray-200"
            />
          </div>
        </Card>

        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className={`w-full mt-4 bg-linear-to-br from-[#2f63f6] to-[#1a4bd3] text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${isPending ? "opacity-70 cursor-not-allowed" : "hover:from-[#2552d6]"
            }`}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Procesando...
            </div>
          ) : (
            <>
              <ReceiptText size={22} />
              Registrar Movimiento
            </>
          )}
        </button>
      </main>
    </div>
  );
};
