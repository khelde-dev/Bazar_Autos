import { Calendar } from "lucide-react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";

export const RegistrationDate = () => (
  <Card>
    <SectionTitle icon={Calendar} title="Fecha de Registro" />
    <div className="space-y-2">
      <label
        htmlFor="registrationDate"
        className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"
      >
        FECHA AUTOMÁTICA
      </label>
      <div className="relative">
        <input
          id="registrationDate"
          type="date"
          name="registrationDate"
          readOnly
          value={new Date().toLocaleDateString("en-CA")}
          className="w-full bg-gray-50 dark:bg-gray-700 border border-transparent focus:border-blue-500/20 p-4 rounded-2xl text-gray-700 dark:text-gray-400 text-sm font-medium outline-none transition-all appearance-none"
        />
      </div>
    </div>
  </Card>
);
