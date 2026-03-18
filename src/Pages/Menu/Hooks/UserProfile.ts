import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../Services/auth.service'; 

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 60,
  });
};