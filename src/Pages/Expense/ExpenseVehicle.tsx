import { Calendar, Car, Check, DollarSign, Loader2, PencilLine, ReceiptText, Search, Users, X } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { CarModel } from "../Shopping/Types/ShooppVehicle.types";
import { useCarModels } from "../Shopping/Hooks/useVehicle";
import { GenerateArray } from "./Functions/Utils";
import { validateExpense } from "./Functions/Validation";
import { useExpenseForm } from "./Hooks/useExpenseForm";
import { useCategories, useExpense } from "./Hooks/useExpenseMutate";
import { type Category, MAIN_MOVEMENT_TYPES } from "./Types/ExpenseVehicle.types";

export const ExpenseVehicle: React.FC = () => {
  const {
    expenseData,
    setExpenseData,
    handleChange,
    toggleShared,
    removeVehicleTag,
  } = useExpenseForm();

  const { mutate, isPending } = useExpense(() => {
    setExpenseData((p) => ({ ...p, amount: 0, description: "", involvedVehicles: [] }));
  });
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
  const { data: modelsData, isLoading: isLoadingModels } = useCarModels(true);

  const categoriesArray = useMemo<Category[]>(
    () => categoriesData?.data ?? [],
    [categoriesData],
  );
  const modelsArray = useMemo<CarModel[]>(() => modelsData?.data ?? [], [modelsData]);

  const categoryTypes = useMemo(
    () => Array.from(new Set(categoriesArray.map((c) => c.type))),
    [categoriesArray],
  );

  const filteredCategories = useMemo(
    () => categoriesArray.filter((c) => c.type === expenseData.subType),
    [categoriesArray, expenseData.subType],
  );

  const [vehicleSearch, setVehicleSearch] = useState("");
  const [vehiclePopover, setVehiclePopover] = useState(false);

  const filteredModels = useMemo(() => {
    const q = vehicleSearch.toLowerCase();
    return modelsArray.filter((m) => m.full_name.toLowerCase().includes(q));
  }, [modelsArray, vehicleSearch]);

  const handleSelectVehicle = (fullName: string) => {
    if (expenseData.isShared) {
      setExpenseData((prev) => {
        if (prev.involvedVehicles.includes(fullName)) return prev;
        return { ...prev, involvedVehicles: [...prev.involvedVehicles, fullName] };
      });
      setVehicleSearch("");
    } else {
      setExpenseData((prev) => ({ ...prev, mainVehicleId: fullName }));
      setVehiclePopover(false);
    }
  };

  const handleSave = () => {
    if (!validateExpense(expenseData)) return;
    mutate({
      type: expenseData.type,
      movements_category_id: expenseData.movements_category_id,
      amount: expenseData.amount,
      isShared: expenseData.isShared,
      description: expenseData.description,
      closing_date: expenseData.closing_date,
      car_id: GenerateArray(expenseData, modelsArray),
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Registrar movimiento</h1>
          <p className="text-sm text-muted-foreground">Compras y gastos asociados al inventario</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/expenses/list">
            <PencilLine />
            Ver / editar registrados
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Tipo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tipo de movimiento</CardTitle>
              <CardDescription>Define el origen del gasto o compra</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {MAIN_MOVEMENT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setExpenseData((prev) => ({ ...prev, type: t }))}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all",
                      expenseData.type === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categoría */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Categoría</CardTitle>
              <CardDescription>Clasificación del movimiento</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingCategories ? (
                <Loader2 className="size-5 animate-spin text-primary" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="subType">Subtipo</Label>
                    <Select
                      value={expenseData.subType}
                      onValueChange={(v) =>
                        handleChange({
                          target: { name: "subType", value: v },
                        } as React.ChangeEvent<HTMLSelectElement>)
                      }
                    >
                      <SelectTrigger id="subType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryTypes.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="movements_category_id">Categoría</Label>
                    <Select
                      value={expenseData.movements_category_id || ""}
                      onValueChange={(v) =>
                        handleChange({
                          target: { name: "movements_category_id", value: v },
                        } as React.ChangeEvent<HTMLSelectElement>)
                      }
                    >
                      <SelectTrigger id="movements_category_id">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCategories.map((cat) => (
                          <SelectItem key={cat.category_id} value={cat.category_id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehículo */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Vehículo(s)</CardTitle>
                  <CardDescription>Asocia uno o varios autos</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="shared-toggle" className="text-xs text-muted-foreground">
                    Compartido
                  </Label>
                  <Switch
                    id="shared-toggle"
                    checked={expenseData.isShared}
                    onCheckedChange={toggleShared}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoadingModels ? (
                <Loader2 className="size-5 animate-spin text-primary" />
              ) : (
                <Popover open={vehiclePopover} onOpenChange={setVehiclePopover}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-10 w-full justify-start font-normal">
                      <Car className="size-4" />
                      {expenseData.isShared
                        ? "Añadir vehículos involucrados..."
                        : expenseData.mainVehicleId || "Seleccionar vehículo principal..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <div className="relative border-b border-border">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        autoFocus
                        value={vehicleSearch}
                        onChange={(e) => setVehicleSearch(e.target.value)}
                        placeholder="Buscar marca/modelo..."
                        className="rounded-none border-0 pl-9 focus-visible:ring-0"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredModels.length === 0 ? (
                        <p className="p-4 text-center text-xs text-muted-foreground">Sin resultados</p>
                      ) : (
                        filteredModels.map((m) => {
                          const selected = expenseData.isShared
                            ? expenseData.involvedVehicles.includes(m.full_name)
                            : expenseData.mainVehicleId === m.full_name;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => handleSelectVehicle(m.full_name)}
                              className={cn(
                                "flex w-full items-center justify-between px-3 py-2.5 text-sm transition-colors hover:bg-accent",
                                selected && "bg-accent",
                              )}
                            >
                              <span className="flex items-center gap-2">
                                <span className="font-medium">{m.full_name}</span>
                                <span className="text-xs text-muted-foreground">{m.year_of_car}</span>
                              </span>
                              {selected && <Check className="size-4 text-primary" />}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}

              {expenseData.isShared && expenseData.involvedVehicles.length > 0 && (
                <div className="flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-3">
                  <Users className="size-4 shrink-0 text-blue-600" />
                  <div className="flex flex-wrap gap-1.5">
                    {expenseData.involvedVehicles.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeVehicleTag(tag)}
                          className="rounded p-0.5 hover:bg-background"
                          aria-label={`Quitar ${tag}`}
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Monto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monto</CardTitle>
              <CardDescription>Cantidad en MXN</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <DollarSign
                  className={cn(
                    "absolute left-3 top-1/2 size-5 -translate-y-1/2 font-bold",
                    expenseData.subType === "Activo" ? "text-emerald-500" : "text-blue-500",
                  )}
                />
                <Input
                  name="amount"
                  type="number"
                  value={expenseData.amount || ""}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="h-14 pl-10 text-2xl font-bold"
                />
              </div>
            </CardContent>
          </Card>

          {/* Fecha + Descripción */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Detalles</CardTitle>
              <CardDescription>Fecha de cierre y notas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="closing_date">Fecha de cierre</Label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="closing_date"
                    name="closing_date"
                    type="date"
                    value={expenseData.closing_date}
                    onChange={handleChange}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={expenseData.description}
                  onChange={handleChange}
                  placeholder="Detalles adicionales..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={isPending} size="lg" className="w-full">
            {isPending ? <Loader2 className="animate-spin" /> : <ReceiptText />}
            {isPending ? "Procesando..." : "Registrar movimiento"}
          </Button>
        </div>
      </div>
    </div>
  );
};
