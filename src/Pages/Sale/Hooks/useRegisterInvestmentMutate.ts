import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { registerInvestment } from '../../../Services/saleVehicle.service';

export const useRegisterInvestment = (resetForm: () => void) => {
  return useMutation({
    mutationFn: registerInvestment,
    onSuccess: () => {
      toast.success('Inversión Registrada', {
        description: 'El capital se ha asignado correctamente al vehículo.'
      });
      resetForm();
    },
    onError: (error: any) => {
      toast.error('Error al registrar', {
        description: error.response?.data?.message || 'Hubo un problema con el servidor.'
      });
    }
  });
};