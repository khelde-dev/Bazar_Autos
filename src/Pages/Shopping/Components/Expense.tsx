import type React from "react";
import { SectionTitle } from "../../../Utils/Screen/Text/SectionTitle";
import { FileText } from "lucide-react";
import { MoneyInput } from "../../../Utils/Screen/Inputs/MoneyInput";
import { Card } from "../../../Utils/Screen/Boxes/Card";
import { EXPENSE_ITEMS, type VehicleExpenses } from "../Types/ShooppVehicle.types";

interface ExpenseProps {
  expenses: VehicleExpenses;
  onExpenseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Expense: React.FC<ExpenseProps> = ({ expenses, onExpenseChange }) => {
  //const totalInvestment = Object.values(expenses).reduce((acc, curr) => acc + (Number(curr) || 0), 0);

  return (
    <Card>
      <SectionTitle
        icon={FileText}
        title="Gastos e Inversión"
      />
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
    </Card>
  );
};