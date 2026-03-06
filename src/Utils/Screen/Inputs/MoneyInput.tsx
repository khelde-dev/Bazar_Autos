interface MoneyInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const MoneyInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = "0.00" 
}: MoneyInputProps) => {

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
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
          $
        </span>
        <input 
          name={name}
          type="text" 
          inputMode="decimal" // Teclado numérico con punto en móviles
          value={value} 
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-gray-50 p-3 pl-8 rounded-xl text-sm border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700"
        />
      </div>
    </div>
  );
};