interface MoneyInputProps {
  label: string;
  name: string;
  value: number | string;
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

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(val) || val === "") {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full group">
      <label className="text-[10px] font-bold text-gray-400 group-focus-within:text-blue-500 uppercase tracking-wider ml-1 transition-colors">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
          $
        </span>
        <input 
          name={name}
          type="text" 
          inputMode="decimal"
          value={value === 0 ? "" : value}
          onChange={handleInputFilter}
          placeholder={placeholder}
          className="w-full bg-gray-50 p-3 pl-8 rounded-xl text-sm border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-slate-700 font-medium"
        />
      </div>
    </div>
  );
};