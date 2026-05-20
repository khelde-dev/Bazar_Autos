import { Bookmark, Check, DollarSign, FileText, Info, Loader2, Save, StickyNote } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { NormalizeText } from "../../Utils/Functions/Normalize";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { validateVehicleForm } from "./Functions/Validation";
import { useCarModels, useCreateVehicle } from "./Hooks/useVehicle";
import { useVehicleForm } from "./Hooks/useVehicleForm";
import {
  COLOR_PRESETS,
  COST_TYPE_OVERRIDES,
  EXPENSE_ITEMS,
  STATUS_OPTIONS,
  type VehicleExpenses,
  type VehicleStatus,
  YEAR_OPTIONS,
} from "./Types/ShooppVehicle.types";

const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

const STATUS_STYLES: Record<VehicleStatus, string> = {
  Vendido: "bg-emerald-600 text-white border-emerald-600",
  Inventario: "bg-blue-600 text-white border-blue-600",
  "En espera": "bg-amber-500 text-white border-amber-500",
  Reparacion: "bg-rose-600 text-white border-rose-600",
};

export const ShoppVehicle: React.FC = () => {
  const {
    vehicleData,
    setVehicleData,
    handleInputChange,
    expenses,
    handleExpenseChange,
    handleExpenseNoteChange,
    resetForm,
  } = useVehicleForm();

  const { mutate, isPending } = useCreateVehicle(resetForm);
  const { data: modelsData, isLoading: isLoadingModels } = useCarModels();
  const [isCustomModel, setIsCustomModel] = useState(false);
  const [noteEditing, setNoteEditing] = useState<keyof VehicleExpenses | null>(null);

  const totalInvestment = useMemo(() => {
    const sumExpenses = Object.values(expenses).reduce(
      (acc, curr) => acc + (Number(curr.amount) || 0),
      0,
    );
    const purchasePrice = Number(vehicleData.purchase_price) || 0;
    return Math.round((sumExpenses + purchasePrice) * 100) / 100;
  }, [expenses, vehicleData.purchase_price]);

  const setField = (name: string, value: string | number) => {
    handleInputChange({
      target: { name, value, type: typeof value === "number" ? "number" : "text" },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleStatusChange = (newStatus: VehicleStatus) => {
    setVehicleData((prev) => ({ ...prev, status: newStatus }));
  };

  const handleModelSelectChange = (value: string) => {
    if (value === "__other") {
      setIsCustomModel(true);
      setField("model", "");
    } else {
      setIsCustomModel(false);
      setField("model", value);
    }
  };

  const handleSaleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    if (e.target.value) handleStatusChange("Vendido");
  };

  const handleAmountChange = (key: keyof VehicleExpenses, raw: string) => {
    if (raw === "" || /^\d*\.?\d*$/.test(raw)) {
      handleExpenseChange({
        target: { name: key, value: raw },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleSave = () => {
    if (!validateVehicleForm(vehicleData, expenses)) return;
    const formattedCosts = EXPENSE_ITEMS.map((item) => ({
      cost_type: COST_TYPE_OVERRIDES[item.label] || NormalizeText(item.label),
      amount: Number(expenses[item.key].amount) || 0,
      note: expenses[item.key].note || "",
    }));
    mutate({
      ...vehicleData,
      price_for_sale: Number(vehicleData.price_for_sale) || 0,
      year_of_car: Number(vehicleData.year_of_car) || 0,
      color: COLOR_PRESETS.find((c) => c.value === vehicleData.color)?.name || vehicleData.color,
      purchase_price: totalInvestment,
      costs: formattedCosts,
    });
  };

  const selectedColorName =
    COLOR_PRESETS.find((c) => c.value === vehicleData.color)?.name || "Personalizado";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Registrar vehículo</h1>
          <p className="text-sm text-muted-foreground">
            Agrega un auto nuevo al catálogo con sus gastos asociados.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isPending} size="lg" className="lg:w-auto">
          {isPending ? <Loader2 className="animate-spin" /> : <Save />}
          {isPending ? "Guardando..." : "Guardar en Catálogo"}
        </Button>
      </div>

      {/* Body grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left column: Detalles + Estatus + Precios */}
        <div className="space-y-6 lg:col-span-3">
          {/* Detalles */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="size-4 text-blue-600" />
                <CardTitle className="text-base">Detalles generales</CardTitle>
              </div>
              <CardDescription>Datos básicos del vehículo</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={vehicleData.brand}
                  onChange={handleInputChange}
                  placeholder="Ej. Toyota"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="model">Modelo</Label>
                <Select
                  value={isCustomModel ? "__other" : vehicleData.model || ""}
                  onValueChange={handleModelSelectChange}
                  disabled={isLoadingModels}
                >
                  <SelectTrigger id="model">
                    <SelectValue placeholder={isLoadingModels ? "Cargando..." : "Seleccionar..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {modelsData?.data.map((m) => (
                      <SelectItem key={m.id} value={m.name}>
                        {m.full_name}
                      </SelectItem>
                    ))}
                    <SelectItem value="__other">Otro (personalizar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isCustomModel && (
                <div className="grid gap-1.5 sm:col-span-2">
                  <Label htmlFor="custom-model">Especificar modelo</Label>
                  <Input
                    id="custom-model"
                    name="model"
                    value={vehicleData.model}
                    onChange={handleInputChange}
                    placeholder="Ej. Corolla LE"
                  />
                </div>
              )}

              <div className="grid gap-1.5">
                <Label htmlFor="currentYear">Año actual</Label>
                <Input id="currentYear" value={new Date().getFullYear()} readOnly disabled />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="year_of_car">Año del auto</Label>
                <Select
                  value={String(vehicleData.year_of_car)}
                  onValueChange={(v) => setField("year_of_car", Number(v))}
                >
                  <SelectTrigger id="year_of_car">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEAR_OPTIONS.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color */}
              <div className="grid gap-1.5 sm:col-span-2">
                <Label>Color del vehículo</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-10 w-full justify-start font-normal">
                      <span
                        className="size-5 rounded-md border border-black/10 shadow-inner"
                        style={{ backgroundColor: vehicleData.color }}
                      />
                      <span>{selectedColorName}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4">
                    <div className="grid grid-cols-4 gap-3">
                      {COLOR_PRESETS.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setField("color", color.value)}
                          className="group flex flex-col items-center gap-1"
                        >
                          <div
                            className="flex size-10 items-center justify-center rounded-full border border-border transition-transform group-hover:scale-110"
                            style={{ backgroundColor: color.value }}
                          >
                            {vehicleData.color === color.value && (
                              <Check
                                size={16}
                                className={color.value === "#ffffff" ? "text-slate-800" : "text-white"}
                              />
                            )}
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-border pt-3">
                      <label className="flex items-center justify-between px-1 text-[11px] font-bold text-muted-foreground">
                        MÁS COLORES
                        <input
                          type="color"
                          value={vehicleData.color}
                          name="color"
                          onChange={handleInputChange}
                          className="size-6 cursor-pointer border-none bg-transparent"
                        />
                      </label>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="purchase_date">Fecha de compra</Label>
                <Input
                  id="purchase_date"
                  name="purchase_date"
                  type="date"
                  value={vehicleData.purchase_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="sale_date">Fecha de venta</Label>
                <Input
                  id="sale_date"
                  name="sale_date"
                  type="date"
                  value={vehicleData.sale_date || ""}
                  onChange={handleSaleDateChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Estatus */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bookmark className="size-4 text-blue-600" />
                <CardTitle className="text-base">Estatus</CardTitle>
              </div>
              <CardDescription>Situación actual del vehículo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {STATUS_OPTIONS.map((status) => {
                  const active = vehicleData.status === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleStatusChange(status)}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all",
                        active
                          ? STATUS_STYLES[status]
                          : "border-border bg-background text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Precios */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="size-4 text-blue-600" />
                <CardTitle className="text-base">Precios</CardTitle>
              </div>
              <CardDescription>Compra (calculado) y precio de venta objetivo</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="purchase_price">Precio de compra base</Label>
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="purchase_price"
                    name="purchase_price"
                    type="text"
                    inputMode="decimal"
                    value={vehicleData.purchase_price}
                    onChange={(e) => {
                      if (e.target.value === "" || /^\d*\.?\d*$/.test(e.target.value)) {
                        handleInputChange(e);
                      }
                    }}
                    placeholder="0.00"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="price_for_sale">Precio de venta objetivo</Label>
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="price_for_sale"
                    name="price_for_sale"
                    type="text"
                    inputMode="decimal"
                    value={vehicleData.price_for_sale}
                    onChange={(e) => {
                      if (e.target.value === "" || /^\d*\.?\d*$/.test(e.target.value)) {
                        handleInputChange(e);
                      }
                    }}
                    placeholder="0.00"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      Inversión total
                    </p>
                    <p className="text-xs text-muted-foreground">Precio compra + suma de gastos</p>
                  </div>
                  <span className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
                    {mxnFormatter.format(totalInvestment)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Gastos */}
        <div className="lg:col-span-2">
          <Card className="lg:sticky lg:top-20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-blue-600" />
                <CardTitle className="text-base">Gastos e inversión</CardTitle>
              </div>
              <CardDescription>Conceptos asociados al vehículo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {EXPENSE_ITEMS.map((item) => {
                const entry = expenses[item.key];
                const hasNote = !!entry.note;
                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-2 rounded-lg border border-border/60 p-2"
                  >
                    <Label
                      htmlFor={`exp-${item.key}`}
                      className="flex-1 truncate text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {item.label}
                    </Label>
                    <div className="relative w-32">
                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        $
                      </span>
                      <Input
                        id={`exp-${item.key}`}
                        type="text"
                        inputMode="decimal"
                        value={entry.amount}
                        onChange={(e) => handleAmountChange(item.key, e.target.value)}
                        placeholder="0.00"
                        className="h-8 pl-6 text-right text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      variant={hasNote ? "secondary" : "ghost"}
                      size="icon"
                      className="size-8"
                      onClick={() => setNoteEditing(item.key)}
                      aria-label={hasNote ? "Editar nota" : "Agregar nota"}
                      title={hasNote ? "Editar nota" : "Agregar nota"}
                    >
                      <StickyNote className="size-4" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Note dialog */}
      <Dialog open={!!noteEditing} onOpenChange={(o) => !o && setNoteEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Nota — {noteEditing && EXPENSE_ITEMS.find((i) => i.key === noteEditing)?.label}
            </DialogTitle>
            <DialogDescription>Describe el detalle de este gasto.</DialogDescription>
          </DialogHeader>
          {noteEditing && (
            <Textarea
              value={expenses[noteEditing].note}
              onChange={(e) => handleExpenseNoteChange(noteEditing, e.target.value)}
              placeholder="Ej. Cambio de aceite sintético..."
              rows={4}
            />
          )}
          <DialogFooter>
            <Button onClick={() => setNoteEditing(null)}>Listo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
