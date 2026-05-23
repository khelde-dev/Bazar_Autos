import { TRANSACTION_TYPES, type TransactionType } from "../Types/Investments.types";

interface OperationTypeTabsProps {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

const getActiveColor = (tab: string) => {
  if (tab === "Entrada") return "text-green-600 dark:text-green-400";
  if (tab === "Salida") return "text-red-600 dark:text-red-400";
  return "text-blue-600";
};

export const OperationTypeTabs = ({ value, onChange }: OperationTypeTabsProps) => (
  <div
    role="tablist"
    aria-label="Tipo de operación"
    className="bg-gray-200 dark:bg-gray-700 p-1.5 rounded-2xl flex gap-1"
  >
    {TRANSACTION_TYPES.map((tab) => {
      const active = value === tab;
      return (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(tab)}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
            active
              ? `bg-white dark:bg-gray-800 ${getActiveColor(tab)} shadow-sm`
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {tab}
        </button>
      );
    })}
  </div>
);
