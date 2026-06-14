import React from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';

interface Publication {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
}

const PublicationsPage: React.FC = () => {
  const { data: publications, loading, error } = useCrud<Publication>(publicationsService as any);
  const navigate = useNavigate();

  return (
    <div className="publications-page">
      <div className="page-header">
        <h2>Publicaciones de la Comunidad</h2>
      </div>

      {loading ? (
        <p>Cargando publicaciones...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="publications-list">
          {publications.length === 0 ? (
            <p>No hay publicaciones disponibles.</p>
          ) : (
            publications.map(pub => (
              <div key={pub.id} className="publication-card">
                <h3>{pub.title}</h3>
                <p className="pub-meta">Por {pub.author} en {pub.date}</p>
                <p>{pub.summary}</p>
                <div className="pub-actions">
                  <button className="btn-small" onClick={() => navigate(`/publications/${pub.id}`)}>Leer más</button>
                  <button className="btn-small">Responder</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .publication-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .pub-meta {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .pub-actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default PublicationsPage;
