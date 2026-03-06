export type MainType = 'COMPRA' | 'VENTA' | 'GASTO';
export type SubType = 'Activo' | 'Pasivo';

export interface VehicleExpense {
  mainType: MainType;
  subType: SubType;
  categoryId: string;
  mainVehicleId: string;
  amount: number;
  isShared: boolean;
  involvedVehicles: string[];
  description: string;
}

export const CATEGORY_MAP: Record<SubType, { id: string; name: string }[]> = {
  Activo: [
    { id: 'CG-001', name: 'Tenencia' },
    { id: 'CG-002', name: 'Verificación' },
    { id: 'CG-003', name: 'Pago de Piso' },
    { id: 'CG-004', name: 'Seguro del Auto' },
    { id: 'CG-005', name: 'Refacciones' },
  ],
  Pasivo: [
    { id: 'CG-006', name: 'Gasolina' },
    { id: 'CG-007', name: 'Lavado' },
    { id: 'CG-008', name: 'Comida' },
    { id: 'CG-009', name: 'Gastos Personales' },
    { id: 'CG-010', name: 'Traslados' },
    { id: 'CG-011', name: 'Cajón' },
    { id: 'CG-012', name: 'Mantenimiento Menor' },
  ]
};