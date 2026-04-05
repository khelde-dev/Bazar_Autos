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
        className="p-2 rounded-full bg-white border border-gray-100 text-blue-600 active:scale-95 transition-all shadow-sm"
        aria-label="Volver atrás"
        title="Volver"
      >
        <ArrowLeft size={20} strokeWidth={2.5} />
      </button>
      <h1 className="font-bold text-slate-800 text-lg tracking-tight">{title}</h1>
    </div>
  );
};
