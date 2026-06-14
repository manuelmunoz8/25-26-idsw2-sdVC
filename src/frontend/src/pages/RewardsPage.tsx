import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rewardsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';
import { useAuth } from '../context/AuthContext';

interface Reward {
  id: string;
  title: string;
  value: number;
  description: string;
}

const RewardsPage: React.FC = () => {
  const { data: rewards, loading, error, create, update, remove, fetchAll } = useCrud<Reward>(rewardsService as any);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: '', value: 0, description: '' });

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta recompensa de forma permanente?')) {
      try {
        await remove(id);
        await fetchAll();
      } catch (err) {
        alert('Error al eliminar la recompensa');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
        title: formData.title,
        value: Number(formData.value),
        description: formData.description
    };
    if (editingReward) {
        await update(editingReward.id, payload);
        setEditingReward(null);
    } else {
        await create(payload);
        setIsCreating(false);
    }
    setFormData({ title: '', value: 0, description: '' });
    await fetchAll();
  };

  return (
    <div className="rewards-page">
      <div className="page-header">
        <h2>Recompensas e Incentivos</h2>
        {user?.role === 'coordinador' && (
          <button className="btn-primary" onClick={() => setIsCreating(true)}>Nueva Recompensa</button>
        )}
      </div>

      {loading ? (
        <p>Cargando recompensas...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="rewards-grid">
          {rewards.length === 0 ? (
            <p>No hay recompensas configuradas.</p>
          ) : (
            rewards.map(reward => (
              <div key={reward.id} className="reward-card">
                <h3>{reward.title}</h3>
                <p className="points">{reward.value} Puntos</p>
                <p>{reward.description}</p>
                {user?.role === 'coordinador' && (
                  <div className="reward-actions">
                    <button className="btn-small" onClick={() => navigate(`/rewards/${reward.id}/edit`)}>Editar</button>
                    <button className="btn-small btn-danger" onClick={() => handleDelete(reward.id)}>Eliminar</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {(isCreating || editingReward) && (
        <div className="modal">
          <form onSubmit={handleSave} className="card">
            <h3>{editingReward ? 'Editar' : 'Nueva'} Recompensa</h3>
            <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input type="number" placeholder="Valor (Puntos)" value={formData.value} onChange={e => setFormData({...formData, value: parseInt(e.target.value)})} required />
            <textarea placeholder="Descripción" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            <button type="submit" className="btn-primary">Guardar</button>
            <button type="button" onClick={() => { setIsCreating(false); setEditingReward(null); }}>Cancelar</button>
          </form>
        </div>
      )}

      <style>{`
        .rewards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .reward-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-top: 4px solid #0a3b64; }
        .points { font-weight: bold; color: #28a745; font-size: 1.2rem; margin: 0.5rem 0; }
        .reward-actions { margin-top: 1rem; display: flex; gap: 0.5rem; }
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
        .card { background: white; padding: 2rem; border-radius: 8px; width: 400px; display: flex; flex-direction: column; gap: 1rem; }
      `}</style>
    </div>
  );
};

export default RewardsPage;
