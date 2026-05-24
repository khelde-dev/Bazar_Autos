import { Loader2, MinusCircle, PlusCircle, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { BackBar } from "./Components/BackBar";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useInvestmentHistory } from "./Hooks/useInvestmentHistory";
import { useUrlFilters } from "./Hooks/useUrlFilters";
import { buildYearRange, formatDateTime, formatMoney } from "./Utils/format";
import type { Transaction, TransactionTypeFilter } from "./Types/Investments.types";

const MONTHS = [
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
];

const TYPE_OPTIONS: Array<{ value: "all" | TransactionTypeFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "Entrada", label: "Entrada" },
  { value: "Salida", label: "Salida" },
];

const TypeBadge = ({ tx }: { tx: Transaction }) => {
  const isIn = tx.type === "Entrada";
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 font-semibold",
        isIn
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
          : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
      )}
    >
      {isIn ? <PlusCircle className="size-3" /> : <MinusCircle className="size-3" />}
      {tx.type}
    </Badge>
  );
};

export const InvestmentHistory = () => {
  const { userId = "", investmentId = "" } = useParams();
  const { year, month, type, setYear, setMonth, setType } = useUrlFilters();

  const currentYear = new Date().getFullYear();
  const effectiveYear = year ?? currentYear;

  const { data, isLoading, isDebouncing } = useInvestmentHistory(investmentId, {
    year: effectiveYear,
    month,
    type,
  });

  const years = useMemo(() => buildYearRange(), []);
  const transactions = data?.data.data ?? [];
  const summary = data?.data.summary ?? null;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <BackBar
        title="Historial de inversión"
        subtitle="Transacciones registradas en esta inversión"
        to={`/investments/${userId}`}
      />

      {/* Summary */}
      {summary && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="overflow-hidden border-0 bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-lg sm:col-span-1">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <Wallet size={20} className="text-blue-100" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">
                  Saldo neto
                </span>
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight">
                {formatMoney(summary.total_neto)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <TrendingUp size={18} className="text-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Ingresos
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight text-emerald-600">
                {formatMoney(summary.total_entradas)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <TrendingDown size={18} className="text-rose-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Egresos
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight text-rose-600">
                {formatMoney(summary.total_salidas)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="grid gap-1.5">
            <Label
              htmlFor="hist-year"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Año
            </Label>
            <Select value={String(effectiveYear)} onValueChange={(v) => setYear(Number(v))}>
              <SelectTrigger id="hist-year">
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
            <Label
              htmlFor="hist-month"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Mes
            </Label>
            <Select
              value={month ? String(month) : "all"}
              onValueChange={(v) => setMonth(v === "all" ? null : Number(v))}
            >
              <SelectTrigger id="hist-month">
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
          <div className="grid gap-1.5">
            <Label
              htmlFor="hist-type"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Tipo
            </Label>
            <Select
              value={type ?? "all"}
              onValueChange={(v) => setType(v === "all" ? null : (v as TransactionTypeFilter))}
            >
              <SelectTrigger id="hist-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {isDebouncing && (
          <div className="mt-3 flex items-center justify-center gap-2 text-primary">
            <Loader2 size={14} className="animate-spin" strokeWidth={3} />
            <span className="text-xs font-medium">Aplicando filtros...</span>
          </div>
        )}
      </Card>

      {/* Transactions */}
      <section aria-label="Transacciones">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-8 animate-spin text-primary" strokeWidth={2.5} />
          </div>
        ) : transactions.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-sm text-muted-foreground">Sin transacciones en este periodo.</p>
          </Card>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {transactions.map((tx) => {
                const isIn = tx.type === "Entrada";
                return (
                  <Card key={tx.transaction_id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl",
                          isIn
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                        )}
                      >
                        {isIn ? <PlusCircle size={20} /> : <MinusCircle size={20} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{tx.concept}</p>
                        <TypeBadge tx={tx} />
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {formatDateTime(tx.created)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-sm font-bold",
                          isIn ? "text-emerald-600" : "text-rose-600"
                        )}
                      >
                        {isIn ? "+" : "-"}
                        {tx.amount}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Desktop table */}
            <Card className="hidden overflow-hidden p-0 md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => {
                    const isIn = tx.type === "Entrada";
                    return (
                      <TableRow key={tx.transaction_id}>
                        <TableCell className="font-medium">{tx.concept}</TableCell>
                        <TableCell>
                          <TypeBadge tx={tx} />
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDateTime(tx.created)}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-right font-bold",
                            isIn ? "text-emerald-600" : "text-rose-600"
                          )}
                        >
                          {isIn ? "+" : "-"}
                          {tx.amount}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </>
        )}
      </section>
    </div>
  );
};
