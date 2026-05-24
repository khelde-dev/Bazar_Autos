import { SquarePen } from "lucide-react";
import { UserAvatar } from "./UserAvatar";

interface InvestorAvatarCardProps {
  name: string;
  id: string;
  subtitle?: string;
  onEdit: () => void;
}

export const InvestorAvatarCard = ({
  name,
  id,
  subtitle = "Inversionista",
  onEdit,
}: InvestorAvatarCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 dark:border-gray-700">
    <UserAvatar name={name} size="lg" />
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 leading-tight truncate">
        {name}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
        {subtitle} • ID: #{id.slice(0, 6)}
      </p>
    </div>
    <button
      type="button"
      onClick={onEdit}
      className="p-2 rounded-full text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors active:scale-95"
      aria-label="Cambiar inversionista"
      title="Cambiar inversionista"
    >
      <SquarePen size={20} />
    </button>
  </div>
);
