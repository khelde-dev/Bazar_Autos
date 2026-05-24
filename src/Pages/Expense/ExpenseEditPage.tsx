import { Calendar, Car, Check, DollarSign, Loader2, Save, Search, Users, X } from "lucide-react";
import { BackBar } from "../Investments/Components/BackBar";
import type React from "react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { useCategories, useUpdateExpense } from "./Hooks/useExpenseMutate";
import type { IndividualExpenseRow, SharedExpenseRow } from "./Types/ExpenseList.types";
import {
  type Category,
  MAIN_MOVEMENT_TYPES,
  type VehicleExpense,
} from "./Types/ExpenseVehicle.types";

const formatDateForInput = (iso: string) => iso.split("T")[0];
const isSharedMovement = (description: string) => description.startsWith("[Compartido]");

const buildInitialState = (row: IndividualExpenseRow): VehicleExpense => ({
  type: row.movement.type as VehicleExpense["type"],
  subType: row.category.type,
  movements_category_id: row.category.id,
  mainVehicleId: `${row.car.brand} ${row.car.model}`,
  amount: row.movement.amount,
  isShared: isSharedMovement(row.movement.description),
  involvedVehicles: isSharedMovement(row.movement.description)
    ? [`${row.car.brand} ${row.car.model}`]
    : [],
  description: row.movement.description.replace(/^\[Compartido\]\s*/, ""),
  closing_date: formatDateForInput(row.movement.closing_date),
});

const buildInitialStateFromShared = (row: SharedExpenseRow): VehicleExpense => ({
  type: "Gasto",
  subType: row.category.type,
  movements_category_id: row.category.id,
  mainVehicleId: "",
  amount: row.total,
  isShared: true,
  involvedVehicles: row.cars.map((car) => `${car.brand} ${car.model}`),
  description: "",
  closing_date: "",
});

const EMPTY_STATE: VehicleExpense = {
  type: "Gasto",
  subType: "Pasivo",
  movements_category_id: "",
  mainVehicleId: "",
  amount: 0,
  isShared: false,
  involvedVehicles: [],
  description: "",
  closing_date: "",
};

export const ExpenseEditPage = () => {
  const { movementId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const row = location.state?.row as IndividualExpenseRow | undefined;
  const sharedRow = location.state?.sharedRow as SharedExpenseRow | undefined;

  const pageSubtitle = sharedRow
    ? sharedRow.category.name
    : row
      ? `${row.car.brand} ${row.car.model}`
      : "Movimiento";

  const [expenseData, setExpenseData] = useState<VehicleExpense>(() => {
    if (row) return buildInitialState(row);
    if (sharedRow) return buildInitialStateFromShared(sharedRow);
    return EMPTY_STATE;
  });

  const { mutate, isPending } = useUpdateExpense(() => navigate("/expenses/list"));
  const { data: categoriesData, isLoading: isLoadingCats } = useCategories();
  const { data: modelsData, isLoading: isLoadingModels } = useCarModels(true);

  const categoriesArray = useMemo<Category[]>(() => categoriesData?.data ?? [], [categoriesData]);
  const modelsArray = useMemo<CarModel[]>(() => modelsData?.data ?? [], [modelsData]);

  const categoryTypes = useMemo(
    () => Array.from(new Set(categoriesArray.map((cat) => cat.type))),
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setExpenseData((prev) => {
      const updated = {
        ...prev,
        [name]: name === "amount" ? parseFloat(value) || 0 : value,
      };
      if (name === "subType") updated.movements_category_id = "";
      return updated;
    });
  };

  const toggleShared = () =>
    setExpenseData((prev) => ({
      ...prev,
      isShared: !prev.isShared,
      involvedVehicles: !prev.isShared ? [] : prev.involvedVehicles,
    }));

  const removeVehicleTag = (tag: string) =>
    setExpenseData((prev) => ({
      ...prev,
      involvedVehicles: prev.involvedVehicles.filter((t) => t !== tag),
    }));

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
      movementId,
      payload: {
        type: expenseData.type,
        movements_category_id: expenseData.movements_category_id,
        amount: expenseData.amount,
        isShared: expenseData.isShared,
        description: expenseData.description,
        closing_date: expenseData.closing_date,
        car_id: GenerateArray(expenseData, modelsArray),
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <BackBar
          title="Editar movimiento"
          subtitle={pageSubtitle}
          to="/expenses/list"
        />
        <Button onClick={handleSave} disabled={isPending} size="lg">
          {isPending ? <Loader2 className="animate-spin" /> : <Save />}
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Tipo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tipo de movimiento</CardTitle>
              <CardDescription>Origen de la operación</CardDescription>
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
              {isLoadingCats ? (
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
                        placeholder="Buscar..."
                        className="rounded-none border-0 pl-9 focus-visible:ring-0"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredModels.length === 0 ? (
                        <p className="p-4 text-center text-xs text-muted-foreground">
                          Sin resultados
                        </p>
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
                                "flex w-full items-center justify-between px-3 py-2.5 text-sm hover:bg-accent",
                                selected && "bg-accent",
                              )}
                            >
                              <span className="flex items-center gap-2">
                                <span className="font-medium">{m.full_name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {m.year_of_car}
                                </span>
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
                    "absolute left-3 top-1/2 size-5 -translate-y-1/2",
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
        </div>
      </div>
    </div>
  );
};
