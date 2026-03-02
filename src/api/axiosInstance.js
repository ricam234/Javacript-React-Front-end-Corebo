// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/public/',  // ← cambia por tu URL de Symfony (o usa .env)
  // Ej: baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 15000000,                    // 15 segundos máximo
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor de REQUEST → agregar token automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // o de tu auth context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de RESPONSE → manejar errores globales (401, 500, etc.)
axiosInstance.interceptors.response.use(
  (response) => response,  // éxito → pasa directo
  (error) => {
    // Ejemplo: si es 401 → logout o redirigir
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Opcional: redirigir a login
      window.location.href = '/login';
      // O usa navigate si estás en un componente con useNavigate
    }

    // Puedes mostrar toast o alert global aquí si usas Ant Design notification
    // notification.error({ message: 'Error en la API', description: error.message });

    return Promise.reject(error); // propaga el error al .catch
  }
);

export default axiosInstance;