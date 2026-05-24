import { Users, X } from "lucide-react";
import type React from "react";
import { Label } from "../../../Utils/Screen/Text/Label";

interface SharedVehiclesSectionProps {
  isShared: boolean;
  involvedVehicles: string[];
  onToggle: () => void;
  onRemoveTag: (tag: string) => void;
}

export const SharedVehiclesSection: React.FC<SharedVehiclesSectionProps> = ({
  isShared,
  involvedVehicles,
  onToggle,
  onRemoveTag,
}) => (
  <>
    <div
      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
        isShared
          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
          : "bg-gray-50 dark:bg-gray-700/50 border-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <Users className={isShared ? "text-blue-600" : "text-gray-400"} size={22} />
        <span
          className={`font-bold text-sm ${isShared ? "text-blue-900 dark:text-blue-300" : "text-gray-500 dark:text-gray-400"}`}
        >
          ¿Monto compartido?
        </span>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`w-14 h-8 rounded-full transition-colors relative ${isShared ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
      >
        <div
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isShared ? "left-7" : "left-1"}`}
        />
      </button>
    </div>

    {isShared && involvedVehicles.length > 0 && (
      <div className="animate-in slide-in-from-top-2 duration-300 space-y-2">
        <Label>Vehículos Seleccionados ({involvedVehicles.length})</Label>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-2xl flex flex-wrap gap-2 items-center border border-gray-100/50 dark:border-gray-600">
          {involvedVehicles.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 bg-blue-600 text-white pl-3 pr-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight shadow-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="hover:bg-blue-700 rounded-md p-0.5 transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
    )}
  </>
);
