import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const user = {
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateCards: async (selectedCards: string[]) => {
    const response = await api.put('/user/cards', { selectedCards });
    return response.data;
  },

  updateSpending: async (spendingAnalysis: any) => {
    const response = await api.put('/user/spending', { spendingAnalysis });
    return response.data;
  },
};

export default api; 