import { DollarSign } from "lucide-react";
import type React from "react";

interface BoxMoneyProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
}

export const BoxMoney: React.FC<BoxMoneyProps> = ({ 
  value, 
  onChange, 
  name, 
  label = "Precio de Venta Objetivo" 
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(inputValue) || inputValue === "") {
      onChange(e);
    }
  };

  return (
    <section className="bg-blue-50/50 border-2 border-blue-100 p-8 rounded-[32px] text-center transition-all focus-within:border-blue-400 focus-within:bg-white shadow-sm">
      <h3 className="text-blue-600 font-bold text-[10px] uppercase tracking-[2px] mb-4">
        {label}
      </h3>
      
      <div className="relative flex items-center justify-center max-w-[300px] mx-auto">
        <DollarSign 
          size={32} 
          strokeWidth={3} 
          className="text-blue-500 mr-1 shrink-0" 
        />
        <input
          name={name}
          value={value}
          onChange={handleChange}
          placeholder="0.00"
          className="bg-transparent text-5xl font-black text-blue-600 outline-none w-full text-center placeholder:text-blue-200 caret-blue-600"
          type="text"
          inputMode="decimal"
          autoComplete="off"
        />
      </div>
    </section>
  );
};