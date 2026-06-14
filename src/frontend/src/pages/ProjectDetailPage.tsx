import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsService, investigatorsService } from '../services/serviceInstances';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [investigators, setInvestigators] = useState<any[]>([]);
  const [selectedInvId, setSelectedInvId] = useState('');
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const fetchProject = async () => {
    if (!id) return;
    try {
      const data = await projectsService.findOne(id);
      setProject(data);
    } catch (error) {
      console.error('Error fetching project', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchProject();
      try {
        const invs = await investigatorsService.findAll();
        setInvestigators(invs);
      } catch (err) {
        console.error('Error fetching investigators', err);
      }
      setLoading(false);
    };
    init();
  }, [id]);

  const handleAddInvestigator = async () => {
    if (!selectedInvId) return;
    setAdding(true);
    try {
      await (projectsService as any).addInvestigator(id!, selectedInvId);
      await fetchProject(); // Refresh
      setSelectedInvId('');
    } catch (err) {
      alert('Error al añadir investigador.');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveInvestigator = async (invId: string, name: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${name} de este proyecto?`)) {
      try {
        await (projectsService as any).removeInvestigator(id!, invId);
        await fetchProject(); // Refresh
      } catch (err) {
        alert('Error al eliminar investigador.');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      try {
        await projectsService.remove(id!);
        navigate('/projects');
      } catch (error) {
        console.error('Error deleting project', error);
      }
    }
  };

  if (loading) return <p>Cargando detalles del proyecto...</p>;
  if (!project) return <p>Proyecto no encontrado.</p>;

  const availableInvestigators = investigators.filter(
    (inv) => !project.team?.some((member: any) => member.id === inv.id)
  );

  return (
    <div className="project-detail-page">
      <div className="page-header">
        <h2>{project.title}</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate('/projects')}>Volver</button>
          <button className="btn-primary" onClick={() => navigate(`/projects/${id}/edit`)}>Editar</button>
          <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
        </div>
      </div>

      <div className="project-content">
        <div className="card">
          <h3>Información del Proyecto</h3>
          <p><strong>Estado:</strong> {project.status}</p>
          <p><strong>Coordinador:</strong> {project.coordinator?.name || 'N/A'}</p>
          <p><strong>Fecha Inicio:</strong> {project.startDate || 'N/A'}</p>
          <p><strong>Fecha Fin:</strong> {project.endDate || 'N/A'}</p>
          <p><strong>Descripción:</strong> {project.description}</p>
          <p><strong>Objetivos:</strong> {project.objectives}</p>
        </div>

        <div className="card">
          <h3>Equipo de Investigación</h3>
          {project.team && project.team.length > 0 ? (
            <ul className="team-list">
              {project.team.map((member: any) => (
                <li key={member.id} className="team-member">
                  <span>{member.name} ({member.role})</span>
                  <button className="btn-danger-small" onClick={() => handleRemoveInvestigator(member.id, member.name)}>X</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay miembros en el equipo.</p>
          )}
          
          <div className="add-investigator">
            <select value={selectedInvId} onChange={(e) => setSelectedInvId(e.target.value)}>
              <option value="">Seleccionar investigador...</option>
              {availableInvestigators.map((inv) => (
                <option key={inv.id} value={inv.id}>{inv.name}</option>
              ))}
            </select>
            <button className="btn-primary" onClick={handleAddInvestigator} disabled={adding || !selectedInvId}>
              {adding ? 'Añadiendo...' : 'Añadir al Equipo'}
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Gestión</h3>
          <button className="btn-primary" onClick={() => navigate(`/projects/${id}/deliverables`)}>
            Abrir Entregables
          </button>
        </div>
      </div>

      <style>{`
        .project-content { display: grid; gap: 2rem; }
        .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .header-actions { display: flex; gap: 1rem; }
        .add-investigator { display: flex; gap: 1rem; margin-top: 1rem; }
        .team-member { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .btn-primary { background-color: #0a3b64; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-secondary { background: #eee; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-danger { background-color: #dc3545; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-danger-small { background-color: #dc3545; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 4px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default ProjectDetailPage;
