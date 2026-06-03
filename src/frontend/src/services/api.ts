import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Habilita el envío/recepción de cookies automáticamente
});

export const authService = {
  validarCredenciales: async (email: string, pass: string) => {
    // El backend seteará la cookie HttpOnly en la respuesta
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
console.log('API URL:', process.env.REACT_APP_API_URL);

export default api;
