import React from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useLogOutMutation } from "../../../Pages/Login/Hooks/UseLoginMutation";

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
    <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 shadow-lg shadow-gray-100">
      <h1 className="font-bold text-lg text-slate-800 tracking-tight">{Title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end mr-1">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">
            Usuario
          </span>
          <span className="text-sm font-bold text-slate-700 leading-tight">{user}</span>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-sm border-2 border-white">
          {user[0].toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className={`p-2.5 rounded-xl transition-all border flex items-center justify-center group ${
            isPending
              ? "bg-gray-100 border-gray-200"
              : "bg-red-50 text-red-500 border-red-100/50 active:scale-95 hover:bg-red-100 shadow-sm shadow-red-100/20"
          }`}
          title="Cerrar sesión"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin text-gray-400" />
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
