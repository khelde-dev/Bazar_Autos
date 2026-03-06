import type React from "react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { AlignLeft } from "lucide-react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";

interface NotesProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Notes: React.FC<NotesProps> = ({ value, onChange }) => {
  return (
    <Card>
      <SectionTitle icon={AlignLeft} title="Notas" />

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
          Observaciones
        </label>
        <textarea
          name="notes"
          value={value}
          onChange={onChange}
          placeholder="Detalles adicionales de la inversión..."
          rows={5}
          className="w-full bg-gray-50 p-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20 focus:bg-white resize-none text-gray-700 transition-all"
        />
      </div>
    </Card>
  );
};