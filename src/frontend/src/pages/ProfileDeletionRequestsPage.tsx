import React, { useState, useEffect } from 'react';
import { profileService } from '../services/serviceInstances';

interface DeletionRequest {
  id: string;
  userName: string;
  userEmail: string;
  requestDate: string;
  reason?: string;
}

const ProfileDeletionRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<DeletionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{message: string, isError: boolean} | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await profileService.getDeletionRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching deletion requests', error);
      setFeedback({message: 'Error al cargar las solicitudes.', isError: true});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (userId: string, action: 'approve' | 'deny') => {
    try {
      if (action === 'approve') {
        await profileService.approveDeletion(userId);
      } else {
        await profileService.denyDeletion(userId);
      }
      setFeedback({message: `Solicitud ${action === 'approve' ? 'aprobada' : 'denegada'} correctamente.`, isError: false});
      fetchRequests(); // Actualizar reactivamente
    } catch (error) {
      console.error(`Error al ${action} solicitud`, error);
      setFeedback({message: `Error al ${action === 'approve' ? 'aprobar' : 'denegar'} la solicitud.`, isError: true});
    }
  };

  return (
    <div className="deletion-requests-page">
      <div className="page-header">
        <h2>Solicitudes de Eliminación de Perfil</h2>
      </div>

      {feedback && (
        <div className={`status-message ${feedback.isError ? 'error' : 'success'}`}>
          {feedback.message}
        </div>
      )}

      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : (
        <div className="requests-list">
          {requests.length === 0 ? (
            <p>No hay solicitudes pendientes.</p>
          ) : (
            requests.map((req: any) => (
              <div key={req.id} className="request-card">
                <div className="request-info">
                  <h3>{req.name}</h3>
                  <p><strong>Email:</strong> {req.email}</p>
                  <p><strong>Fecha:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="request-actions">
                  <button className="btn-primary" onClick={() => handleAction(req.id, 'approve')}>Aprobar</button>
                  <button className="btn-danger-outline" onClick={() => handleAction(req.id, 'deny')}>Denegar</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .status-message {
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        .status-message.success {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #c8e6c9;
        }
        .status-message.error {
          background: #ffebee;
          color: #c62828;
          border: 1px solid #ef9a9a;
        }
        .request-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .request-actions {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ProfileDeletionRequestsPage;
