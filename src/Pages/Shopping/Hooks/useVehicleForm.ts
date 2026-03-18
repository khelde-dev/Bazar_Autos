import { useState } from "react";
import { INITIAL_EXPENSES, INITIAL_VEHICLE_DETAILS, type VehicleDetails, type VehicleExpenses } from "../Types/ShooppVehicle.types";

export const useVehicleForm = () => {
  const [vehicleData, setVehicleData] = useState<VehicleDetails>(INITIAL_VEHICLE_DETAILS);
  const [expenses, setExpenses] = useState<VehicleExpenses>(INITIAL_EXPENSES);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    setVehicleData((prev) => ({
      ...prev,
      [name]: type === "number" || name === "carYear" ? Number(value) : value,
    }));

  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setExpenses(prev => ({
    ...prev,
    [name]: value
  }));
  };

  const resetForm = () =>{
    setVehicleData(INITIAL_VEHICLE_DETAILS);
    setExpenses(INITIAL_EXPENSES);
  } 

  return {
    vehicleData,
    handleInputChange,
    setVehicleData,
    resetForm,
    expenses,
    handleExpenseChange
  };
};