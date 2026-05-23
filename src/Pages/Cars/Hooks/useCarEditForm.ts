import type React from "react";
import { useState } from "react";
import type { VehicleDetails, VehicleExpenses } from "../../Shopping/Types/ShooppVehicle.types";
import { buildUpdatePayload, mapCarToDetails, mapCostsToExpenses } from "../Utils/carMappers";
import type { CarDetail } from "../Types/Cars.types";

export const useCarEditForm = (car: CarDetail) => {
  const [vehicleData, setVehicleData] = useState<VehicleDetails>(() => mapCarToDetails(car));
  const [expenses, setExpenses] = useState<VehicleExpenses>(() => mapCostsToExpenses(car.costs));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: name === "year_of_car" ? Number(value) : value,
    }));
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenses((prev) => ({
      ...prev,
      [name as keyof VehicleExpenses]: {
        ...prev[name as keyof VehicleExpenses],
        amount: value,
      },
    }));
  };

  const handleExpenseNoteChange = (name: keyof VehicleExpenses, note: string) => {
    setExpenses((prev) => ({ ...prev, [name]: { ...prev[name], note } }));
  };

  const buildPayload = () => buildUpdatePayload(vehicleData, expenses);

  return {
    vehicleData,
    setVehicleData,
    handleInputChange,
    expenses,
    handleExpenseChange,
    handleExpenseNoteChange,
    buildPayload,
  };
};
