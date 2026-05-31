import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <h2>Panel Principal</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Proyectos Activos</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Entregables Pendientes</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Próximos Hitos</h3>
          <p className="stat-value">Ninguno</p>
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .stat-value {
          font-size: 2.5rem;
          font-weight: bold;
          color: #0a3b64;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
