import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
