import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sanitizeInput } from '../utils/security';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: boolean; password?: boolean }>({});
  
  const { autenticar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Validar campos vacíos
    const errors: { email?: boolean; password?: boolean } = {};
    if (!email.trim()) errors.email = true;
    if (!password.trim()) errors.password = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Sanitización de entradas
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    try {
      await autenticar(sanitizedEmail, sanitizedPassword);
      navigate('/');
    } catch (err) {
      // Mensaje genérico para evitar enumeración de cuentas
      setError('Correo o contraseña no son correctas');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={fieldErrors.email ? 'input-error' : ''}
              placeholder="admin@funiber.org"
            />
            {fieldErrors.email && <span className="field-msg">El correo es obligatorio</span>}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={fieldErrors.password ? 'input-error' : ''}
            />
            {fieldErrors.password && <span className="field-msg">La contraseña es obligatoria</span>}
          </div>
          <button type="submit" className="btn-login">Entrar</button>
        </form>
      </div>
      <style>{`
        .login-page {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f4f7f9;
        }
        .login-card {
          background: white;
          padding: 2.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        .error-banner {
          background-color: #ffebee;
          color: #c62828;
          padding: 0.8rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          border: 1px solid #ef9a9a;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #555;
        }
        .form-group input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .form-group input.input-error {
          border-color: #c62828;
          background-color: #fff8f8;
        }
        .field-msg {
          color: #c62828;
          font-size: 0.8rem;
          margin-top: 0.3rem;
          display: block;
        }
        .btn-login {
          width: 100%;
          padding: 1rem;
          background-color: #0a3b64;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .btn-login:hover {
          background-color: #0d4a7d;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
