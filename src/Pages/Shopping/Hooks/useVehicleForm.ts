import { useState } from "react";
import { INITIAL_VEHICLE_DETAILS, type VehicleDetails } from "../Types/ShooppVehicle.types";

export const useVehicleForm = () => {
  const [vehicleData, setVehicleData] = useState<VehicleDetails>(INITIAL_VEHICLE_DETAILS);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    setVehicleData((prev) => ({
      ...prev,
      [name]: type === "number" || name === "carYear" ? Number(value) : value,
    }));

  };

  const resetForm = () => setVehicleData(INITIAL_VEHICLE_DETAILS);

  return {
    vehicleData,
    handleInputChange,
    setVehicleData,
    resetForm
  };
};