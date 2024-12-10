import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { DocumentationProvider } from './contexts/DocumentationContext';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DocumentationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard/users" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Routes>
            </div>
          </Router>
        </DocumentationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
