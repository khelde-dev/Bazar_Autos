import { useState } from "react";
import { INITIAL_INVESTMENT_STATE, type InvestmentFormState } from "../Types/Investments.types";

export const useInvestmentForm = () => {
  const [saleData, setSaleData] = useState<InvestmentFormState>(INITIAL_INVESTMENT_STATE);

  const handleSaleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSaleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => setSaleData(INITIAL_INVESTMENT_STATE);

  return { saleData, handleSaleChange, setSaleData, resetForm };
};
