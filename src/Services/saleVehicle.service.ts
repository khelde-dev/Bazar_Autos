import type { SaleInvestment } from '../Pages/Sale/Types/SaleVehicle.types';
import { api } from './axiosConfig';

export const registerInvestment = async (payload: SaleInvestment) => {
  const { data } = await api.post('/investors', payload);
  return data;
};