import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLogin } from '../api/apiService';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [BASE_URL, setBASE_URL] = useState('');

  const IP = import.meta.env.VITE_IP;
  const PORT = import.meta.env.VITE_API_PORT;
  const METHOD= import.meta.env.VITE_H_METHOD;


useEffect(() => {
  console.log(IP, PORT, METHOD);
  setBASE_URL(`${METHOD}://${IP}:${PORT}/api`);
}, [IP, PORT, METHOD]);



  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const userData = localStorage.getItem('user');
      
      setIsAuthenticated(authStatus);
      setUser(userData ? JSON.parse(userData) : null);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetchLogin({ username, password });
      console.log('Login response:', response);
      
      if (response.response === true) {
        const userData = { 
          username: response.data?.username || username, 
          password: password, // Store the password
          role: response.data?.role || 'admin',
          id: response.data?.id,
          ...response.data 
        };
        
        // Update state
        setIsAuthenticated(true);
        setUser(userData);
        
        // Save to localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Save authentication token if provided by the API
        if (response.data?.token) {
          localStorage.setItem('authToken', response.data.token);
        }
        
        return userData;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Invalid credentials');
    }
  };

  // Logout function
  const logout = () => {
    // Update state
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  // Update user function
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser,
    BASE_URL,
    setBASE_URL,
    IP,
    PORT,
    METHOD,
    
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 