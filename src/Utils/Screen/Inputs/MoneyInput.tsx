export const MoneyInput = ({ label }: { label: string }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
      <input 
        type="text" 
        defaultValue="0.00"
        className="w-full bg-gray-50 p-3 pl-7 rounded-xl text-sm border border-transparent focus:border-blue-500 outline-none"
      />
    </div>
  </div>
);