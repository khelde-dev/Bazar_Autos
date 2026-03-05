import axios from 'axios';
import type { LoginForm } from '../Pages/Login/types/Login.types';

const api = axios.create({
  baseURL: 'https://api.com/api',
});

export const loginUser = async (data: LoginForm) => {
  const response = await api.post('/login', data);
  return response.data;
};