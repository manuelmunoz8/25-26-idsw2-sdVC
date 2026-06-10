import React from 'react';
import { publicationsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';

interface Publication {
  id: string;
  title: string;
  date: string;
  status: string;
}

const MyPublicationsPage: React.FC = () => {
  const { data: publications, loading, error } = useCrud<Publication>(publicationsService.getMy as any);

  return (
    <div className="my-publications-page">
      <div className="page-header">
        <h2>Mis Publicaciones</h2>
        <button className="btn-primary">Nueva Publicación</button>
      </div>

      {loading ? (
        <p>Cargando mis publicaciones...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="publications-list">
          {publications.length === 0 ? (
            <p>Aún no has creado ninguna publicación.</p>
          ) : (
            publications.map(pub => (
              <div key={pub.id} className="publication-card">
                <div className="pub-content">
                  <h3>{pub.title}</h3>
                  <p className="pub-meta">Creada el {pub.date}</p>
                </div>
                <div className="pub-actions">
                  <button className="btn-small">Editar</button>
                  <button className="btn-small btn-danger">Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .publication-card {
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-danger {
          color: #dc3545;
          border-color: #dc3545;
        }
        .pub-actions {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default MyPublicationsPage;
