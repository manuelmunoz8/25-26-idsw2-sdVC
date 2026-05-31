import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>GIPF</h2>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/projects">Proyectos</Link></li>
          <li><Link to="/publications">Publicaciones</Link></li>
          <li><Link to="/profile">Mi Perfil</Link></li>
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
