import type { VehicleExpense } from "../Types/ExpenseVehicle.types";

interface ModelItem {
  id: string;
  name: string;
}

export const GenerateArray = (expenseData: VehicleExpense, modelsData: ModelItem[]) => {
  if (expenseData.isShared) {
    return modelsData
      .filter((model) => expenseData.involvedVehicles.includes(model.name))
      .map((model) => model.id);
  }
  return modelsData
    .filter((model) => expenseData.mainVehicleId === model.name)
    .map((model) => model.id);
};
