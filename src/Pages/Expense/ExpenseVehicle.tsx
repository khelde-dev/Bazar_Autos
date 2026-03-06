import React, { useState } from "react";
import {
  ChevronDown,
  Car,
  DollarSign,
  Users,
  X,
  ReceiptText,
  Check,
} from "lucide-react";
import { Card } from "../../Utils/Screen/Boxes/Card";
import { Label } from "../../Utils/Screen/Text/Label";
import { useExpenseForm } from "./Hooks/useExpenseForm";
import {
  CATEGORY_MAP,
  MAIN_MOVEMENT_TYPES,
  type SubType,
} from "./Types/ExpenseVehicle.types";
import { useRegisterExpense } from "./Hooks/useRegisterExpenseMutate";
import { validateExpense } from "./Functions/Validation";

export const ExpenseVehicle: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    expenseData,
    setExpenseData,
    handleChange,
    toggleShared,
    removeVehicleTag,
    searchTerm,
    setSearchTerm,
    filteredBrands,
  } = useExpenseForm();

  const { mutate, isPending } = useRegisterExpense();

  const handleSave = () => {
    if (!validateExpense(expenseData)) return;
    mutate(expenseData);
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
                    setExpenseData((prev) => ({ ...prev, mainType: t }))
                  }
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all border ${
                    expenseData.mainType === t
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                      : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
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
                  <option value="Activo">Activo (+)</option>
                  <option value="Pasivo">Pasivo (-)</option>
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
                  name="categoryId"
                  value={expenseData.categoryId}
                  onChange={handleChange}
                  className="w-full bg-gray-50 p-4 rounded-2xl text-sm appearance-none outline-none border border-transparent"
                >
                  <option value="">Seleccionar...</option>
                  {CATEGORY_MAP[expenseData.subType as SubType].map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
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
                  filteredBrands.map((brand) => {
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
