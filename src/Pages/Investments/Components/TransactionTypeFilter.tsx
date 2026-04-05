import { TRANSACTION_TYPES, type TransactionTypeFilter as TType } from "../Types/Investments.types";

interface TransactionTypeFilterProps {
  value: TType | null;
  onChange: (type: TType | null) => void;
}

export const TransactionTypeFilter = ({ value, onChange }: TransactionTypeFilterProps) => {
  const options: Array<{ key: TType | null; label: string }> = [
    { key: null, label: "Todos" },
    ...TRANSACTION_TYPES.map((t) => ({ key: t, label: t })),
  ];

  return (
    <div
      role="tablist"
      aria-label="Filtrar por tipo de transacción"
      className="bg-gray-200 p-1.5 rounded-2xl flex gap-1"
    >
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.label}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              active ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
