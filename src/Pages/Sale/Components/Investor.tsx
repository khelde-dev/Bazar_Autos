import { ChevronDown, User } from "lucide-react";
import type React from "react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";

export const Investor: React.FC = () => {
  return (
    <Card>
      <SectionTitle icon={User} title="Inversionista" />

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
          Seleccionar Usuario
        </label>
        <div className="relative">
          <select className="w-full bg-gray-50 border border-transparent focus:border-blue-500/20 p-4 rounded-2xl text-gray-700 text-sm appearance-none outline-none transition-all">
            <option>Seleccione un inversionista</option>
            <option>Inversionista A</option>
            <option>Inversionista B</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
    </Card>
  );
};
