import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deliverablesService } from '../services/serviceInstances';

const DeliverablesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deliverables, setDeliverables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliverables = async () => {
    try {
      const data = await deliverablesService.findAllByProject(id!);
      setDeliverables(data);
    } catch (error) {
      console.error('Error fetching deliverables', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliverables();
  }, [id]);

  const handleDelete = async (delId: string, title: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el entregable: ${title}?`)) {
      try {
        await deliverablesService.remove(delId);
        await fetchDeliverables();
      } catch (error) {
        alert('Error al eliminar el entregable.');
      }
    }
  };

  const handleStatusChange = async (delId: string, currentStatus: string) => {
    const statuses = ['pending', 'in_progress', 'delivered', 'approved', 'rejected'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    try {
      await deliverablesService.update(delId, { status: nextStatus });
      await fetchDeliverables();
    } catch (error) {
      alert('Error al cambiar el estado.');
    }
  };

  if (loading) return <p>Cargando entregables...</p>;

  return (
    <div className="deliverables-page">
      <div className="page-header">
        <h2>Entregables del Proyecto</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate(`/projects/${id}`)}>Volver al Proyecto</button>
          <button className="btn-primary">Nuevo Entregable</button>
        </div>
      </div>

      <table className="deliverables-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha Límite</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {deliverables.map((del) => (
            <tr key={del.id}>
              <td>{del.title}</td>
              <td>{del.dueDate ? new Date(del.dueDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <span className={`status-badge ${del.status}`}>{del.status}</span>
              </td>
              <td>
                <button className="btn-small" onClick={() => handleStatusChange(del.id, del.status)}>Cambiar Estado</button>
                <button className="btn-small btn-danger" onClick={() => handleDelete(del.id, del.title)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .deliverables-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .deliverables-table th, .deliverables-table td { padding: 1rem; border: 1px solid #ddd; text-align: left; }
        .status-badge { padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.85rem; }
        .btn-small { padding: 0.3rem 0.5rem; font-size: 0.8rem; margin-right: 0.5rem; cursor: pointer; }
        .btn-danger { background: #dc3545; color: white; border: none; }
        .btn-primary { background-color: #0a3b64; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-secondary { background: #eee; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default DeliverablesPage;
