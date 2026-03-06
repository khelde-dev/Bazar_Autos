import axios from 'axios';
import type { SaleInvestment } from '../Pages/Sale/Types/SaleVehicle.types';

const api = axios.create({
  baseURL: 'https://api.com/api',
});

export const registerInvestment = async (payload: SaleInvestment) => {
  const { data } = await api.post('/investments/register', payload);
  return data;
};