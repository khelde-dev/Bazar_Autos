import { Search, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface CarSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CarSearchBar: React.FC<CarSearchBarProps> = ({
  value,
  onChange,
  placeholder = "Buscar por marca, modelo...",
}) => {
  const [local, setLocal] = useState(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const timer = setTimeout(() => onChangeRef.current(local), 400);
    return () => clearTimeout(timer);
  }, [local]);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleClear = () => {
    setLocal("");
    onChange("");
  };

  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
        size={18}
      />
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-slate-800 pl-11 pr-10 py-3.5 rounded-2xl text-sm border border-gray-100 dark:border-slate-700 shadow-sm outline-none focus:border-blue-400/40 dark:focus:border-blue-500/60 text-gray-700 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all"
      />
      {local && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
