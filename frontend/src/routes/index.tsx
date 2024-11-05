import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Financial = React.lazy(() => import('../pages/Financial'));
const Marketing = React.lazy(() => import('../pages/Marketing'));
const Insights = React.lazy(() => import('../pages/Insights'));
const Social = React.lazy(() => import('../pages/Social'));
const Clients = React.lazy(() => import('../pages/Clients'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Security = React.lazy(() => import('../pages/Security'));
const Login = React.lazy(() => import('../pages/Login'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/financial" element={<ProtectedRoute><Financial /></ProtectedRoute>} />
        <Route path="/marketing" element={<ProtectedRoute><Marketing /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
        <Route path="/social" element={<ProtectedRoute><Social /></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  );
}
