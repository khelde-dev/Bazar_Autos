import { TRANSACTION_TYPES, type TransactionType } from "../Types/Investments.types";

interface OperationTypeTabsProps {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

export const OperationTypeTabs = ({ value, onChange }: OperationTypeTabsProps) => (
  <div
    role="tablist"
    aria-label="Tipo de operación"
    className="bg-gray-200 p-1.5 rounded-2xl flex gap-1"
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
            active ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      );
    })}
  </div>
);
