import { Calendar } from "lucide-react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import React from "react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";

export const RegistrationDate: React.FC = () => {
  return (
    <Card>
      <SectionTitle icon={Calendar} title="Fecha de Registro" />
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
          Fecha Automática
        </label>
        <div className="w-full bg-gray-100/80 p-4 rounded-2xl text-gray-500 text-sm font-medium">
          05/20/2024
        </div>
      </div>
    </Card>
  );
};
