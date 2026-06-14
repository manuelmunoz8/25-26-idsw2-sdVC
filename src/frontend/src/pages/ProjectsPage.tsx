import React from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';
import { useAuth } from '../context/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
}

const ProjectsPage: React.FC = () => {
  const { data: projects, loading, error } = useCrud<Project>(projectsService as any);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="projects-page">
      <div className="page-header">
        <h2>Gestión de Proyectos</h2>
        {user?.role === 'coordinador' && (
          <button className="btn-primary" onClick={() => alert('Funcionalidad en desarrollo')}>Nuevo Proyecto</button>
        )}
      </div>

      {loading ? (
        <p>Cargando proyectos...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="projects-grid">
          {projects.length === 0 ? (
            <p>No hay proyectos registrados.</p>
          ) : (
            projects.map(project => (
              <div key={project.id} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-footer">
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                  <button 
                    className="btn-small" 
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .error-message { color: #dc3545; }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .btn-primary {
          background-color: #0a3b64;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .project-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .project-footer {
          margin-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .status-badge {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          text-transform: uppercase;
        }
        .status-badge.draft { background: #e0e0e0; }
        .status-badge.active { background: #d4edda; color: #155724; }
        .status-badge.completed { background: #cce5ff; color: #004085; }
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

export default ProjectsPage;
