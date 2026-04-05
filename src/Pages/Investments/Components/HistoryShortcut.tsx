import { ChevronRight, History } from "lucide-react";
import { Link } from "react-router-dom";

interface HistoryShortcutProps {
  userId: string;
}

export const HistoryShortcut = ({ userId }: HistoryShortcutProps) => (
  <Link
    to={`/investments/${userId}`}
    className="w-full flex items-center justify-between px-4 py-4 bg-white rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors active:scale-[0.98] duration-200 border border-gray-100"
  >
    <div className="flex items-center gap-3">
      <History size={20} className="text-blue-600" />
      <span className="text-sm font-semibold">Ver Historial de Inversiones</span>
    </div>
    <ChevronRight size={16} className="text-gray-400" />
  </Link>
);
