import axios from "axios";

const IP = import.meta.env.VITE_IP;
const PORT = import.meta.env.VITE_API_PORT;
const METHOD= import.meta.env.VITE_H_METHOD;
// const BASE_URL= `${IP}:${PORT}/api`;t
const BASE_URL="http://192.168.1.131:5000/api";

console.log(BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include authentication token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get fresh token from localStorage on each request
    const token = localStorage.getItem('authToken');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    // If user is authenticated and we have a token, add it to headers
    if (isAuthenticated && token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Adding token to request:', config.url);
      console.log('Token:', token.substring(0, 20) + '...');
    } else {
      console.log('⚠️ No token found for request:', config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401/403 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log('🚫 Authentication error:', error.response.status, error.response.data);
      // Clear authentication data and redirect to login
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
