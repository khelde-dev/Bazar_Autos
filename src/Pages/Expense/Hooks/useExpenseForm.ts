import { useState } from "react";
import { INITIAL_EXPENSE, type VehicleExpense } from "../Types/ExpenseVehicle.types";

export const useExpenseForm = () => {
  const [expenseData, setExpenseData] = useState<VehicleExpense>(INITIAL_EXPENSE);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  const removeVehicleTag = (tag: string) => {
    setExpenseData((prev) => ({
      ...prev,
      involvedVehicles: prev.involvedVehicles.filter((t) => t !== tag),
    }));
  };

  const addVehicleTag = (tag: string) => {
    setExpenseData((prev) => {
      if (prev.involvedVehicles.includes(tag)) return prev;

      return {
        ...prev,
        involvedVehicles: [...prev.involvedVehicles, tag],
      };
    });
  };

  const resetForm = () => setExpenseData(INITIAL_EXPENSE);

  return {
    expenseData,
    setExpenseData,
    handleChange,
    toggleShared,
    removeVehicleTag,
    addVehicleTag,
    resetForm,
  };
};
