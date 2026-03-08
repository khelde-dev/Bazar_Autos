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
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      disabled={disable}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white p-3 rounded-xl text-sm transition-all outline-none text-slate-700"
    />
  </div>
);

