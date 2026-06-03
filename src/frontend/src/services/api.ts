import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer \${token}`;
  }
  return config;
});

export const authService = {
  validarCredenciales: async (email: string, pass: string) => {
    // Esta ruta deberá ser implementada por el Backend
    const response = await api.post('/api/auth/login', { email, password: pass });
    return response.data;
  },
};

export const projectsService = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/projects', data);
    return response.data;
  },
};

export default api;
