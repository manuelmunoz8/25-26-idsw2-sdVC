import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationsService } from '../services/serviceInstances';
import { useAuth } from '../context/AuthContext';

const CreatePublicationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', summary: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!user?.id) throw new Error('Usuario no autenticado');
      
      await publicationsService.create({ ...formData, authorId: user.id });
      navigate('/my-publications');
    } catch (err) {
      alert('Error al crear la publicación');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <h2>Nueva Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título*</label>
          <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Resumen</label>
          <textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Contenido</label>
          <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
        </div>
        <button type="submit" className="btn-primary" disabled={submitting}>Publicar</button>
      </form>
    </div>
  );
};

export default CreatePublicationPage;
