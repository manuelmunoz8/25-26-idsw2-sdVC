import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsService } from '../services/serviceInstances';
import { CreateProjectDto } from '../types/CreateProjectDto';

const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateProjectDto>({
    title: '',
    description: '',
    objectives: '',
    startDate: '',
    endDate: '',
    status: 'draft',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      setError('El título es obligatorio.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await projectsService.create(formData);
      navigate('/projects');
    } catch (err) {
      setError('Error al crear el proyecto.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-project-page">
      <h2>Crear Nuevo Proyecto</h2>
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
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/projects')}>Volver</button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Creando...' : 'Crear Proyecto'}
          </button>
        </div>
      </form>

      <style>{`
        .create-project-page { max-width: 600px; margin: 0 auto; padding: 2rem; background: white; border-radius: 8px; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
        .form-actions { display: flex; justify-content: space-between; margin-top: 2rem; }
        .btn-primary { background-color: #0a3b64; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-secondary { background: #eee; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .error-message { color: #dc3545; margin-bottom: 1rem; }
      `}</style>
    </div>
  );
};

export default CreateProjectPage;
