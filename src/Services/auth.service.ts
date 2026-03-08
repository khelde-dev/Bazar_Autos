import axios from 'axios';
import type { LoginForm } from '../Pages/Login/types/Login.types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const loginUser = async (data: LoginForm) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const logOutUser = async () => {
  await api.post('/auth/logout');
};