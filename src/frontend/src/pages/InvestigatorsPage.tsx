import React, { useState } from 'react';
import { investigatorsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';

interface Investigator {
  id: string;
  name: string;
  email: string;
  department: string;
}

const InvestigatorsPage: React.FC = () => {
  const { data: investigators, loading, error, create } = useCrud<Investigator>(investigatorsService as any);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', department: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create({ ...formData, role: 'investigador' });
      setShowForm(false);
      setFormData({ name: '', email: '', department: '', password: '' });
    } catch (err) {
      alert('Error al crear el investigador');
    }
  };

  return (
    <div className="investigators-page">
      <div className="page-header">
        <h2>Investigadores</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Añadir Investigador'}
        </button>
      </div>

      {showForm && (
        <form className="create-form" onSubmit={handleSubmit}>
          <h3>Nuevo Investigador</h3>
          <input type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="text" placeholder="Departamento" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
          <input type="password" placeholder="Contraseña" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          <button type="submit" className="btn-primary">Crear</button>
        </form>
      )}

      {loading ? (
        <p>Cargando investigadores...</p>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">Error al cargar investigadores: {error}</p>
        </div>
      ) : (
        <div className="investigators-grid">
          {investigators.length === 0 ? (
            <p>No hay investigadores registrados actualmente.</p>
          ) : (
            investigators.map(inv => (
              <div key={inv.id} className="inv-card">
                <h3>{inv.name}</h3>
                <p><strong>Email:</strong> {inv.email}</p>
                <p><strong>Departamento:</strong> {inv.department}</p>
                <div className="inv-actions">
                  <button className="btn-small">Ver Perfil</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .create-form {
          background: #f9f9f9;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .create-form input {
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .error-container {
          padding: 1rem;
          background: #ffebee;
          color: #c62828;
          border: 1px solid #ef9a9a;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        .investigators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .inv-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .inv-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        .btn-small {
          background: #eee;
          border: 1px solid #ccc;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default InvestigatorsPage;
