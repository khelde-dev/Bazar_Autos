import { ChevronDown, User } from "lucide-react";
import type React from "react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
//import { INVESTOR_OPTIONS } from "../Types/SaleVehicle.types";

interface InvestorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  listUsers:any;
}
export const Investor: React.FC<InvestorProps> = ({value,onChange,listUsers}) => {

  return (
    <Card>
      <SectionTitle icon={User} title="Inversionista" />

      <div className="space-y-2">
        <div className="relative">
          <select 
            name="user_id"
            value={value}
            onChange={onChange}
            className="w-full bg-gray-50 border border-transparent focus:border-blue-500/20 focus:bg-white p-4 rounded-2xl text-gray-700 text-sm appearance-none outline-none transition-all cursor-pointer"
          >
            <option value="" disabled>Seleccione un inversionista</option>
            {listUsers.map((user:any) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown size={20} />
          </div>
          </div>
      </div>
    </Card>
  );
};
