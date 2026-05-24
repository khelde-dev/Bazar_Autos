import { useState } from "react";
import { CalendarIcon, Download, FileSpreadsheet } from "lucide-react";
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

const REPORT_TYPES = [
  { value: "sales", label: "Ventas (Catálogo)" },
  { value: "expenses", label: "Gastos" },
  { value: "investments", label: "Inversionistas" },
  { value: "full", label: "Reporte completo" },
] as const;

type ReportType = (typeof REPORT_TYPES)[number]["value"];

const FORMATS = [
  { value: "xlsx", label: "Excel (.xlsx)" },
  { value: "csv", label: "CSV (.csv)" },
  { value: "pdf", label: "PDF (.pdf)" },
] as const;

type ExportFormat = (typeof FORMATS)[number]["value"];

export const ExportReportDialog = () => {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState<ReportType>("full");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("xlsx");
  const [range, setRange] = useState<DateRange | undefined>();

  const handleExport = () => {
    if (!range?.from || !range?.to) {
      toast.error("Selecciona un rango de fechas para exportar");
      return;
    }
    // TODO: wire to backend endpoint
    toast.success("Reporte en cola — recibirás un enlace por correo", {
      description: `${REPORT_TYPES.find((r) => r.value === reportType)?.label} · ${exportFormat.toUpperCase()}`,
    });
    setOpen(false);
  };

  const rangeLabel =
    range?.from && range?.to
      ? `${format(range.from, "d MMM yyyy", { locale: es })} → ${format(range.to, "d MMM yyyy", { locale: es })}`
      : "Seleccionar rango de fechas";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Select value={reportType} onValueChange={(v) => setReportType(v as ReportType)}>
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
            <Select value={exportFormat} onValueChange={(v) => setExportFormat(v as ExportFormat)}>
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
                  onSelect={setRange}
                  numberOfMonths={2}
                  captionLayout="dropdown"
                  locale={es}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleExport}>
            <FileSpreadsheet />
            Exportar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
