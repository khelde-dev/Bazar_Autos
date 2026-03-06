import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import type { VehicleExpense } from '../Types/ExpenseVehicle.types';

const registerExpenseApi = async (payload: VehicleExpense) => {
  const { data } = await axios.post('/movements/register', payload);
  return data;
};

export const useRegisterExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerExpenseApi,
    onSuccess: () => {
      toast.success('Movimiento registrado', {
        description: 'La base de datos se ha actualizado correctamente.'
      });
      queryClient.invalidateQueries({ queryKey: ['vehicle-stats'] });
    },
    onError: (error: any) => {
      toast.error('Error al registrar', {
        description: error.response?.data?.message || 'Hubo un fallo en la conexión.'
      });
    }
  });
};