import React, { useState, createContext, useContext, useEffect } from 'react';
import { authService } from '../services/serviceInstances';
import { LoginDto } from '@dtos/login.dto';

interface AuthContextType {
  user: any;
  autenticar: (dto: LoginDto) => Promise<void>;
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
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token); // Guardar el token
  };

  const autenticar = async (dto: LoginDto) => {
    try {
      const data = await authService.validarCredenciales(dto);
      crearSesion(data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Eliminar el token
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
