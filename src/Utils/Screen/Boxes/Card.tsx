export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-50 dark:border-slate-700 space-y-6 transition-colors">
    {children}
  </div>
);
