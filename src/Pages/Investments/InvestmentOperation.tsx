import { ArrowLeft, DollarSign, Loader2, Save, Wallet } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { validateTransaction } from "./Functions/Validation";
import { useRegisterTransaction } from "./Hooks/useRegisterTransaction";
import {
  INITIAL_TRANSACTION_STATE,
  TRANSACTION_TYPES,
  type TransactionFormState,
  type TransactionType,
} from "./Types/Investments.types";
import { formatMoney } from "./Utils/format";

const TYPE_STYLES: Record<TransactionType, string> = {
  Entrada: "border-emerald-600 bg-emerald-600 text-white",
  Salida: "border-rose-600 bg-rose-600 text-white",
};

export const InvestmentOperation = () => {
  const { userId = "", investmentId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const investmentAmount: string | undefined = location.state?.investmentAmount;
  const [form, setForm] = useState<TransactionFormState>(INITIAL_TRANSACTION_STATE);

  const { mutate, isPending } = useRegisterTransaction(() =>
    navigate(`/investments/${userId}`),
  );

  const handleTypeChange = (type: TransactionType) =>
    setForm((prev) => ({ ...prev, type }));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, amount: Number(e.target.value) }));

  const handleConceptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, concept: e.target.value }));

  const handleConfirm = () => {
    if (!validateTransaction(form)) return;
    mutate({
      investorId: investmentId,
      payload: {
        amount: Number(form.amount),
        type: form.type,
        concept: form.concept.trim(),
      },
    });
  };

  const accent = form.type === "Entrada" ? "text-emerald-600" : "text-rose-600";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/investments/${userId}`)}
            aria-label="Volver"
          >
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Nueva transacción</h1>
            <p className="text-sm text-muted-foreground">
              Registra entrada o salida de capital
            </p>
          </div>
        </div>
        <Button onClick={handleConfirm} disabled={isPending} size="lg">
          {isPending ? <Loader2 className="animate-spin" /> : <Save />}
          {isPending ? "Procesando..." : "Confirmar operación"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Tipo + Monto actual */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tipo de operación</CardTitle>
              <CardDescription>Indica si es ingreso o egreso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {TRANSACTION_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTypeChange(t)}
                    className={cn(
                      "rounded-lg border px-3 py-3 text-sm font-semibold transition-all",
                      form.type === t
                        ? TYPE_STYLES[t]
                        : "border-border bg-background text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {investmentAmount && (
            <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-card">
              <CardContent className="flex items-center justify-between gap-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                    <Wallet size={20} strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                      Monto actual
                    </p>
                    <p className="text-xs text-muted-foreground">Saldo de la inversión</p>
                  </div>
                </div>
                <span className="text-xl font-black tracking-tight text-blue-700 dark:text-blue-300">
                  {formatMoney(investmentAmount)}
                </span>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Monto + Concepto */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {form.type === "Entrada" ? "Monto a agregar" : "Monto a retirar"}
              </CardTitle>
              <CardDescription>Cantidad en MXN</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <DollarSign className={cn("absolute left-3 top-1/2 size-5 -translate-y-1/2", accent)} />
                <Input
                  name="amount"
                  type="number"
                  inputMode="decimal"
                  value={form.amount || ""}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="h-14 pl-10 text-2xl font-bold"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Concepto</CardTitle>
              <CardDescription>Motivo de la operación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1.5">
                <Label htmlFor="concept" className="sr-only">
                  Concepto
                </Label>
                <Textarea
                  id="concept"
                  name="concept"
                  value={form.concept}
                  onChange={handleConceptChange}
                  rows={4}
                  placeholder="Describe el motivo de la operación..."
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
