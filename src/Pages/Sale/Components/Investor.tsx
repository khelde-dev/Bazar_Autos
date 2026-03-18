import { User } from "lucide-react";
import type React from "react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
//import { INVESTOR_OPTIONS } from "../Types/SaleVehicle.types";

interface InvestorProps {
  value: string;
  //onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const Investor: React.FC<InvestorProps> = ({value}) => {

  return (
    <Card>
      <SectionTitle icon={User} title="Inversionista" />

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
          Usuario
        </label>

          <input
            type="text"
            name="user"
            disabled={true}
            value={value}
            className="w-full bg-gray-50 border border-transparent focus:border-blue-500/20 p-4 rounded-2xl text-gray-700 text-sm font-medium outline-none transition-all appearance-none"
          />
        {/*<div className="relative">
          <select 
            name="investorName"
            value={value}
            onChange={onChange}
            className="w-full bg-gray-50 border border-transparent focus:border-blue-500/20 focus:bg-white p-4 rounded-2xl text-gray-700 text-sm appearance-none outline-none transition-all cursor-pointer"
          >
            <option value="" disabled>Seleccione un inversionista</option>
            {INVESTOR_OPTIONS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown size={20} />
          </div>
          </div>*/}
      </div>
    </Card>
  );
};
