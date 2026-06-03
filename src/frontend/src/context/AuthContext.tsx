import React, { useState, createContext, useContext, useEffect } from 'react';
import { authService } from '../services/api';

interface AuthContextType {
  user: any;
  autenticar: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const crearSesion = (data: any) => {
    // Ya no guardamos el token manualmente, la cookie HttpOnly se maneja por el navegador
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user)); // Mantenemos usuario si es necesario para UI, pero no el token
  };

  const autenticar = async (email: string, pass: string) => {
    try {
      const data = await authService.validarCredenciales(email, pass);
      crearSesion(data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // La sesión se destruirá cuando el backend elimine la cookie
  };

  return (
    <AuthContext.Provider value={{ user, autenticar, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
