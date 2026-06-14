import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsService } from '../services/serviceInstances';

const EditProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    objectives: '',
    startDate: '',
    endDate: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await projectsService.findOne(id!);
        setFormData({
          title: project.title || '',
          description: project.description || '',
          objectives: project.objectives || '',
          startDate: project.startDate ? project.startDate.split('T')[0] : '',
          endDate: project.endDate ? project.endDate.split('T')[0] : '',
          status: project.status || 'draft',
        });
      } catch (err) {
        setError('Error al cargar los datos del proyecto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      setError('El título es obligatorio.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await projectsService.update(id!, formData);
      alert('Proyecto actualizado correctamente.');
      navigate(`/projects/${id}`);
    } catch (err) {
      setError('Error al actualizar el proyecto.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="edit-project-page">
      <h2>Editar Proyecto</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título*</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Objetivos</label>
          <textarea
            value={formData.objectives}
            onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Fecha de inicio</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Fecha de fin</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select 
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate(`/projects/${id}`)}>Volver</button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>

      <style>{`
        .edit-project-page { max-width: 600px; margin: 0 auto; padding: 2rem; background: white; border-radius: 8px; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
        .form-actions { display: flex; justify-content: space-between; margin-top: 2rem; }
        .btn-primary { background-color: #0a3b64; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-secondary { background: #eee; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .error-message { color: #dc3545; margin-bottom: 1rem; }
      `}</style>
    </div>
  );
};

export default EditProjectPage;
