import React from 'react';
import { 
  Save, 
} from 'lucide-react';
import { Investor } from './Components/Investor';
import { BoxMoney } from '../../Utils/Screen/Boxes/BoxMoney';
import { RegistrationDate } from './Components/RegistrationDate';
import { Notes } from './Components/Notes';

export const SaleVehicle: React.FC = () => {

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      <main className="max-w-md mx-auto p-4 space-y-5">
        <Investor/>
        <BoxMoney/>
        <RegistrationDate/>
        <Notes/>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-[0.98] mt-4">
          <Save size={22} />
          Registrar Inversión
        </button>

      </main>
    </div>
  );
};