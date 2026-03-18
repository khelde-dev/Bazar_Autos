import type React from "react";
import { Check, ChevronDown, Info, Loader2 } from 'lucide-react';
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
import { InputField } from "../../../Utils/Screen/Inputs/InputField";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { COLOR_PRESETS, YEAR_OPTIONS, type VehicleDetails } from "../Types/ShooppVehicle.types";
import { useState } from "react";
import { useCarModels } from "../Hooks/useVehicle";


interface DetailsProps {
  data: VehicleDetails;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const Details: React.FC<DetailsProps> = ({ data, onInputChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const { data: modelsData, isLoading } =useCarModels();

  const handleSelectColor = (colorValue: string) => {
    onInputChange({
      target: { name: "color", value: colorValue }
    } as React.ChangeEvent<HTMLInputElement>);
    setShowColorPicker(false);
  };

  return (
    <Card>
      <SectionTitle icon={Info} title="Detalles Generales" />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Marca"
          name="brand"
          value={data.brand}
          onChange={onInputChange}
          placeholder="Ej. Toyota"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
            Modelo
          </label>
          <div className="relative">
            <select
              name="model"
              value={data.model}
              onChange={onInputChange}
              disabled={isLoading}
              className="w-full bg-gray-50 p-3 rounded-xl text-sm appearance-none border border-transparent outline-none focus:border-blue-500 transition-all text-slate-700 disabled:opacity-50"
            >
              <option value="">{isLoading ? "Cargando..." : "Seleccionar..."}</option>
              {modelsData?.data.map((m: any) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              {isLoading ? (
                <Loader2 size={16} className="animate-spin text-blue-500" />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
          </div>
        </div>

        <InputField
          label="Año Actual"
          name="currentYear"
          type="number"
          disable={true}
          value={new Date().getFullYear()}
          onChange={onInputChange}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
            Año del Auto
          </label>
          <select
            name="year_of_car"
            value={data.year_of_car}
            onChange={onInputChange}
            className="bg-gray-50 p-3 rounded-xl text-sm appearance-none border border-transparent outline-none focus:border-blue-500 transition-all"
          >
            {YEAR_OPTIONS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-4 relative">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
          Color del Vehículo
        </label>
        <button
          type="button"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl text-sm text-slate-700 border border-transparent hover:bg-gray-100 transition-all active:scale-[0.98]"
        >
          <div
            className="w-6 h-6 rounded-md shadow-inner border border-black/10"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-medium">
            {COLOR_PRESETS.find(c => c.value === data.color)?.name || "Personalizado"}
          </span>
        </button>
        {showColorPicker && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowColorPicker(false)} />
            <div className="absolute top-16 left-0 w-full bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 animate-in fade-in zoom-in duration-200">
              <div className="grid grid-cols-4 gap-3">
                {COLOR_PRESETS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleSelectColor(color.value)}
                    className="group relative flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: color.value }}
                    >
                      {data.color === color.value && (
                        <Check size={16} className={color.value === '#ffffff' ? 'text-slate-800' : 'text-white'} />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{color.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50">
                <label className="flex items-center justify-between text-[11px] text-slate-400 font-bold px-1">
                  MÁS COLORES
                  <input
                    type="color"
                    value={data.color}
                    onChange={(e) => onInputChange(e)}
                    name="color"
                    className="w-6 h-6 bg-transparent border-none cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <InputField
          label="Fecha de Compra"
          name="purchase_date"
          type="date"
          value={data.purchase_date}
          onChange={onInputChange}
        />
        <InputField
          label="Fecha de Venta"
          name="sale_date"
          type="date"
          value={data.sale_date || ""}
          onChange={onInputChange}
        />
      </div>
    </Card>
  );
};