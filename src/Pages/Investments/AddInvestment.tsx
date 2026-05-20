import { Calendar, DollarSign, History, Loader2, Save, User } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserList } from "@/hooks/use-user-profile";
import { validateInvestment } from "./Functions/Validation";
import { useInvestmentForm } from "./Hooks/useInvestmentForm";
import { useRegisterInvestment } from "./Hooks/useRegisterInvestment";

interface UserItem {
  id: string;
  name: string;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const AddInvestment: React.FC = () => {
  const { saleData, handleSaleChange, setSaleData, resetForm } = useInvestmentForm();
  const { mutate, isPending } = useRegisterInvestment(resetForm);
  const { data: listUsers, isLoading } = useUserList();

  const users: UserItem[] = (listUsers?.data ?? []) as UserItem[];
  const selectedUser = users.find((u) => u.id === saleData.user_id);

  const handleSaveInvestment = () => {
    if (!validateInvestment(saleData)) return;
    mutate({
      user_id: saleData.user_id,
      investment_amount: Number(saleData.investment_amount),
    });
  };

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Registrar inversión</h1>
          <p className="text-sm text-muted-foreground">
            Asocia un monto inicial a un inversionista.
          </p>
        </div>
        {selectedUser && (
          <Button asChild variant="outline">
            <Link to={`/investments/${selectedUser.id}`}>
              <History />
              Ver historial
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Investor card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="size-4 text-blue-600" />
              <CardTitle className="text-base">Inversionista</CardTitle>
            </div>
            <CardDescription>Selecciona el titular</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="size-5 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid gap-1.5">
                  <Label htmlFor="user_id">Cuenta</Label>
                  <Select
                    value={saleData.user_id}
                    onValueChange={(v) =>
                      setSaleData((prev) => ({ ...prev, user_id: v }))
                    }
                  >
                    <SelectTrigger id="user_id">
                      <SelectValue placeholder="Seleccionar inversionista..." />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedUser && (
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 font-semibold text-white">
                        {getInitials(selectedUser.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{selectedUser.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ID #{selectedUser.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Investment details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="size-4 text-blue-600" />
              <CardTitle className="text-base">Monto e información</CardTitle>
            </div>
            <CardDescription>Detalles de la inversión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="investment_amount">Monto de inversión (MXN)</Label>
              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-emerald-500" />
                <Input
                  id="investment_amount"
                  name="investment_amount"
                  type="number"
                  inputMode="decimal"
                  value={saleData.investment_amount || ""}
                  onChange={handleSaleChange}
                  placeholder="0.00"
                  className="h-14 pl-10 text-2xl font-bold"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="registrationDate">Fecha de registro</Label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="registrationDate"
                  type="date"
                  readOnly
                  value={today}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground">Asignada automáticamente</p>
            </div>

            <Button onClick={handleSaveInvestment} disabled={isPending} size="lg" className="w-full">
              {isPending ? <Loader2 className="animate-spin" /> : <Save />}
              {isPending ? "Procesando..." : "Registrar inversión"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
