import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DeliverablesPage from './pages/DeliverablesPage';
import LoginPage from './pages/LoginPage';
import GrantsPage from './pages/GrantsPage';
import InvestigatorsPage from './pages/InvestigatorsPage';
import PublicationsPage from './pages/PublicationsPage';
import MyPublicationsPage from './pages/MyPublicationsPage';
import RewardsPage from './pages/RewardsPage';
import WorkloadPage from './pages/WorkloadPage';
import ProfilePage from './pages/ProfilePage';
import ProfileDeletionRequestsPage from './pages/ProfileDeletionRequestsPage';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route path="projects/:id/deliverables" element={<DeliverablesPage />} />
            <Route path="grants" element={<GrantsPage />} />
            <Route path="investigators" element={<InvestigatorsPage />} />
            <Route path="publications" element={<PublicationsPage />} />
            <Route path="my-publications" element={<MyPublicationsPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="workload" element={<WorkloadPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/deletion-requests" element={<ProfileDeletionRequestsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
