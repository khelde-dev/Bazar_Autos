import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const MONTHS = [
  { value: "all", label: "Todos" },
  { value: "1", label: "Enero" },
  { value: "2", label: "Febrero" },
  { value: "3", label: "Marzo" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Mayo" },
  { value: "6", label: "Junio" },
  { value: "7", label: "Julio" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
] as const;

interface DashboardFiltersProps {
  year: string;
  month: string;
  years: number[];
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
}

export const DashboardFilters = ({
  year,
  month,
  years,
  onYearChange,
  onMonthChange,
}: DashboardFiltersProps) => (
  <div className="flex flex-wrap items-end gap-3">
    <div className="grid gap-1.5">
      <Label htmlFor="filter-year" className="text-xs uppercase tracking-wider text-muted-foreground">
        Año
      </Label>
      <Select value={year} onValueChange={onYearChange}>
        <SelectTrigger id="filter-year" className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="grid gap-1.5">
      <Label htmlFor="filter-month" className="text-xs uppercase tracking-wider text-muted-foreground">
        Mes
      </Label>
      <Select value={month} onValueChange={onMonthChange}>
        <SelectTrigger id="filter-month" className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);
