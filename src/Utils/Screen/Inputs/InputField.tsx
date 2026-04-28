interface InputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disable?: boolean;
  type?: string;
}

export const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disable,
  type = "text",
}: InputProps) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      disabled={disable}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-gray-50 dark:bg-slate-900 border border-transparent dark:border-slate-700 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 p-3 rounded-xl text-sm transition-all outline-none text-slate-700 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500"
    />
  </div>
);
