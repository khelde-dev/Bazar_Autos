import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackBarProps {
  title: string;
  to?: string;
}

export const BackBar = ({ title, to }: BackBarProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <div className="flex items-center gap-3 py-2">
      <button
        onClick={handleBack}
        className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-blue-600 dark:text-blue-400 active:scale-95 transition-all shadow-sm"
        aria-label="Volver atrás"
        title="Volver"
      >
        <ArrowLeft size={20} strokeWidth={2.5} />
      </button>
      <h1 className="font-semibold text-slate-800 dark:text-slate-100 text-lg tracking-tight">{title}</h1>
    </div>
  );
};
