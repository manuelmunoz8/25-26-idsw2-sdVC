import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

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
