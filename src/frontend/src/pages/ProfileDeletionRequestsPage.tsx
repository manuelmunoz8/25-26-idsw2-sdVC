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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await profileService.getDeletionRequests();
        console.log('Datos recibidos de la API:', data); // Log para depuración
        setRequests(data);
      } catch (error) {
        console.error('Error fetching deletion requests', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="deletion-requests-page">
      <div className="page-header">
        <h2>Solicitudes de Eliminación de Perfil</h2>
      </div>

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
                  <button className="btn-primary">Procesar</button>
                  <button className="btn-danger-outline">Denegar</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
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
