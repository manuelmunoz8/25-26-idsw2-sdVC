import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicationsService } from '../services/serviceInstances';

const PublicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pub, setPub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPublication = async () => {
    try {
      const data = await publicationsService.findOne(id!);
      setPub(data);
    } catch (error) {
      console.error('Error fetching publication', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublication();
  }, [id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setSubmitting(true);
    try {
      await publicationsService.addReply(id!, { content: reply });
      setReply('');
      await fetchPublication();
    } catch (error) {
      alert('Error al enviar respuesta');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando publicación...</p>;
  if (!pub) return <p>Publicación no encontrada.</p>;

  return (
    <div className="publication-detail-page">
      <button className="btn-secondary" onClick={() => navigate('/publications')}>Volver al Listado</button>
      <div className="card">
        <h2>{pub.title}</h2>
        <p className="pub-meta">Por {pub.author} en {pub.date}</p>
        <p className="pub-content">{pub.content}</p>
      </div>

      <div className="replies-section card">
        <h3>Respuestas</h3>
        {pub.replies?.map((r: any) => (
          <div key={r.id} className="reply-card">
            <p><strong>{r.author}:</strong> {r.content}</p>
          </div>
        ))}
        
        <form onSubmit={handleReply} className="reply-form">
          <textarea 
            value={reply} 
            onChange={(e) => setReply(e.target.value)}
            placeholder="Escribe tu respuesta..."
          />
          <button type="submit" className="btn-primary" disabled={submitting}>Enviar</button>
        </form>
      </div>

      <style>{`
        .card { background: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .pub-meta { color: #666; }
        .pub-content { margin-top: 1rem; font-size: 1.1rem; }
        .reply-card { border-bottom: 1px solid #eee; padding: 0.5rem 0; }
        .reply-form { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        textarea { padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; height: 80px; }
        .btn-primary { background-color: #0a3b64; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; }
        .btn-secondary { background: #eee; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 4px; cursor: pointer; margin-bottom: 1rem;}
      `}</style>
    </div>
  );
};

export default PublicationDetailPage;
