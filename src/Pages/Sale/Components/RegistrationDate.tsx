import { Calendar } from "lucide-react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import React from "react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";

interface RegistrationDateProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegistrationDate: React.FC<RegistrationDateProps> = ({ value, onChange }) => {
  return (
    <Card>
      <SectionTitle icon={Calendar} title="Fecha de Registro" />
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
          FECHA AUTOMÁTICA
        </label>
        <div className="relative">
          <input
            type="date"
            name="registrationDate"
            value={value}
            onChange={onChange}
            className="w-full bg-gray-50 border border-transparent focus:border-blue-500/20 p-4 rounded-2xl text-gray-700 text-sm font-medium outline-none transition-all appearance-none"
          />
        </div>
      </div>
    </Card>
  );
};