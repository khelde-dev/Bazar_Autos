import type { VehicleExpense } from "../Types/ExpenseVehicle.types";

export const GenerateArray = (expenseData: VehicleExpense, modelsData: any) => {
  if (expenseData.isShared) {
    return modelsData
      .filter((model: any) => expenseData.involvedVehicles.includes(model.name))
      .map((model: any) => model.id);
  } else {
    return modelsData
      .filter((model: any) => expenseData.mainVehicleId === model.name)
      .map((model: any) => model.id);
  }
};
