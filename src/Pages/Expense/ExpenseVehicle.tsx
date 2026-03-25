import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  Car,
  DollarSign,
  Users,
  X,
  ReceiptText,
  Check,
  Loader2,
} from "lucide-react";
import { Card } from "../../Utils/Screen/Boxes/Card";
import { Label } from "../../Utils/Screen/Text/Label";
import { useExpenseForm } from "./Hooks/useExpenseForm";
import { MAIN_MOVEMENT_TYPES } from "./Types/ExpenseVehicle.types";
import { useCategories, useExpense } from "./Hooks/useExpenseMutate";
import { validateExpense } from "./Functions/Validation";
import { useCarModels } from "../Shopping/Hooks/useVehicle";
import { GenerateArray } from "./Functions/Utils";
import { InputField } from "../../Utils/Screen/Inputs/InputField";

export const ExpenseVehicle: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    expenseData,
    setExpenseData,
    handleChange,
    toggleShared,
    removeVehicleTag,
    resetForm,
  } = useExpenseForm();

  const { mutate, isPending } = useExpense(resetForm);
  const { data: categoriesData, isLoading } = useCategories();
  const { data: modelsData, isLoading: isLoadingModels } = useCarModels();

  const categoriesArray = categoriesData?.data || [];
  const modelsArray = modelsData?.data || [];

  const categoryTypes: string[] = useMemo(() => {
    return Array.from(new Set(categoriesArray.map((cat: any) => cat.type)));
  }, [categoriesArray]);

  const carsModels: string[] = useMemo(() => {
    return Array.from(new Set(modelsArray.map((car: any) => car.name)));
  }, [modelsArray]);

  const filteredBrands = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return carsModels.filter((brand) =>
      brand.toLowerCase().includes(lowerSearchTerm),
    );
  }, [carsModels, searchTerm]);

  const handleSave = () => {
    if (!validateExpense(expenseData)) return;

    let resultIds: string[] = GenerateArray(expenseData, modelsData.data);

    const { subType, mainVehicleId, involvedVehicles, ...autoMappedData }=expenseData;

    const payload = {
      ...autoMappedData,
      car_id: resultIds,
    };
    mutate(payload);
  };

  const handleSelectBrand = (brand: string) => {
    if (expenseData.isShared) {
      setExpenseData((prev) => {
        if (prev.involvedVehicles.includes(brand)) return prev;
        return {
          ...prev,
          involvedVehicles: [...prev.involvedVehicles, brand],
        };
      });
      setSearchTerm("");
    } else {
      setExpenseData((prev) => ({ ...prev, mainVehicleId: brand }));
      setSearchTerm(brand);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      <main className="max-w-md mx-auto p-4 space-y-6">
        <Card>
          <div className="space-y-2">
            <Label>Tipo de Movimiento</Label>
            <div className="flex gap-2">
              {MAIN_MOVEMENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() =>
                    setExpenseData((prev) => ({ ...prev, type: t }))
                  }
                  className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all border ${
                    expenseData.type === t
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                      : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          {isLoading ? (
            <Loader2
              size={14}
              className="animate-spin text-blue-600 opacity-90"
              strokeWidth={3}
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Subtipo</Label>
                <div className="relative">
                  <select
                    name="subType"
                    value={expenseData.subType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 p-4 rounded-2xl text-sm font-bold outline-none border border-transparent appearance-none"
                  >
                    {categoryTypes.map((c: string) => (
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
                    className="w-full bg-gray-50 p-4 rounded-2xl text-sm appearance-none outline-none border border-transparent"
                  >
                    <option value="">Seleccionar...</option>
                    {categoriesArray.map(
                      (cat: any) =>
                        cat.type === expenseData.subType && (
                          <option key={cat.category_id} value={cat.category_id}>
                            {cat.name}
                          </option>
                        ),
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
            <div className="relative">
              <Label>
                {expenseData.isShared
                  ? "Añadir Vehículos involucrados"
                  : "Vehículo Principal"}
              </Label>
              <div className="relative">
                <Car
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder={
                    expenseData.isShared
                      ? "Escribe para añadir varios..."
                      : "Buscar marca..."
                  }
                  value={
                    isSearchOpen
                      ? searchTerm
                      : expenseData.isShared
                        ? ""
                        : expenseData.mainVehicleId
                  }
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 pl-12 pr-10 py-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20 text-gray-700"
                />
                <ChevronDown
                  size={18}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${isSearchOpen ? "rotate-180" : ""}`}
                />
              </div>

              {isSearchOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto animate-in zoom-in-95 duration-150">
                  {filteredBrands.length > 0 ? (
                    filteredBrands.map((brand: any) => {
                      const isSelected = expenseData.isShared
                        ? expenseData.involvedVehicles.includes(brand)
                        : expenseData.mainVehicleId === brand;

                      return (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => handleSelectBrand(brand)}
                          className={`w-full flex items-center justify-between px-5 py-4 text-sm transition-colors border-b border-gray-50 last:border-none ${
                            isSelected
                              ? "bg-blue-50 text-blue-700 font-bold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {brand}
                            {isSelected && expenseData.isShared && (
                              <span className="text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                Añadido
                              </span>
                            )}
                          </span>
                          {isSelected && (
                            <Check size={16} className="text-blue-600" />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-4 text-xs text-gray-400 text-center">
                      No hay resultados
                    </div>
                  )}
                </div>
              )}
              {isSearchOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSearchOpen(false)}
                />
              )}
            </div>
          )}

          <div>
            <Label>Monto (MXN)</Label>
            <div className="relative group">
              <DollarSign
                className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold transition-colors ${expenseData.subType === "Activo" ? "text-emerald-500" : "text-blue-500"}`}
                size={22}
              />
              <input
                name="amount"
                type="number"
                placeholder="0.00"
                value={expenseData.amount || ""}
                onChange={handleChange}
                className="w-full bg-gray-50 pl-12 py-5 rounded-2xl text-xl font-bold text-gray-700 outline-none border border-transparent focus:bg-white transition-all"
              />
            </div>
          </div>
          <div
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${expenseData.isShared ? "bg-blue-50 border-blue-100" : "bg-gray-50 border-transparent"}`}
          >
            <div className="flex items-center gap-3">
              <Users
                className={
                  expenseData.isShared ? "text-blue-600" : "text-gray-400"
                }
                size={22}
              />
              <span
                className={`font-bold text-sm ${expenseData.isShared ? "text-blue-900" : "text-gray-500"}`}
              >
                ¿Monto compartido?
              </span>
            </div>
            <button
              onClick={toggleShared}
              className={`w-14 h-8 rounded-full transition-colors relative ${expenseData.isShared ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${expenseData.isShared ? "left-7" : "left-1"}`}
              />
            </button>
          </div>

          {expenseData.isShared && expenseData.involvedVehicles.length > 0 && (
            <div className="animate-in slide-in-from-top-2 duration-300 space-y-2">
              <Label>
                Vehículos Seleccionados ({expenseData.involvedVehicles.length})
              </Label>
              <div className="bg-gray-50 p-3 rounded-2xl flex flex-wrap gap-2 items-center border border-gray-100/50">
                {expenseData.involvedVehicles.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 bg-blue-600 text-white pl-3 pr-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight shadow-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeVehicleTag(tag)}
                      className="hover:bg-blue-700 rounded-md p-0.5 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
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
              className="w-full bg-gray-50 p-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20 resize-none text-gray-700"
            />
          </div>
        </Card>
        <button
          onClick={handleSave}
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
              <ReceiptText size={22} />
              Registrar Movimiento
            </>
          )}
        </button>
      </main>
    </div>
  );
};
