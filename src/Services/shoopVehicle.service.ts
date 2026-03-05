import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.com/api',
});

export const createVehicle = async (payload: any) => {
  const { data } = await api.post('/vehicles', payload);
  return data;
};