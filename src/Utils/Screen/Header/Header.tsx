import React from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { useLogOutMutation } from '../../../Pages/Login/Hooks/UseLoginMutation';

interface HeaderProps {
  Title: string;
}

export const Header: React.FC<HeaderProps> = ({ Title = "" }) => {
  const { mutate, isPending } = useLogOutMutation();

  const handleLogout = () => {
    mutate(); 
  };

  return (
    <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 shadow-sm shadow-gray-50/50">
      <h1 className="font-bold text-lg text-slate-800 tracking-tight">
        {Title}
      </h1>
      
      <button 
        onClick={handleLogout}
        disabled={isPending}
        className={`p-2.5 rounded-xl transition-all border flex items-center justify-center group ${
          isPending 
            ? 'bg-gray-100 border-gray-200' 
            : 'bg-red-50 text-red-500 border-red-100/50 active:scale-95 hover:bg-red-100'
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
    </header>
  );
};
