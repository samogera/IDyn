"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from './use-toast';

interface User {
  name: string;
  wallet: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking for a stored session
    try {
      const storedUser = sessionStorage.getItem('idyn-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from session storage", error);
        sessionStorage.removeItem('idyn-user');
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('idyn-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('idyn-user');
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
