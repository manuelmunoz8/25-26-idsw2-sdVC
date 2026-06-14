import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deliverablesService } from '../services/serviceInstances';

const EditDeliverablePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // deliverableId
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    projectId: '',
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDeliverable = async () => {
      try {
        const data = await deliverablesService.findOne(id!);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          dueDate: data.dueDate ? data.dueDate.split('T')[0] : '',
          status: data.status || 'pending',
          projectId: data.projectId,
        });
      } catch (error) {
        console.error('Error fetching deliverable', error);
        alert('Error al cargar los datos del entregable');
      } finally {
        setLoading(false);
      }
    };
    fetchDeliverable();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      setErrors({ title: 'El título es obligatorio' });
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await deliverablesService.update(id!, {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        status: formData.status,
      });
      alert('Entregable actualizado exitosamente');
      navigate(`/projects/${formData.projectId}/deliverables`);
    } catch (error) {
      alert('Error al actualizar el entregable');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="edit-deliverable-page">
      <h2>Editar Entregable</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título*</label>
          <input
            type="text"
            className={errors.title ? 'error-input' : ''}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Fecha de Entrega</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En Progreso</option>
            <option value="delivered">Entregado</option>
            <option value="approved">Aprobado</option>
            <option value="rejected">Rechazado</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate(`/projects/${formData.projectId}/deliverables`)}>Cancelar</button>
          <button type="submit" className="btn-primary" disabled={submitting}>Guardar Cambios</button>
        </div>
      </form>
      <style>{`
        .edit-deliverable-page { max-width: 600px; margin: 0 auto; padding: 2rem; }
        .form-group { margin-bottom: 1rem; }
        .error-input { border-color: #dc3545 !important; }
        .error-text { color: #dc3545; font-size: 0.8rem; }
        .btn-primary { background-color: #0a3b64; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-secondary { background: #eee; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default EditDeliverablePage;
