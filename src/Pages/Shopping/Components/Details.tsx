import type React from "react";
import {Info} from 'lucide-react';
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
import { InputField } from "../../../Utils/Screen/Inputs/InputField";
export const Details:React.FC=()=>{
    return(
        <>
         <section className="bg-white p-5 rounded-3xl shadow-sm space-y-5">
          <SectionTitle icon={Info} title="Detalles Generales" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Marca" placeholder="Ej. Toyota" />
            <InputField label="Modelo" placeholder="Ej. Camry" />
            <InputField label="Año Actual" placeholder="2024" />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Año del Auto</label>
              <select className="bg-gray-50 p-3 rounded-xl text-sm appearance-none border border-transparent outline-none">
                <option>2024</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Color</label>
            <button className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl text-sm text-gray-500">
              <div className="w-6 h-6 bg-blue-500 rounded-sm" />
              Seleccionar color
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Fecha de Compra" type="date" />
            <InputField label="Fecha de Venta" type="date" />
          </div>
        </section>
        </>
    );
};