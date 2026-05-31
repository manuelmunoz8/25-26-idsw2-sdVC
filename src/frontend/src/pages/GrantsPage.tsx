import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Grant {
  id: string;
  title: string;
  agency: string;
  opportunityNumber: string;
  closeDate: string;
}

const GrantsPage: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchGrants = async (keyword = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/grants/search?keyword=${keyword}`);
      setGrants(response.data);
    } catch (error) {
      console.error('Error fetching grants', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrants();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGrants(search);
  };

  return (
    <div className="grants-page">
      <div className="page-header">
        <h2>Buscador de Convocatorias (Grants.gov)</h2>
      </div>

      <form onSubmit={handleSearch} className="search-bar">
        <input 
          type="text" 
          placeholder="Buscar por palabra clave o agencia..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn-primary">Buscar</button>
      </form>

      {loading ? (
        <p>Buscando en Grants.gov...</p>
      ) : (
        <div className="grants-list">
          {grants.length === 0 ? (
            <p>No se encontraron convocatorias.</p>
          ) : (
            grants.map(grant => (
              <div key={grant.id} className="grant-item">
                <div className="grant-info">
                  <h3>{grant.title}</h3>
                  <p><strong>Agencia:</strong> {grant.agency}</p>
                  <p><strong>ID:</strong> {grant.opportunityNumber}</p>
                </div>
                <div className="grant-meta">
                  <span className="close-date">Cierra: {grant.closeDate}</span>
                  <button className="btn-outline">Importar</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .search-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .search-bar input {
          flex: 1;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .grant-item {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .close-date {
          display: block;
          color: #d9534f;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid #0a3b64;
          color: #0a3b64;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default GrantsPage;
