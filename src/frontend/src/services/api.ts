import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Interceptor de petición para añadir el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuesta para manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Emitir evento personalizado para manejo en componente React
          window.dispatchEvent(new CustomEvent('auth:unauthorized'));
          break;
        case 403:
          console.error('Acceso prohibido');
          break;
        case 500:
          console.error('Error interno del servidor');
          alert('Ha ocurrido un error en el servidor, intente más tarde.');
          break;
        default:
          console.error('Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
