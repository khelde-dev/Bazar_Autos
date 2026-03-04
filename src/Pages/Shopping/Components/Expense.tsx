import type React from "react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
import { FileText } from "lucide-react";
import { MoneyInput } from "../../../Utils/Screen/Inputs/MoneyInput";
import { Card } from "../../../Utils/Screen/Boxes/Card";

export const Expense: React.FC = () => {
  return (
    <>
      <Card>
        <SectionTitle
          icon={FileText}
          title="Gastos e Inversión"
          extra={
            <span className="bg-blue-600 text-[10px] text-white px-2 py-1 rounded-full font-bold">
              MONEDA: MXN
            </span>
          }
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {[
            "Llantas",
            "Hojalatería",
            "Tapicería",
            "Cielo",
            "Volante",
            "Funda",
            "Mecánico",
            "Tapones",
            "Multa",
            "Kit",
            "Sombrerera",
            "Rin/Llaveta/Aceite",
            "Tapón Facción",
            "Alineación",
            "Manija",
            "Faros/Calaveras",
          ].map((item) => (
            <MoneyInput key={item} label={item} />
          ))}
        </div>
      </Card>
    </>
  );
};
