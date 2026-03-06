import { useState } from "react";
import { INITIAL_SALE_STATE, type SaleInvestment } from "../Types/SaleVehicle.types";

export const useSaleForm = () => {
  const [saleData, setSaleData] = useState<SaleInvestment>(INITIAL_SALE_STATE);


    const handleSaleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSaleData(prev => ({
        ...prev,
        [name]: value
    }));
    };

  return {
    saleData,
    handleSaleChange,
    setSaleData
  };
};