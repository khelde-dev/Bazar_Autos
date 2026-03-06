import { DollarSign } from "lucide-react";
import type React from "react";

interface BoxMoneyProps {
  value?: string;
}

export const BoxMoney: React.FC<BoxMoneyProps> = ({ value }) => {
  return (
    <section className="bg-blue-50/50 border-2 border-blue-100 p-8 rounded-4xl text-center transition-all focus-within:border-blue-400 focus-within:bg-white shadow-sm">
      <h3 className="text-blue-600 font-bold text-[10px] uppercase tracking-[2px] mb-4">
        Precio de Venta Objetivo
      </h3>
      
      <div className="relative flex items-center justify-center max-w-75 mx-auto">
        <DollarSign 
          size={32} 
          strokeWidth={3} 
          className="text-blue-500 mr-1" 
        />
        <input
          defaultValue={value}
          placeholder="0.00"
          className="bg-transparent text-5xl font-black text-blue-600 outline-none w-full text-center placeholder:text-blue-200 caret-blue-600"
          step="0.01"
          inputMode="decimal"
        />
      </div>
    </section>
  );
};