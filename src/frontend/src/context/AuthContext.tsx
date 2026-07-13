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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const userData = await authService.validarSesion();
        setUser(userData);
      } catch (error) {
        console.log('No hay sesión activa');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    validateSession();
  }, []);

  const crearSesion = (data: any) => {
    setUser(data.user);
    // Ya no guardamos el token en localStorage
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

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  if (loading) return <div>Cargando...</div>;

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
