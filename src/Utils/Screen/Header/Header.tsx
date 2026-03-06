import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  Title: string;
}

export const Header: React.FC<HeaderProps> = ({ Title = "" }) => {
  return (
    <>
      <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
        <button className="text-blue-600">
          <ChevronLeft size={28} />
        </button>
        <h1 className="font-bold text-lg">{Title}</h1>
        <div className="w-7" /> {/* Espaciador para centrar título */}
      </header>
    </>
  );
};
