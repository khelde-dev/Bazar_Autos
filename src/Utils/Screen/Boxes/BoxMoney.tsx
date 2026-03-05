import { DollarSign } from "lucide-react";
import type React from "react";

interface BoxMoneyProps {
  value: string;
}
export const BoxMoney:React.FC<BoxMoneyProps>=({value='0.0'})=>{
    return(
        <>
          <section className="bg-blue-50/50 border-2 border-blue-100 p-6 rounded-3xl text-center">
          <h3 className="text-blue-600 font-bold text-[10px] uppercase tracking-[2px] mb-4">Precio de Venta Objetivo</h3>
          <div className="flex items-center justify-center gap-4 text-blue-300">
            <DollarSign size={32} />
            <span className="text-5xl font-bold">{value}</span>
          </div>
        </section>
        </>
    );
};