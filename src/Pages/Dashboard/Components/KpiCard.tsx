import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
  trend?: { direction: "up" | "down"; value: string };
  accent?: "blue" | "green" | "rose" | "amber" | "violet";
}

const ACCENT_CLASSES: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
};

export const KpiCard = ({
  label,
  value,
  icon: Icon,
  hint,
  trend,
  accent = "blue",
}: KpiCardProps) => (
  <Card className="overflow-hidden">
    <CardContent className="flex items-start gap-3 p-5">
      <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", ACCENT_CLASSES[accent])}>
        <Icon size={18} strokeWidth={2.25} />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-2xl font-semibold tracking-tight">{value}</p>
        {(hint || trend) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {trend && (
              <span
                className={cn(
                  "font-semibold",
                  trend.direction === "up" ? "text-emerald-600" : "text-rose-600",
                )}
              >
                {trend.direction === "up" ? "▲" : "▼"} {trend.value}
              </span>
            )}
            {hint && <span className="truncate">{hint}</span>}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
