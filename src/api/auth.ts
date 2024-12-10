import axios from './axios';
import { LoginCredentials, User } from '../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    try {
      const { data } = await axios.post('/auth/login', credentials);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data.user as User;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Login failed');
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};