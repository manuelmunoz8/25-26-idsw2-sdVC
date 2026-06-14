import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rewardsService } from '../services/serviceInstances';

const EditRewardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', value: 0, description: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const data = await rewardsService.findOne(id!);
        setFormData({ title: data.title, value: data.value, description: data.description });
      } catch (err) {
        alert('Error al cargar la recompensa');
      } finally {
        setLoading(false);
      }
    };
    fetchReward();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await rewardsService.update(id!, {
        title: formData.title,
        value: Number(formData.value),
        description: formData.description
      });
      alert('Recompensa actualizada');
      navigate('/rewards');
    } catch (err) {
      alert('Error al actualizar la recompensa');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="form-page">
      <h2>Editar Recompensa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título*</label>
          <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Valor (Puntos)*</label>
          <input type="number" value={formData.value} onChange={e => setFormData({...formData, value: parseInt(e.target.value)})} required />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/rewards')}>Cancelar</button>
          <button type="submit" className="btn-primary" disabled={submitting}>Guardar Cambios</button>
        </div>
      </form>
      <style>{`
        .form-page { max-width: 600px; margin: 0 auto; padding: 2rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
        .form-actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .btn-primary { background-color: #0a3b64; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-secondary { background: #eee; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default EditRewardPage;
