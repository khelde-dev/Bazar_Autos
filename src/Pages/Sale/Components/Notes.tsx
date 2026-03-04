import type React from "react";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { AlignLeft } from "lucide-react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";

export const Notes: React.FC = () => {
  return (
    <Card>
      <SectionTitle icon={AlignLeft} title="Notas" />

      <textarea
        placeholder="Detalles adicionales de la inversión..."
        rows={5}
        className="w-full bg-gray-50 p-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20 resize-none text-gray-700"
      />
    </Card>
  );
};
