import { useState } from 'react';
import { UserRole } from './types';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { LoginPage } from './components/Auth/LoginPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PublicDashboard } from './components/Dashboard/PublicDashboard';

type Page = 'public' | 'admin-login' | 'admin';

function App() {
  // Default langsung ke public — masyarakat tidak perlu login
  const [currentPage, setCurrentPage] = useState<Page>('public');

  function handleLogin(role: UserRole) {
    if (role === 'admin') {
      setCurrentPage('admin');
    } else {
      // Kalau user biasa login, tetap ke public view
      setCurrentPage('public');
    }
  }

  function handleAdminLogout() {
    setCurrentPage('public');
  }

  function handleGoToAdminLogin() {
    setCurrentPage('admin-login');
  }

  function handleCancelAdminLogin() {
    setCurrentPage('public');
  }

  return (
    <ErrorBoundary>
      {currentPage === 'public' && (
        <PublicDashboard onGoToAdminLogin={handleGoToAdminLogin} />
      )}
      {currentPage === 'admin-login' && (
        <LoginPage onLogin={handleLogin} onCancel={handleCancelAdminLogin} />
      )}
      {currentPage === 'admin' && (
        <Dashboard onLogout={handleAdminLogout} />
      )}
    </ErrorBoundary>
  );
}

export default App;
