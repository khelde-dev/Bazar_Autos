import type { CarModel } from "../../Shopping/Types/ShooppVehicle.types";
import type { VehicleExpense } from "../Types/ExpenseVehicle.types";

export const GenerateArray = (expenseData: VehicleExpense, modelsData: CarModel[]) => {
  if (expenseData.isShared) {
    return modelsData
      .filter((model) => expenseData.involvedVehicles.includes(model.full_name))
      .map((model) => model.id);
  }
  return modelsData
    .filter((model) => expenseData.mainVehicleId === model.full_name)
    .map((model) => model.id);
};
