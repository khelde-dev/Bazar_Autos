import React from 'react';
import { 
  ChevronDown, Car, DollarSign, 
  Users, Plus, X, ReceiptText 
} from 'lucide-react';
import { Card } from '../../Utils/Screen/Boxes/Card';
import { Label } from '../../Utils/Screen/Text/Label';
import { useExpenseForm } from './Hooks/useExpenseForm';
import { CATEGORY_MAP, type MainType, type SubType } from './Types/ExpenseVehicle.types';

export const ExpenseVehicle: React.FC = () => {
  const { 
    expenseData, 
    setExpenseData,
    handleChange, 
    toggleShared, 
    removeVehicleTag 
  } = useExpenseForm();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      <main className="max-w-md mx-auto p-4 space-y-6">
        
        <Card>
          <div className="space-y-2">
            <Label>Tipo de Movimiento</Label>
            <div className="flex gap-2">
              {(['COMPRA', 'VENTA', 'GASTO'] as MainType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setExpenseData(prev => ({ ...prev, mainType: t }))}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all border ${
                    expenseData.mainType === t 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                      : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Subtipo</Label>
              <div className="relative">
                <select 
                  name="subType"
                  value={expenseData.subType}
                  onChange={handleChange}
                  className="w-full bg-gray-50 p-4 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-blue-500/20 appearance-none"
                >
                  <option value="Activo">Activo (+)</option>
                  <option value="Pasivo">Pasivo (-)</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="animate-in fade-in duration-300">
              <Label>Categoría</Label>
              <div className="relative">
                <select 
                  name="categoryId"
                  value={expenseData.categoryId}
                  onChange={handleChange}
                  className="w-full bg-gray-50 p-4 rounded-2xl text-sm appearance-none outline-none border border-transparent focus:border-blue-500/20"
                >
                  <option value="">Seleccionar...</option>
                  {CATEGORY_MAP[expenseData.subType as SubType].map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Vehículo Principal</Label>
              <div className="relative">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  name="mainVehicleId"
                  type="text" 
                  placeholder="Buscar modelo..."
                  value={expenseData.mainVehicleId}
                  onChange={handleChange}
                  className="w-full bg-gray-50 pl-12 pr-10 py-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20"
                />
              </div>
            </div>

            <div>
              <Label>Monto (MXN)</Label>
              <div className="relative">
                <DollarSign className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold ${expenseData.subType === 'Activo' ? 'text-emerald-500' : 'text-blue-500'}`} size={22} />
                <input 
                  name="amount"
                  type="number" 
                  placeholder="0.00"
                  value={expenseData.amount || ""}
                  onChange={handleChange}
                  className="w-full bg-gray-50 pl-12 py-5 rounded-2xl text-xl font-bold text-gray-700 outline-none border border-transparent focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>
          <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${expenseData.isShared ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-transparent'}`}>
            <div className="flex items-center gap-3">
              <Users className={expenseData.isShared ? 'text-blue-600' : 'text-gray-400'} size={22} />
              <span className={`font-bold text-sm ${expenseData.isShared ? 'text-blue-900' : 'text-gray-500'}`}>¿Monto compartido?</span>
            </div>
            <button 
              onClick={toggleShared}
              className={`w-14 h-8 rounded-full transition-colors relative ${expenseData.isShared ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${expenseData.isShared ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {expenseData.isShared && (
            <div className="animate-in slide-in-from-top-2 duration-300 space-y-2">
              <Label>Otros carros involucrados</Label>
              <div className="bg-gray-50 p-3 rounded-2xl flex flex-wrap gap-2 items-center border border-gray-100/50">
                {expenseData.involvedVehicles.map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 bg-blue-600 text-white pl-3 pr-2 py-1.5 rounded-lg text-[10px] font-black uppercase">
                    {tag}
                    <button onClick={() => removeVehicleTag(tag)} className="hover:bg-blue-700 rounded-md p-0.5">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <button className="flex items-center gap-1 text-blue-600 text-xs font-bold px-2 py-1.5 hover:underline">
                  <Plus size={16} /> Agregar
                </button>
              </div>
            </div>
          )}

          <div>
            <Label>Descripción</Label>
            <textarea 
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              placeholder="Detalles adicionales..."
              rows={3}
              className="w-full bg-gray-50 p-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20 resize-none text-gray-700"
            />
          </div>
        </Card>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[20px] font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-[0.98]">
          <ReceiptText size={22} />
          Registrar Movimiento
        </button>

      </main>
    </div>
  );
};