import React from 'react';
import { projectsService } from '../services/api';
import { useCrud } from '../hooks/useCrud';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
}

const ProjectsPage: React.FC = () => {
  const { data: projects, loading, error } = useCrud<Project>(projectsService as any);

  return (
    <div className="projects-page">
      <div className="page-header">
        <h2>Gestión de Proyectos</h2>
        <button className="btn-primary">Nuevo Proyecto</button>
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
                <span className={`status-badge ${project.status}`}>
                  {project.status}
                </span>
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
      `}</style>
    </div>
  );
};

export default ProjectsPage;
