import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationsService } from '../services/serviceInstances';
import { useCrud } from '../hooks/useCrud';

interface Publication {
  id: string;
  title: string;
  date: string;
  status: string;
  summary: string;
  content: string;
}

const MyPublicationsPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [editingPub, setEditingPub] = useState<Publication | null>(null);

  const fetchMy = async () => {
    setLoading(true);
    try {
      const data = await publicationsService.getMy();
      console.log("DEBUG: MyPublications data", data);
      setPublications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar publicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMy();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro de eliminar esta publicación?')) {
      await publicationsService.remove(id);
      await fetchMy();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await publicationsService.update(editingPub!.id, editingPub);
    setEditingPub(null);
    await fetchMy();
  };

  return (
    <div className="my-publications-page">
      <div className="page-header">
        <h2>Mis Publicaciones</h2>
        <button className="btn-primary" onClick={() => navigate('/my-publications/new')}>Nueva Publicación</button>
      </div>

      {loading ? <p>Cargando...</p> : error ? <p>{error}</p> : (
        <div className="publications-list">
          {publications.map(pub => (
            <div key={pub.id} className="publication-card">
              <h3>{pub.title}</h3>
              <div className="pub-actions">
                <button className="btn-small" onClick={() => setEditingPub(pub)}>Editar</button>
                <button className="btn-small btn-danger" onClick={() => handleDelete(pub.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingPub && (
        <div className="modal">
          <form onSubmit={handleUpdate} className="card">
            <h3>Editar Publicación</h3>
            <input type="text" value={editingPub.title} onChange={e => setEditingPub({...editingPub, title: e.target.value})} />
            <textarea value={editingPub.summary} onChange={e => setEditingPub({...editingPub, summary: e.target.value})} />
            <button type="submit" className="btn-primary">Guardar</button>
            <button type="button" onClick={() => setEditingPub(null)}>Cancelar</button>
          </form>
        </div>
      )}

      <style>{`
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
        .card { background: white; padding: 2rem; border-radius: 8px; width: 400px; }
      `}</style>
    </div>
  );
};

export default MyPublicationsPage;
