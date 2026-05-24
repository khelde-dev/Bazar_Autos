import { Car, Check, ChevronDown } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import type { CarModel } from "../../Shopping/Types/ShooppVehicle.types";
import { Label } from "../../../Utils/Screen/Text/Label";

interface VehicleSearchInputProps {
  modelsArray: CarModel[];
  isShared: boolean;
  mainVehicleId: string;
  involvedVehicles: string[];
  onSelectModel: (fullName: string) => void;
}

export const VehicleSearchInput: React.FC<VehicleSearchInputProps> = ({
  modelsArray,
  isShared,
  mainVehicleId,
  involvedVehicles,
  onSelectModel,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModels = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return modelsArray.filter((car) => car.full_name.toLowerCase().includes(lower));
  }, [modelsArray, searchTerm]);

  const handleSelect = (fullName: string) => {
    onSelectModel(fullName);
    if (isShared) {
      setSearchTerm("");
    } else {
      setSearchTerm(fullName);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="relative">
      <Label>{isShared ? "Añadir Vehículos involucrados" : "Vehículo Principal"}</Label>
      <div className="relative">
        <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={isShared ? "Escribe para añadir varios..." : "Buscar marca..."}
          value={isSearchOpen ? searchTerm : isShared ? "" : mainVehicleId}
          onFocus={() => setIsSearchOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-700 pl-12 pr-10 py-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20 text-gray-700 dark:text-gray-200"
        />
        <ChevronDown
          size={18}
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${isSearchOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isSearchOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 max-h-60 overflow-y-auto animate-in zoom-in-95 duration-150">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => {
              const isSelected = isShared
                ? involvedVehicles.includes(model.full_name)
                : mainVehicleId === model.full_name;

              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => handleSelect(model.full_name)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-sm transition-colors border-b border-gray-50 last:border-none ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{model.full_name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {model.year_of_car}
                    </span>
                    {isSelected && isShared && (
                      <span className="text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                        Añadido
                      </span>
                    )}
                  </span>
                  {isSelected && <Check size={16} className="text-blue-600" />}
                </button>
              );
            })
          ) : (
            <div className="p-4 text-xs text-gray-400 dark:text-gray-500 text-center">
              No hay resultados
            </div>
          )}
        </div>
      )}

      {isSearchOpen && (
        <button
          type="button"
          aria-label="Cerrar buscador"
          className="fixed inset-0 z-40 cursor-default bg-transparent"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </div>
  );
};
