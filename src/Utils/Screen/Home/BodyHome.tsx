import { Footer } from "../Footer/Footer";

export const BodyHome = ({ children }: { children: React.ReactNode }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-start p-4 bg-[#f4f7fb] font-sans relative"
    style={{
      backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  >
    {children}
    <Footer />
  </div>
);
