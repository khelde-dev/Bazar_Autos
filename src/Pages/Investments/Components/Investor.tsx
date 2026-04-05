import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
import { InvestorAvatarCard } from "./InvestorAvatarCard";
import { HistoryShortcut } from "./HistoryShortcut";

interface UserItem {
  id: string;
  name: string;
}

interface InvestorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  listUsers: UserItem[];
}

/**
 * Componente compuesto:
 *  - Si no hay inversionista seleccionado: muestra el <select>.
 *  - Si hay seleccionado: muestra la card con avatar + accesos directos a
 *    "Gestionar Montos" e "Historial de Inversiones".
 *  - El botón de editar en la card regresa al modo select.
 */
export const Investor = ({ value, onChange, listUsers }: InvestorProps) => {
  const [forceSelect, setForceSelect] = useState(false);

  const selected = listUsers.find((u) => u.id === value);
  const showCard = selected && !forceSelect;

  const handleEdit = () => setForceSelect(true);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
    setForceSelect(false);
  };

  if (showCard) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Inversionista seleccionado
          </label>
        </div>
        <InvestorAvatarCard name={selected.name} id={selected.id} onEdit={handleEdit} />
        <HistoryShortcut userId={selected.id} />
      </div>
    );
  }

  return (
    <Card>
      <SectionTitle icon={User} title="Inversionista" />
      <div className="space-y-2">
        <div className="relative">
          <select
            name="user_id"
            value={value}
            onChange={handleSelect}
            className="w-full bg-gray-50 border border-transparent focus:border-blue-500/20 focus:bg-white p-4 rounded-2xl text-gray-700 text-sm appearance-none outline-none transition-all cursor-pointer"
          >
            <option value="" disabled>
              Seleccione un inversionista
            </option>
            {listUsers.map((user) => (
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
