import React from 'react';
import { investigatorsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';

interface Investigator {
  id: string;
  name: string;
  email: string;
  department: string;
}

const InvestigatorsPage: React.FC = () => {
  const { data: investigators, loading, error } = useCrud<Investigator>(investigatorsService as any);

  return (
    <div className="investigators-page">
      <div className="page-header">
        <h2>Investigadores</h2>
        <button className="btn-primary">Añadir Investigador</button>
      </div>

      {loading ? (
        <p>Cargando investigadores...</p>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">Error al cargar investigadores: {error}</p>
        </div>
      ) : (
        <div className="investigators-grid">
          {investigators.length === 0 ? (
            <p>No hay investigadores registrados actualmente.</p>
          ) : (
            investigators.map(inv => (
              <div key={inv.id} className="inv-card">
                <h3>{inv.name}</h3>
                <p><strong>Email:</strong> {inv.email}</p>
                <p><strong>Departamento:</strong> {inv.department}</p>
                <div className="inv-actions">
                  <button className="btn-small">Ver Perfil</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .error-container {
          padding: 1rem;
          background: #ffebee;
          color: #c62828;
          border: 1px solid #ef9a9a;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        .investigators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .inv-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .inv-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        .btn-small {
          background: #eee;
          border: 1px solid #ccc;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default InvestigatorsPage;
