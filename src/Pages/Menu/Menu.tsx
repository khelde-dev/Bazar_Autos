import type React from "react";
import { useEffect, useState } from "react";
import ShoppVehicle from "../Shopping/ShoppVehicle";
import { SaleVehicle } from "../Sale/SaleVehicle";
import { ExpenseVehicle } from "../Expense/ExpenseVehicle";
import { Header } from "../../Utils/Screen/Header/Header";


type TabType = 'Compra' | 'Venta' | 'Gasto';
export const Menu:React.FC=()=>{
  const [activeTab, setActiveTab] = useState<TabType>('Compra');
  const [headerTitle,setHeaderTitle]=useState("Agregar Vehículo");

const renderContent = () => {
  switch (activeTab) {
    case 'Compra':
      return <ShoppVehicle />;
    case 'Venta':
      return <SaleVehicle />;
    case 'Gasto':
      return <ExpenseVehicle />;
    default:
      return <ShoppVehicle />;
  }
};

useEffect(() => {
  switch (activeTab) {
    case 'Compra':
      setHeaderTitle("Agregar Vehículo");
      break;
    case 'Venta':
      setHeaderTitle("Registro de Inversión de Capital");
      break;
    case 'Gasto':
      setHeaderTitle("Detalles del Gasto");
      break;
    default:
      setHeaderTitle("Agregar Vehículo");
  }
}, [activeTab]);
    return(
           <>
              <main className="w-full max-w-md mt-10 space-y-6">
                <Header Title={headerTitle}/>
                <section>
                  <div className="bg-gray-200/50 p-1.5 rounded-2xl flex gap-1">
                    {(['Compra', 'Venta', 'Gasto'] as TabType[]).map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)} // Cambia el estado al hacer click
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                          activeTab === tab 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </section>
                <div className="w-full">
                  {renderContent()}
                </div>
              </main>
            </>
    );
};