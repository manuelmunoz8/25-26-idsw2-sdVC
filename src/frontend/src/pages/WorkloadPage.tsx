import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const WorkloadPage: React.FC = () => {
  const { user } = useAuth();
  const [workload, setWorkload] = useState({ teaching: 10, research: 20, academic: 10 });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(workload);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkload(formData);
    setIsEditing(false);
  };

  return (
    <div className="workload-page">
      <div className="page-header">
        <h2>Carga de Trabajo</h2>
        {user?.role === 'coordinador' && !isEditing && (
          <button className="btn-primary" onClick={() => setIsEditing(true)}>Editar Carga</button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="card">
          <h3>Editar Horas</h3>
          <input type="number" min="0" value={formData.teaching} onChange={e => setFormData({...formData, teaching: Number(e.target.value)})} placeholder="Docentes" required />
          <input type="number" min="0" value={formData.research} onChange={e => setFormData({...formData, research: Number(e.target.value)})} placeholder="Investigación" required />
          <input type="number" min="0" value={formData.academic} onChange={e => setFormData({...formData, academic: Number(e.target.value)})} placeholder="Académicas" required />
          <button type="submit" className="btn-primary">Guardar</button>
          <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <div className="card">
          <div className="workload-summary">
            <p><strong>Horas Docentes:</strong> {workload.teaching}</p>
            <p><strong>Horas de Investigación:</strong> {workload.research}</p>
            <p><strong>Horas Académicas:</strong> {workload.academic}</p>
            <p><strong>Total:</strong> {workload.teaching + workload.research + workload.academic}</p>
          </div>
        </div>
      )}

      <style>{`
        .workload-summary { display: flex; flex-direction: column; gap: 0.5rem; }
        .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .btn-primary { background-color: #0a3b64; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-secondary { background: #eee; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default WorkloadPage;
