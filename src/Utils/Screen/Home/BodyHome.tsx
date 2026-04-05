import { Footer } from "../Footer/Footer";

export const BodyHome = ({ children }: { children: React.ReactNode }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-start bg-[#f7f9fb] font-sans relative"
  >
    {children}
    <Footer />
  </div>
);
