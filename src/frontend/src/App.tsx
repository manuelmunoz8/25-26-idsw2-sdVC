import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="publications" element={<div>Página en construcción</div>} />
          <Route path="profile" element={<div>Página en construcción</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
