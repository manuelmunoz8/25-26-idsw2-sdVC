import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeliverablesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="deliverables-page">
      <div className="page-header">
        <h2>Entregables del Proyecto</h2>
        <div className="header-actions">
          <button className="btn-outline" onClick={() => navigate(`/projects/${id}`)}>Volver al Proyecto</button>
          <button className="btn-primary">Nuevo Entregable</button>
        </div>
      </div>

      <div className="deliverables-list">
        {/* Placeholder for list of deliverables */}
        <div className="deliverable-card card">
          <div className="del-info">
            <h3>Informe del Primer Trimestre</h3>
            <p><strong>Fecha límite:</strong> 2026-09-30</p>
            <p><strong>Estado:</strong> Pendiente</p>
          </div>
          <div className="del-actions">
            <button className="btn-small">Editar</button>
            <button className="btn-small btn-danger">Eliminar</button>
          </div>
        </div>
      </div>

      <style>{`
        .deliverable-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .del-actions {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default DeliverablesPage;
