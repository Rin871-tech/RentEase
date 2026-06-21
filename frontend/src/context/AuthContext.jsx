import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('adminToken', adminToken);
    } else {
      localStorage.removeItem('adminToken');
    }
  }, [adminToken]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const loginAdmin = (adminData, adminAuthToken) => {
    setAdminUser(adminData);
    setAdminToken(adminAuthToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setAdminToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, adminUser, adminToken, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
