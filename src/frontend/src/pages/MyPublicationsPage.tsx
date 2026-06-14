import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationsService, publicationsCustomService } from '../services/serviceInstances';
import { useAuth } from '../context/AuthContext';

interface Publication {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const MyPublicationsPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [editingPub, setEditingPub] = useState<Publication | null>(null);

  const fetchMy = async () => {
    if (!user?.id) {
        console.log("DEBUG: No user ID available");
        setLoading(false);
        return;
    }
    setLoading(true);
    try {
      console.log("DEBUG: Fetching publications for user ID:", user.id);
      const data = await publicationsCustomService.getMy(user.id);
      console.log("DEBUG: MyPublications data:", data);
      setPublications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("DEBUG: Detailed error fetching publications:", err);
      setError('Error al cargar publicaciones: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchMy();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro de eliminar esta publicación?')) {
      await publicationsService.remove(id);
      await fetchMy();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await publicationsService.update(editingPub!.id, {
      title: editingPub!.title,
      content: editingPub!.content
    });
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
              <p>Creada el {new Date(pub.createdAt).toLocaleDateString()}</p>
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
            <textarea value={editingPub.content} onChange={e => setEditingPub({...editingPub, content: e.target.value})} />
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
