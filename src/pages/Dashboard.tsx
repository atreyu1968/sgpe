import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { USER_ROLES } from '../config/constants';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { UsersPanel } from './admin/UsersPanel';
import { ContestsPanel } from './admin/ContestsPanel';
import { CentersPanel } from './admin/CentersPanel';
import { ProjectsPanel } from './admin/ProjectsPanel';
import { EvaluationsPanel } from './admin/EvaluationsPanel';
import { SettingsPanel } from './admin/SettingsPanel';

export function Dashboard() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="" element={<Navigate to="users" replace />} />
        <Route 
          path="users" 
          element={
            user?.role === USER_ROLES.ADMINISTRATOR ? 
              <UsersPanel /> : 
              <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="centers" 
          element={
            user?.role === USER_ROLES.ADMINISTRATOR || user?.role === USER_ROLES.GENERAL_COORDINATOR ? 
              <CentersPanel /> : 
              <Navigate to="/login" replace />
          } 
        />
        <Route path="contests" element={<ContestsPanel />} />
        <Route path="projects" element={<ProjectsPanel />} />
        <Route path="evaluations" element={<EvaluationsPanel />} />
        <Route path="settings" element={<SettingsPanel />} />
      </Routes>
    </DashboardLayout>
  );
}