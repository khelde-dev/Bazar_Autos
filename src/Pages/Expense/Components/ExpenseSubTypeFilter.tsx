import type { ExpenseSubType } from "../Types/ExpenseList.types";

const OPTIONS: Array<{ key: ExpenseSubType | null; label: string }> = [
  { key: null, label: "Todos" },
  { key: "Activo", label: "Activo" },
  { key: "Pasivo", label: "Pasivo" },
];

interface Props {
  value: ExpenseSubType | null;
  onChange: (type: ExpenseSubType | null) => void;
}

export const ExpenseSubTypeFilter = ({ value, onChange }: Props) => (
  <div
    role="tablist"
    aria-label="Filtrar por subtipo"
    className="bg-gray-200 dark:bg-gray-700 p-1.5 rounded-2xl flex gap-1"
  >
    {OPTIONS.map((opt) => {
      const active = value === opt.key;
      return (
        <button
          key={opt.label}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(opt.key)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            active
              ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);
