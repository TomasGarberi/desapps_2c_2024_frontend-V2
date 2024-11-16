import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, 
});

// Interceptor de solicitud
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Rutas que no requieren auth
      const noAuthRequired = ['/login', '/register', '/geo', '/auth'];

      // Verificar si la URL actual requiere el token de autorización
      if (!noAuthRequired.some((url) => config.url.includes(url))) {
        // Obtener el token de almacenamiento
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      console.log('Request:', config);
      return config;
    } catch (error) {
      console.error('Error obteniendo el token:', error);
      return config;
    }
  },
  (error) => {
    // Manejo de errores en la solicitud
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
apiClient.interceptors.response.use(
  (response) => {
    // Log de la respuesta
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // Manejo de errores en la respuesta
    console.error('Response Error:', error);
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar errores 401 (no autorizado)
    }
    return Promise.reject(error);
  }
);

export default apiClient;
