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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
            $
          </span>
          <input
            name={name}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full bg-gray-50 p-3 pl-8 rounded-xl text-sm border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700"
          />
        </div>
        {onNoteChange && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`p-3 rounded-xl transition-all border flex items-center justify-center ${
              noteValue
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100 hover:text-gray-600"
            }`}
            title={noteValue ? "Editar nota" : "Agregar nota"}
          >
            <FileText size={20} />
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-slate-800">Nota del Gasto</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <textarea
                autoFocus
                value={noteValue || ""}
                onChange={(e) => onNoteChange?.(e.target.value)}
                placeholder="Ej. Lavado de vestiduras, cambio de aceite sintético..."
                className="w-full h-32 bg-gray-50 p-3 rounded-xl text-sm border border-transparent focus:border-blue-500 focus:bg-white outline-none resize-none transition-all text-slate-700"
              />
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
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
