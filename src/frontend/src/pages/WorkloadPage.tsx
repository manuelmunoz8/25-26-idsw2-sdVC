import React from 'react';

const WorkloadPage: React.FC = () => {
  return (
    <div className="workload-page">
      <div className="page-header">
        <h2>Carga de Trabajo</h2>
      </div>

      <div className="card">
        <h3>Resumen de Carga</h3>
        <p>Aquí puedes gestionar la asignación de horas y proyectos para los investigadores.</p>
        
        <table className="workload-table">
          <thead>
            <tr>
              <th>Investigador</th>
              <th>Horas Totales</th>
              <th>Proyectos Activos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Investigador 1</td>
              <td>40h</td>
              <td>3</td>
              <td><span className="status-badge active">Óptimo</span></td>
            </tr>
            {/* ... */}
          </tbody>
        </table>

        <button className="btn-primary" style={{ marginTop: '2rem' }}>Editar Carga de Trabajo</button>
      </div>

      <style>{`
        .workload-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        .workload-table th, .workload-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          text-align: left;
        }
        .workload-table th {
          background: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default WorkloadPage;
