import type React from "react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
import { FileText } from "lucide-react";
import { MoneyInput } from "../../../Utils/Screen/Inputs/MoneyInput";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import {
  EXPENSE_ITEMS,
  type VehicleExpenses,
} from "../Types/ShooppVehicle.types";

interface ExpenseProps {
  expenses: VehicleExpenses;
  onExpenseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalInvestment:string
}

export const Expense: React.FC<ExpenseProps> = ({
  expenses,
  onExpenseChange,
  totalInvestment
}) => {
  return (
    <Card>
      <SectionTitle icon={FileText} title="Gastos e Inversión" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 mt-2">
        {EXPENSE_ITEMS.map((item) => (
          <MoneyInput
            key={item.key}
            label={item.label}
            name={item.key}
            value={expenses[item.key]}
            onChange={onExpenseChange}
            placeholder="0.00"
          />
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="bg-blue-50/50 rounded-2xl p-4 flex items-center justify-between border border-blue-100/50">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.1em]">
              Inversión Total
            </span>
            <span className="text-xs text-blue-400/80 font-medium">
              Suma de todos los conceptos
            </span>
          </div>

          <div className="text-right">
            <span className="text-xl font-black text-slate-900">
              ${totalInvestment}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
