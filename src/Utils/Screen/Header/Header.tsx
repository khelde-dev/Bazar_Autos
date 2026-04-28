import { Loader2, LogOut } from "lucide-react";
import type React from "react";
import { useLogOutMutation } from "../../../Pages/Login/Hooks/UseLoginMutation";
import { ThemeToggle } from "../../../Components/ThemeToggle";

interface HeaderProps {
  Title: string;
  user: string;
}

export const Header: React.FC<HeaderProps> = ({ Title = "", user = "" }) => {
  const { mutate, isPending } = useLogOutMutation();

  const handleLogout = () => {
    mutate();
  };

  return (
    <header className="bg-white dark:bg-slate-800 p-4 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 dark:border-slate-700 shadow-lg shadow-gray-100 dark:shadow-slate-950/40 transition-colors">
      <h1 className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight">{Title}</h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex flex-col items-end mr-1">
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none">
            Usuario
          </span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{user}</span>
        </div>
        <div className="h-9 w-9 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-sm border-2 border-white dark:border-slate-800">
          {user[0].toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className={`p-2.5 rounded-xl transition-all border flex items-center justify-center group ${isPending
            ? "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600"
            : "bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 border-red-100/50 dark:border-red-900/50 active:scale-95 hover:bg-red-100 dark:hover:bg-red-900/40 shadow-sm shadow-red-100/20"
            }`}
          title="Cerrar sesión"
          type="button"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin text-gray-400 dark:text-slate-400" />
          ) : (
            <LogOut
              size={18}
              strokeWidth={2.5}
              className="group-hover:rotate-12 transition-transform"
            />
          )}
        </button>
      </div>
    </header>
  );
};
