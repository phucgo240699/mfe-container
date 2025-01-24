import './App.css';
import { Header } from '@/components/Header';
import DashboardApp from '@/apps/dashboard/index.jsx';
import MarketingApp from '@/apps/marketing/index.jsx';
import AuthenticationApp from '@/apps/authentication/index.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
  AuthenticationContext,
  AuthenticationProvider,
} from '@/contexts/authentication';
import React from 'react';
import { NotFoundPage } from './pages/notFound';

const RoutedApp = () => {
  const { isAuthenticated } = React.useContext(AuthenticationContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={'/dashboard'} />
            ) : (
              <Navigate to={'/auth'} />
            )
          }
        />
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? <DashboardApp /> : <Navigate to={'/auth'} />
          }
        />
        <Route
          path="/marketing/*"
          element={
            isAuthenticated ? <MarketingApp /> : <Navigate to={'/auth'} />
          }
        />
        <Route
          path="/auth/*"
          element={
            isAuthenticated ? <Navigate to={'/'} /> : <AuthenticationApp />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <AuthenticationProvider>
      <Header>
        <RoutedApp />
      </Header>
    </AuthenticationProvider>
  );
};

export default App;
