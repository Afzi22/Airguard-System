import { useState } from 'react';
import { UserRole, AuthState } from './types';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { LoginPage } from './components/Auth/LoginPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PublicDashboard } from './components/Dashboard/PublicDashboard';

type Page = 'login' | 'admin' | 'public';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [authState, setAuthState] = useState<AuthState | null>(null);

  function handleLogin(role: UserRole, username: string) {
    setAuthState({ role, username });
    setCurrentPage(role === 'admin' ? 'admin' : 'public');
  }

  function handleLogout() {
    setAuthState(null);
    setCurrentPage('login');
  }

  return (
    <ErrorBoundary>
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      {currentPage === 'admin' && (
        <Dashboard onLogout={handleLogout} />
      )}
      {currentPage === 'public' && (
        <PublicDashboard onLogout={handleLogout} />
      )}
    </ErrorBoundary>
  );
}

export default App;
