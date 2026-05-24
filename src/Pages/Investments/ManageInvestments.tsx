import { ArrowRightLeft, History, Loader2, Wallet } from "lucide-react";
import { BackBar } from "./Components/BackBar";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useInvestmentsList } from "./Hooks/useInvestmentsList";
import { useUrlFilters } from "./Hooks/useUrlFilters";
import { buildYearRange, formatMoney, formatShortDate } from "./Utils/format";

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

export const ManageInvestments = () => {
  const { userId = "" } = useParams();
  const navigate = useNavigate();
  const { year, month, setYear, setMonth } = useUrlFilters();

  const currentYear = new Date().getFullYear();
  const effectiveYear = year ?? currentYear;

  const { data, isLoading, isDebouncing } = useInvestmentsList(userId, {
    year: effectiveYear,
    month,
  });

  const years = useMemo(() => buildYearRange(), []);
  const investments = data?.data.data ?? [];
  const totalBalance = data?.data.current_total_balance ?? 0;

  const goToOperation = (investorId: string, investmentAmount: string) =>
    navigate(`/investments/${userId}/${investorId}/operation`, {
      state: { investmentAmount },
    });

  const goToHistory = (investorId: string) =>
    navigate(`/investments/${userId}/${investorId}/history`);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <BackBar
        title="Gestionar inversiones"
        subtitle="Inversiones activas del inversionista seleccionado"
        to="/investments"
      />

      {/* Balance card */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[2px] text-blue-100">
                Saldo total actual
              </p>
              <p className="mt-1 text-4xl font-black tracking-tight">{formatMoney(totalBalance)}</p>
              <p className="mt-1 text-xs text-blue-100">
                Suma de todas las inversiones activas
              </p>
            </div>
            <Wallet size={32} className="text-blue-100" />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="inv-year" className="text-xs uppercase tracking-wider text-muted-foreground">
              Año
            </Label>
            <Select value={String(effectiveYear)} onValueChange={(v) => setYear(Number(v))}>
              <SelectTrigger id="inv-year">
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
            <Label htmlFor="inv-month" className="text-xs uppercase tracking-wider text-muted-foreground">
              Mes
            </Label>
            <Select
              value={month ? String(month) : "all"}
              onValueChange={(v) => setMonth(v === "all" ? null : Number(v))}
            >
              <SelectTrigger id="inv-month">
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
        {isDebouncing && (
          <div className="mt-3 flex items-center justify-center gap-2 text-primary">
            <Loader2 size={14} className="animate-spin" strokeWidth={3} />
            <span className="text-xs font-medium">Aplicando filtros...</span>
          </div>
        )}
      </Card>

      {/* List */}
      <section aria-label="Inversiones">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-8 animate-spin text-primary" strokeWidth={2.5} />
          </div>
        ) : investments.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-sm text-muted-foreground">No hay inversiones en este periodo.</p>
          </Card>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {investments.map((inv) => (
                <Card key={inv.investor_id} className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => goToHistory(inv.investor_id)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="text-[11px] text-muted-foreground">
                        {formatShortDate(inv.created)}
                      </p>
                      <p className="mt-1 truncate text-lg font-bold text-primary">
                        {formatMoney(inv.investment_amount)}
                      </p>
                      <Badge variant="secondary" className="mt-1 font-mono text-[10px]">
                        #{inv.investor_id.slice(0, 8)}
                      </Badge>
                    </button>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => goToHistory(inv.investor_id)}
                        aria-label="Ver historial"
                      >
                        <History />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => goToOperation(inv.investor_id, inv.investment_amount)}
                        aria-label="Nueva transacción"
                      >
                        <ArrowRightLeft />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop table */}
            <Card className="hidden overflow-hidden p-0 md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha de registro</TableHead>
                    <TableHead>ID inversión</TableHead>
                    <TableHead className="text-right">Monto invertido</TableHead>
                    <TableHead className="w-40 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map((inv) => (
                    <TableRow
                      key={inv.investor_id}
                      className="cursor-pointer"
                      onClick={() => goToHistory(inv.investor_id)}
                    >
                      <TableCell className="text-muted-foreground">
                        {formatShortDate(inv.created)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-[11px]">
                          #{inv.investor_id.slice(0, 8)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-base font-bold text-primary">
                        {formatMoney(inv.investment_amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToHistory(inv.investor_id);
                            }}
                          >
                            <History />
                            Historial
                          </Button>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToOperation(inv.investor_id, inv.investment_amount);
                            }}
                          >
                            <ArrowRightLeft />
                            Operación
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        )}
      </section>
    </div>
  );
};
