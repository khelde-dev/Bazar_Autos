import type React from "react";
import { SectionTitle } from "../../../Utils/Screen/Inputs/SectionTitle";
import { FileText } from "lucide-react";
import { MoneyInput } from "../../../Utils/Screen/Inputs/MoneyInput";

export const Expense:React.FC=()=>{
    return(
        <>
                <section className="bg-white p-5 rounded-3xl shadow-sm">
          <SectionTitle 
            icon={FileText} 
            title="Gastos e Inversión" 
            extra={<span className="bg-blue-600 text-[10px] text-white px-2 py-1 rounded-full font-bold">MONEDA: MXN</span>}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {[
              "Llantas", "Hojalatería", "Tapicería", "Cielo", 
              "Volante", "Funda", "Mecánico", "Tapones",
              "Multa", "Kit", "Sombrerera", "Rin/Llaveta/Aceite",
              "Tapón Facción", "Alineación", "Manija", "Faros/Calaveras"
            ].map((item) => <MoneyInput key={item} label={item} />)}
          </div>
        </section>
        </>
    );
};