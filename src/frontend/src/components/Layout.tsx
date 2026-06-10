import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>GIPF</h2>
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/projects">Proyectos</Link></li>
          <li><Link to="/investigators">Investigadores</Link></li>
          {user?.role === 'coordinador' && (
            <>
              <li><Link to="/grants">Buscar Convocatorias</Link></li>
              <li><Link to="/rewards">Recompensas</Link></li>
              <li><Link to="/workload">Carga de Trabajo</Link></li>
            </>
          )}
          <li><Link to="/publications">Publicaciones</Link></li>
          <li><Link to="/my-publications">Mis Publicaciones</Link></li>
          <li><Link to="/profile">Mi Perfil</Link></li>
          <li className="logout-item">
            <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
      <main className="content">
        <header className="top-bar">
          <h1>Plataforma de Investigación</h1>
        </header>
        <section className="main-section">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
