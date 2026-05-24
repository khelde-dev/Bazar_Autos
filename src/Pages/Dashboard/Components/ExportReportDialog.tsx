import { useMemo, useReducer } from "react";
import { CalendarIcon, Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { exportReport } from "@/Services/reports.service";
import type { ReportType, ReportFormat } from "@/Services/reports.service";

const REPORT_TYPES: Array<{ value: ReportType; label: string }> = [
  { value: "sales", label: "Ventas (Catálogo)" },
  { value: "expenses", label: "Gastos" },
  { value: "investments", label: "Inversionistas" },
  { value: "full", label: "Reporte completo" },
];

const FORMATS: Array<{ value: ReportFormat; label: string }> = [
  { value: "xlsx", label: "Excel (.xlsx)" },
  { value: "csv", label: "CSV (.csv)" },
  { value: "pdf", label: "PDF (.pdf)" },
];

// Constant lower bound — doesn't change
const MIN_DATE = new Date("1900-01-01");

// ── State ──────────────────────────────────────────────────────────────────────
interface DialogState {
  open: boolean;
  reportType: ReportType;
  exportFormat: ReportFormat;
  range: DateRange | undefined;
  isExporting: boolean;
}

type DialogAction =
  | { type: "SET_OPEN"; payload: boolean }
  | { type: "SET_REPORT_TYPE"; payload: ReportType }
  | { type: "SET_FORMAT"; payload: ReportFormat }
  | { type: "SET_RANGE"; payload: DateRange | undefined }
  | { type: "SET_EXPORTING"; payload: boolean };

const initialState: DialogState = {
  open: false,
  reportType: "full",
  exportFormat: "xlsx",
  range: undefined,
  isExporting: false,
};

function reducer(state: DialogState, action: DialogAction): DialogState {
  switch (action.type) {
    case "SET_OPEN":       return { ...state, open: action.payload };
    case "SET_REPORT_TYPE": return { ...state, reportType: action.payload };
    case "SET_FORMAT":     return { ...state, exportFormat: action.payload };
    case "SET_RANGE":      return { ...state, range: action.payload };
    case "SET_EXPORTING":  return { ...state, isExporting: action.payload };
  }
}

// ── Component ──────────────────────────────────────────────────────────────────
export const ExportReportDialog = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { open, reportType, exportFormat, range, isExporting } = state;

  // Stable "today" — computed once per mount, no new Date() in JSX
  const today = useMemo(() => new Date(), []);

  const handleExport = async () => {
    if (!range?.from || !range?.to) {
      toast.error("Selecciona un rango de fechas para exportar");
      return;
    }
    dispatch({ type: "SET_EXPORTING", payload: true });
    try {
      await exportReport({
        type: reportType,
        format: exportFormat,
        date_from: format(range.from, "yyyy-MM-dd"),
        date_to: format(range.to, "yyyy-MM-dd"),
      });
      toast.success("Reporte descargado", {
        description: `${REPORT_TYPES.find((r) => r.value === reportType)?.label} · ${exportFormat.toUpperCase()}`,
      });
      dispatch({ type: "SET_OPEN", payload: false });
    } catch {
      toast.error("Error al generar el reporte. Intenta de nuevo.");
    } finally {
      dispatch({ type: "SET_EXPORTING", payload: false });
    }
  };

  const rangeLabel =
    range?.from && range?.to
      ? `${format(range.from, "d MMM yyyy", { locale: es })} → ${format(range.to, "d MMM yyyy", { locale: es })}`
      : "Seleccionar rango de fechas";

  return (
    <Dialog open={open} onOpenChange={(v) => dispatch({ type: "SET_OPEN", payload: v })}>
      <DialogTrigger asChild>
        <Button>
          <Download />
          Descargar reporte
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Descargar reporte</DialogTitle>
          <DialogDescription>
            Selecciona qué quieres exportar, el formato y el rango de fechas.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="report-type">Tipo de reporte</Label>
            <Select
              value={reportType}
              onValueChange={(v) => dispatch({ type: "SET_REPORT_TYPE", payload: v as ReportType })}
            >
              <SelectTrigger id="report-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_TYPES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="export-format">Formato</Label>
            <Select
              value={exportFormat}
              onValueChange={(v) => dispatch({ type: "SET_FORMAT", payload: v as ReportFormat })}
            >
              <SelectTrigger id="export-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>Rango de fechas</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start font-normal",
                    !range?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {rangeLabel}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={range?.from}
                  selected={range}
                  onSelect={(v) => dispatch({ type: "SET_RANGE", payload: v })}
                  numberOfMonths={2}
                  captionLayout="dropdown"
                  locale={es}
                  disabled={(date) => date > today || date < MIN_DATE}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="ghost" disabled={isExporting}>Cancelar</Button>
          </DialogClose>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <FileSpreadsheet />
            )}
            {isExporting ? "Generando..." : "Exportar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
