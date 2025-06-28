import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage or null
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('flourshop-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('flourshop-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('flourshop-user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (userData) => {
    setUser(userData);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 