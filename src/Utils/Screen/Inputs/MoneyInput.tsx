import { FileText, X } from "lucide-react";
import { useState } from "react";

interface MoneyInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  noteValue?: string;
  onNoteChange?: (note: string) => void;
}

export const MoneyInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "0.00",
  noteValue,
  onNoteChange,
}: MoneyInputProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-sm font-semibold">
            $
          </span>
          <input
            name={name}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={filterNumericInput}
            placeholder={placeholder}
            className="w-full bg-gray-50 dark:bg-slate-900 p-3 pl-8 rounded-xl text-sm border border-transparent dark:border-slate-700 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-slate-700 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500"
          />
        </div>
        {onNoteChange && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`p-3 rounded-xl transition-all border flex items-center justify-center ${
              noteValue
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900"
                : "bg-gray-50 dark:bg-slate-900 text-gray-400 dark:text-slate-500 border-transparent dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-600 dark:hover:text-slate-300"
            }`}
            title={noteValue ? "Editar nota" : "Agregar nota"}
          >
            <FileText size={20} />
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Nota del Gasto</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <textarea
                value={noteValue || ""}
                onChange={(e) => onNoteChange?.(e.target.value)}
                placeholder="Ej. Lavado de vestiduras, cambio de aceite sintético..."
                className="w-full h-32 bg-gray-50 dark:bg-slate-900 p-3 rounded-xl text-sm border border-transparent dark:border-slate-700 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none resize-none transition-all text-slate-700 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500"
              />
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-600 dark:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
