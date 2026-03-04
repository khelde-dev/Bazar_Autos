import React, { useState } from 'react';
import { 
  ChevronLeft, Car, DollarSign, 
  Users, Plus, X, ReceiptText 
} from 'lucide-react';
import { Card } from '../../Utils/Screen/Boxes/Card';
import { Label } from '../../Utils/Screen/Text/Label';

export const ExpenseVehicle: React.FC = () => {
  const [isShared, setIsShared] = useState(true);
  const [tags, setTags] = useState(['Civic 2023', 'Versa 2022']);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans">
      <main className="max-w-md mx-auto p-4 space-y-6">
        <Card>
          <div>
            <Label>Categoría</Label>
            <div className="relative">
              <select className="w-full bg-gray-50 border-none p-4 rounded-2xl text-gray-700 text-sm appearance-none outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>Seleccionar categoría</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronLeft size={18} className="rotate-270 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <Label>Tipo</Label>
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-transparent">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="text-sm font-medium text-gray-700">Pasivo</span>
            </div>
          </div>
          <div>
            <Label>Identificador del Carro</Label>
            <div className="relative">
              <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Buscar modelo de auto..."
                className="w-full bg-gray-50 pl-12 pr-10 py-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
              </div>
            </div>
          </div>
          <div>
            <Label>Monto (MXN)</Label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 font-bold" size={22} />
              <input 
                type="text" 
                defaultValue="0.00"
                className="w-full bg-gray-50 pl-12 py-5 rounded-2xl text-xl font-bold text-gray-700 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
            <div className="flex items-center gap-3">
              <Users className="text-blue-600" size={22} />
              <span className="font-bold text-gray-800 text-sm">¿Monto compartido?</span>
            </div>
            <button 
              onClick={() => setIsShared(!isShared)}
              className={`w-14 h-8 rounded-full transition-colors relative ${isShared ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${isShared ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          <div>
            <Label>Otros carros involucrados</Label>
            <div className="bg-gray-50 p-3 rounded-2xl flex flex-wrap gap-2 items-center border border-gray-100/50">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 bg-blue-600 text-white pl-3 pr-2 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:bg-blue-700 rounded-md p-0.5">
                    <X size={14} />
                  </button>
                </span>
              ))}
              <button className="flex items-center gap-1 text-blue-600 text-xs font-bold px-2 py-1.5 hover:underline">
                <Plus size={16} /> Agregar
              </button>
            </div>
          </div>
          <div>
            <Label>Descripción</Label>
            <textarea 
              placeholder="Detalles adicionales del movimiento..."
              rows={4}
              className="w-full bg-gray-50 p-4 rounded-2xl text-sm outline-none border border-transparent focus:border-blue-500/20 resize-none"
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