import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsService } from '../services/serviceInstances';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const data = await projectsService.getOne(id);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p>Cargando detalles del proyecto...</p>;
  if (!project) return <p>Proyecto no encontrado.</p>;

  return (
    <div className="project-detail-page">
      <div className="page-header">
        <h2>{project.title}</h2>
        <div className="header-actions">
          <button className="btn-outline" onClick={() => navigate('/projects')}>Volver</button>
          <button className="btn-primary">Editar Proyecto</button>
        </div>
      </div>

      <div className="project-grid">
        <div className="project-info-card card">
          <h3>Información General</h3>
          <p><strong>Estado:</strong> {project.status}</p>
          <p><strong>Descripción:</strong> {project.description}</p>
          <p><strong>Fecha Inicio:</strong> {project.startDate}</p>
        </div>

        <div className="project-team-card card">
          <h3>Equipo de Investigación</h3>
          <ul className="team-list">
            {project.team?.map((member: any) => (
              <li key={member.id}>{member.name} - {member.role}</li>
            ))}
          </ul>
          <button className="btn-small">Añadir Investigador</button>
        </div>

        <div className="project-deliverables-card card">
          <h3>Entregables</h3>
          <p>Gestiona los hitos y entregas del proyecto.</p>
          <button className="btn-primary" onClick={() => navigate(`/projects/${id}/deliverables`)}>
            Ver Entregables
          </button>
        </div>
      </div>

      <style>{`
        .project-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header-actions {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailPage;
