import { Footer } from "../Footer/Footer";

export const BodyHome = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col items-center justify-start bg-[#f7f9fb] dark:bg-slate-900 font-sans relative transition-colors">
    {children}
    <Footer />
  </div>
);
