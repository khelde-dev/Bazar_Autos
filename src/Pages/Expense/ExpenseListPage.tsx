import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2, Pencil, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
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
import { resolveCarColor } from "../../Utils/Functions/colorUtils";
import { buildYearRange } from "../Investments/Utils/format";
import { BackBar } from "../Investments/Components/BackBar";
import { ExpenseSharedCard } from "./Components/ExpenseSharedCard";
import { DeleteExpenseModal } from "./Components/DeleteExpenseModal";
import { useExpenseList } from "./Hooks/useExpenseList";
import { useExpenseUrlFilters } from "./Hooks/useExpenseUrlFilters";
import { useDeleteExpense } from "./Hooks/useExpenseMutate";
import type {
  ExpensePagination,
  ExpenseSubType,
  SharedExpenseRow,
} from "./Types/ExpenseList.types";

const mxnFormatter = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function getPageNumbers(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  const result: PageItem[] = [1];
  if (left > 2) result.push("ellipsis-start");
  for (let i = left; i <= right; i++) result.push(i);
  if (right < total - 1) result.push("ellipsis-end");
  result.push(total);
  return result;
}

const ExpensePager = ({
  pagination,
  onPageChange,
}: {
  pagination: ExpensePagination;
  onPageChange: (p: number) => void;
}) => {
  const { currentPage, totalPages, total, hasNextPage, hasPrevPage } = pagination;
  const pages = getPageNumbers(currentPage, totalPages);
  return (
    <div className="flex items-center justify-between pt-1">
      <span className="text-xs text-muted-foreground">
        {total} resultado{total !== 1 ? "s" : ""}
      </span>
      {totalPages > 1 && (
        <Pagination className="mx-0 w-auto">
          <PaginationContent className="gap-0.5">
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPrevPage}
                className="size-9"
                aria-label="Página anterior"
              >
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem className="sm:hidden">
              <span className="px-2 text-sm tabular-nums text-muted-foreground">
                {currentPage} / {totalPages}
              </span>
            </PaginationItem>
            {pages.map((page) =>
              typeof page === "string" ? (
                <PaginationItem key={page} className="hidden sm:flex">
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page} className="hidden sm:flex">
                  <button
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-label={`Página ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-9 text-sm",
                      currentPage === page &&
                        "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    )}
                  >
                    {page}
                  </button>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
                className="size-9"
                aria-label="Página siguiente"
              >
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

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

const SUBTYPE_OPTIONS: Array<{ value: "all" | ExpenseSubType; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "Activo", label: "Activo" },
  { value: "Pasivo", label: "Pasivo" },
];

export const ExpenseListPage = () => {
  const navigate = useNavigate();
  const { year, month, type, name, page, setYear, setMonth, setType, setName, setPage } =
    useExpenseUrlFilters();

  const currentYear = new Date().getFullYear();
  const effectiveYear = year ?? currentYear;
  const years = useMemo(() => buildYearRange(), []);

  const filters = useMemo(
    () => ({ isShared: true, year: effectiveYear, month, type, name, page }),
    [effectiveYear, month, type, name, page]
  );

  const { data, isLoading, isDebouncing } = useExpenseList(filters);
  const [rowToDelete, setRowToDelete] = useState<SharedExpenseRow | null>(null);
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteExpense(() =>
    setRowToDelete(null)
  );

  const rows = (data?.data?.rows ?? []) as SharedExpenseRow[];
  const pagination = data?.data?.pagination ?? null;

  const handleEditShared = (row: SharedExpenseRow) => {
    navigate(`/expenses/${row.category.id}/edit`, { state: { sharedRow: row } });
  };

  const handleDeleteConfirm = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete.movements_ids);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <BackBar
        title="Gastos registrados"
        subtitle={`Vista agrupada por categoría · ${pagination?.total ?? 0} resultados`}
        to="/expenses"
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="grid gap-1.5 lg:col-span-2">
            <Label
              htmlFor="exp-search"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Buscar por categoría
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="exp-search"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. llantas, gasolina..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label
              htmlFor="exp-year"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Año
            </Label>
            <Select value={String(effectiveYear)} onValueChange={(v) => setYear(Number(v))}>
              <SelectTrigger id="exp-year">
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
              htmlFor="exp-month"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Mes
            </Label>
            <Select
              value={month ? String(month) : "all"}
              onValueChange={(v) => setMonth(v === "all" ? null : Number(v))}
            >
              <SelectTrigger id="exp-month">
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
              htmlFor="exp-subtype"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Subtipo
            </Label>
            <Select
              value={type ?? "all"}
              onValueChange={(v) => setType(v === "all" ? null : (v as ExpenseSubType))}
            >
              <SelectTrigger id="exp-subtype">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUBTYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {isDebouncing && (
        <div className="flex items-center justify-center gap-2 text-primary">
          <Loader2 size={13} className="animate-spin" strokeWidth={3} />
          <span className="text-xs font-medium">Aplicando filtros...</span>
        </div>
      )}

      {/* Content */}
      <section aria-label="Lista de gastos" aria-live="polite" aria-busy={isLoading}>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-8 animate-spin text-primary" strokeWidth={2.5} />
          </div>
        ) : rows.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-sm text-muted-foreground">
              Sin resultados para los filtros seleccionados.
            </p>
          </Card>
        ) : (
          <>
            {/* Mobile: cards */}
            <div className="space-y-3 md:hidden">
              {rows.map((row) => (
                <ExpenseSharedCard
                  key={row.category.id}
                  row={row}
                  onEdit={() => handleEditShared(row)}
                  onDelete={() => setRowToDelete(row)}
                />
              ))}
            </div>

            {/* Desktop: table */}
            <Card className="hidden overflow-hidden p-0 md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Tipo de movimiento</TableHead>
                    <TableHead>Subtipo</TableHead>
                    <TableHead>Vehículos</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Por auto</TableHead>
                    <TableHead className="w-24 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.total}>
                      <TableCell className="font-semibold">{row.category.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          style={{
                            backgroundColor:
                              row.type === "Gasto" ? "var(--chart-1)" : "var(--chart-3)",
                            color: "white",
                          }}
                          className="border-0"
                        >
                          {row.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            row.category.type === "Activo"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                          }
                        >
                          {row.category.type}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex max-w-md flex-wrap gap-1">
                          {row.cars.slice(0, 3).map((car) => (
                            <span
                              key={car.car_id}
                              className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium"
                            >
                              <span
                                className="inline-block size-2.5 rounded-full border border-black/10"
                                style={{ backgroundColor: resolveCarColor(car.color) }}
                              />
                              {car.brand} {car.model}
                            </span>
                          ))}
                          {row.cars.length > 3 && (
                            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                              +{row.cars.length - 3}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {mxnFormatter.format(row.total)}
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {row.cars.length > 1
                          ? mxnFormatter.format(row.total / row.cars.length)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label="Editar"
                            onClick={() => handleEditShared(row)}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                            aria-label="Eliminar"
                            onClick={() => setRowToDelete(row)}
                          >
                            <Trash2 />
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

      {pagination && <ExpensePager pagination={pagination} onPageChange={setPage} />}

      <DeleteExpenseModal
        row={rowToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setRowToDelete(null)}
      />
    </div>
  );
};
