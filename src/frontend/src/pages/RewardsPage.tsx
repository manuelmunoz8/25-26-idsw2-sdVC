import React from 'react';
import { rewardsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';

interface Reward {
  id: string;
  name: string;
  points: number;
  description: string;
}

const RewardsPage: React.FC = () => {
  const { data: rewards, loading, error } = useCrud<Reward>(rewardsService as any);

  return (
    <div className="rewards-page">
      <div className="page-header">
        <h2>Recompensas e Incentivos</h2>
        <button className="btn-primary">Nueva Recompensa</button>
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
                <div className="reward-actions">
                  <button className="btn-small">Editar</button>
                  <button className="btn-small btn-danger">Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .reward-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          border-top: 4px solid #0a3b64;
        }
        .points {
          font-weight: bold;
          color: #28a745;
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }
        .reward-actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default RewardsPage;
