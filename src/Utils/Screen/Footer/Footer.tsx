import type React from "react";

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="mt-8 text-center text-[11px] font-medium text-slate-400 tracking-wider">
        © {new Date().getFullYear()} ACCESO PROFESIONAL • BAZAR DE AUTOS
      </footer>
    </>
  );
};
