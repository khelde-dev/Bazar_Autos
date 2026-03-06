import { useState } from "react";
import { type VehicleExpense , VEHICLE_BRANDS} from "../Types/ExpenseVehicle.types";


export const useExpenseForm = () => {
  const [expenseData, setExpenseData] = useState<VehicleExpense>({
    mainType: 'GASTO',
    subType: 'Pasivo',
    categoryId: '',
    mainVehicleId: '',
    amount: 0,
    isShared: false,
    involvedVehicles: [],
    description: ''
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = VEHICLE_BRANDS.filter(brand =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExpenseData(prev => {
      const updated = { 
        ...prev, 
        [name]: name === 'amount' ? parseFloat(value) || 0 : value 
      };
      if (name === 'subType') updated.categoryId = "";
      return updated;
    });
  };

  const toggleShared = () => setExpenseData(prev => ({ 
    ...prev, 
    isShared: !prev.isShared,
    involvedVehicles: !prev.isShared ? [] : prev.involvedVehicles 
  }));

  const removeVehicleTag = (tag: string) => {
    setExpenseData(prev => ({
      ...prev,
      involvedVehicles: prev.involvedVehicles.filter(t => t !== tag)
    }));
  };

  const addVehicleTag = (tag: string) => {
    setExpenseData(prev => {
      if (prev.involvedVehicles.includes(tag)) return prev;
      
      return {
        ...prev,
        involvedVehicles: [...prev.involvedVehicles, tag]
      };
    });
  };

  return { 
    expenseData, 
    setExpenseData, 
    handleChange, 
    toggleShared, 
    removeVehicleTag,
    searchTerm,
    setSearchTerm,
    filteredBrands,
    addVehicleTag
  };
};