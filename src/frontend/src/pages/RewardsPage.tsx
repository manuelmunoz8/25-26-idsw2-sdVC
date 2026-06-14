import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rewardsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';
import { useAuth } from '../context/AuthContext';

interface Reward {
  id: string;
  name: string;
  points: number;
  description: string;
}

const RewardsPage: React.FC = () => {
  const { data: rewards, loading, error, create, update, remove, fetchAll } = useCrud<Reward>(rewardsService as any);
  const { user } = useAuth();
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: '', points: 0, description: '' });

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro de eliminar esta recompensa?')) {
      await remove(id);
      await fetchAll();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReward) {
        await update(editingReward.id, { ...formData, points: Number(formData.points) });
        setEditingReward(null);
    } else {
        await create({ ...formData, points: Number(formData.points) });
        setIsCreating(false);
    }
    setFormData({ name: '', points: 0, description: '' });
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
                <h3>{reward.name}</h3>
                <p className="points">{reward.points} Puntos</p>
                <p>{reward.description}</p>
                {user?.role === 'coordinador' && (
                  <div className="reward-actions">
                    <button className="btn-small" onClick={() => { setEditingReward(reward); setFormData(reward); }}>Editar</button>
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
            <input type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input type="number" placeholder="Puntos" value={formData.points} onChange={e => setFormData({...formData, points: parseInt(e.target.value)})} required />
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
