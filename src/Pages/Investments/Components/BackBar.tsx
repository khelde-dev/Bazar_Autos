import type React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackBarProps {
  title: string;
  subtitle?: React.ReactNode;
  /** Navigate to this path on click. Falls back to navigate(-1) if omitted. */
  to?: string;
  /** Custom click handler — takes priority over `to`. */
  onClick?: () => void;
}

export const BackBar = ({ title, subtitle, to, onClick }: BackBarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) { onClick(); return; }
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="icon" onClick={handleBack} aria-label="Volver">
        <ArrowLeft />
      </Button>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};
