import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createVehicle, getCarModels } from '../../../Services/shoopVehicle.service';

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success('Vehículo guardado', {
        description: 'Se ha registrado exitosamente en el catálogo.'
      });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al conectar con el servidor';
      toast.error('No se pudo guardar', { description: message });
    }
  });
};

export const useCarModels = () => {
  return useQuery({
    queryKey: ['car-models'],
    queryFn: getCarModels,
    staleTime: 1000 * 60 * 10,
  });
};