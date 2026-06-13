import React, { useState, useEffect } from 'react';
import { profileService } from '../services/serviceInstances';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.get();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const [deletionStatus, setDeletionStatus] = useState<{message: string, isError: boolean} | null>(null);

  const handleRequestDeletion = async () => {
    if (window.confirm('¿Estás seguro de que deseas solicitar la eliminación de tu perfil?')) {
      try {
        await profileService.requestDeletion();
        setDeletionStatus({message: 'Solicitud enviada correctamente.', isError: false});
      } catch (error) {
        setDeletionStatus({message: 'Error al enviar la solicitud.', isError: true});
      }
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2>Mi Perfil</h2>
      </div>

      {deletionStatus && (
        <div className={`status-message ${deletionStatus.isError ? 'error' : 'success'}`}>
          {deletionStatus.message}
        </div>
      )}

      <div className="profile-content card">
        <div className="profile-info">
          <p><strong>Nombre:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Rol:</strong> {user?.role}</p>
          {profileData?.department && <p><strong>Departamento:</strong> {profileData.department}</p>}
        </div>

        <div className="profile-actions">
          <button className="btn-primary">Editar Perfil</button>
          
          {user?.role === 'coordinador' && (
            <button 
              className="btn-outline" 
              onClick={() => navigate('/profile/deletion-requests')}
              style={{ marginLeft: '1rem' }}
            >
              Ver Solicitudes de Eliminación
            </button>
          )}

          <button 
            className="btn-danger-outline" 
            onClick={handleRequestDeletion}
            style={{ display: 'block', marginTop: '2rem' }}
          >
            Solicitar Eliminación de Perfil
          </button>
        </div>
      </div>

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
        .card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .profile-info p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        .btn-danger-outline {
          background: transparent;
          border: 1px solid #dc3545;
          color: #dc3545;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid #0a3b64;
          color: #0a3b64;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
