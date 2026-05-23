import { Car, Loader2, Pencil, Search, Trash2, X } from "lucide-react";
import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { resolveCarColor } from "../../Utils/Functions/colorUtils";
import { CarListItem } from "./Components/CarListItem";
import { CarPagination } from "./Components/CarPagination";
import { DeleteConfirmModal } from "./Components/DeleteConfirmModal";
import { useCarFilters } from "./Hooks/useCarFilters";
import { useCars } from "./Hooks/useCars";
import { useDeleteCar } from "./Hooks/useDeleteCar";
import type {
  CarListItem as CarListItemType,
  CarPagination as CarPaginationType,
} from "./Types/Cars.types";

const DEFAULT_PAGINATION: CarPaginationType = {
  total: 0,
  totalPages: 1,
  currentPage: 1,
  limit: 10,
  hasNextPage: false,
  hasPrevPage: false,
};

const MONTHS: Array<{ value: string; label: string }> = [
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

const STATUS_VARIANT: Record<string, string> = {
  Inventario: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  Vendido: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  Apartado: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  "En espera": "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  Reparacion: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

const formatPrice = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return "—";
  const cleaned = typeof value === "string" ? value.replace(/[^0-9.-]/g, "") : value;
  const n = Number(cleaned);
  return Number.isNaN(n)
    ? "—"
    : n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 });
};

export const CarListPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    filters,
    availableYears,
    setPage,
    handleSearchChange,
    handleYearChange,
    handleMonthChange,
  } = useCarFilters();

  const { data, isLoading, isFetching } = useCars(filters);
  const [carToDelete, setCarToDelete] = useState<CarListItemType | null>(null);
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteCar();

  // Debounced search input
  const [searchLocal, setSearchLocal] = useState(filters.search);
  // Derived state: sync searchLocal when filters.search changes externally (e.g. reset).
  // setState during render = React-recommended escape hatch for derived state.
  const [prevFilterSearch, setPrevFilterSearch] = useState(filters.search);
  if (prevFilterSearch !== filters.search) {
    setPrevFilterSearch(filters.search);
    setSearchLocal(filters.search);
  }

  const onSearchRef = useRef(handleSearchChange);
  // Update ref after render (React 19: never mutate ref during render)
  useLayoutEffect(() => {
    onSearchRef.current = handleSearchChange;
  });

  useEffect(() => {
    const timer = setTimeout(() => onSearchRef.current(searchLocal), 300);
    return () => clearTimeout(timer);
  }, [searchLocal]);

  const rows = data?.data.rows ?? [];
  const pagination = data?.data.pagination ?? DEFAULT_PAGINATION;

  const handleDeleteConfirm = () => {
    if (!carToDelete) return;
    deleteMutate(carToDelete.car_id, { onSuccess: () => setCarToDelete(null) });
  };

  const handleRowClick = (car: CarListItemType) => {
    navigate(`/cars/${car.car_id}/edit`, { state: { listItem: car } });
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Catálogo de vehículos</h1>
          <p className="text-sm text-muted-foreground">
            {pagination.total} {pagination.total === 1 ? "vehículo" : "vehículos"} registrados
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
          <div className="grid gap-1.5">
            <Label htmlFor="car-search" className="text-xs uppercase tracking-wider text-muted-foreground">
              Buscar
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="car-search"
                value={searchLocal}
                onChange={(e) => setSearchLocal(e.target.value)}
                placeholder="Marca, modelo..."
                className="pl-9 pr-9"
              />
              {searchLocal && (
                <button
                  type="button"
                  onClick={() => setSearchLocal("")}
                  aria-label="Limpiar"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="car-year" className="text-xs uppercase tracking-wider text-muted-foreground">
              Año
            </Label>
            <Select
              value={filters.year ? String(filters.year) : "all"}
              onValueChange={(v) => handleYearChange(v === "all" ? null : Number(v))}
            >
              <SelectTrigger id="car-year" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {availableYears.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="car-month" className="text-xs uppercase tracking-wider text-muted-foreground">
              Mes
            </Label>
            <Select
              value={filters.month ? String(filters.month) : "all"}
              onValueChange={(v) => handleMonthChange(v === "all" ? null : Number(v))}
            >
              <SelectTrigger id="car-month" className="w-40">
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
      </Card>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-primary" strokeWidth={2.5} />
        </div>
      ) : rows.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 p-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <Car className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold">Sin resultados</p>
          <p className="text-xs text-muted-foreground">
            No hay vehículos que coincidan con tu búsqueda.
          </p>
        </Card>
      ) : (
        <>
          {/* Mobile: cards */}
          <div
            className={`space-y-3 md:hidden ${isFetching ? "opacity-60 transition-opacity" : ""}`}
          >
            {rows.map((car) => (
              <CarListItem
                key={car.car_id}
                car={car}
                onClick={() => handleRowClick(car)}
                onDeleteRequest={setCarToDelete}
              />
            ))}
          </div>

          {/* Desktop: table */}
          <Card
            className={`hidden overflow-hidden p-0 md:block ${isFetching ? "opacity-60 transition-opacity" : ""}`}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead className="text-right">Compra</TableHead>
                  <TableHead className="text-right">Inversion total</TableHead>
                  <TableHead className="text-right">Venta</TableHead>
                  <TableHead className="w-24 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((car) => (
                  <TableRow
                    key={car.car_id}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(car)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="font-semibold">{car.brand}</span>
                        <span className="text-xs text-muted-foreground">{car.model}</span>
                      </div>
                    </TableCell>
                    <TableCell>{car.year_of_car}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block size-4 rounded-full border border-black/10"
                          style={{ backgroundColor: resolveCarColor(car.color) }}
                          title={car.color}
                        />
                        <span className="text-xs capitalize text-muted-foreground">
                          {car.color}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={STATUS_VARIANT[car.status] ?? "bg-muted text-muted-foreground"}
                      >
                        {car.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatPrice(car.initial_purchase_price)}
                    </TableCell>
                     <TableCell className="text-right text-muted-foreground">
                      {formatPrice(car.purchase_price)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatPrice(car.price_for_sale)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(car);
                          }}
                          aria-label="Editar"
                          className="size-8"
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCarToDelete(car);
                          }}
                          aria-label="Eliminar"
                          className="size-8 text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
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

      <CarPagination
        pagination={pagination}
        onPageChange={setPage}
        isLoading={isFetching}
      />

      <DeleteConfirmModal
        car={carToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setCarToDelete(null)}
      />
    </div>
  );
};
