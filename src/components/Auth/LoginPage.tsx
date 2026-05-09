import { useState } from 'react';
import { UserRole } from '../../types';
import { validateCredentials } from '../../utils/authUtils';
import { GlassCard } from '../shared/GlassCard';

interface LoginPageProps {
  onLogin: (role: UserRole, username: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = validateCredentials(username, password);
    if (role !== null) {
      setError(null);
      onLogin(role, username);
    } else {
      setError('Username atau password salah. Silakan coba lagi.');
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <GlassCard className="p-8">
          {/* Logo & System Name */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold text-white"
              style={{ textShadow: '0 0 12px #34d399, 0 0 24px #10b981' }}
            >
              Air<span className="text-emerald-400">Guard</span> System
            </h1>
            <p className="text-slate-400 text-sm mt-2">Sistem Pemantauan Kualitas Udara</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="Username"
                aria-required="true"
                autoComplete="username"
                className="w-full bg-slate-700/60 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                placeholder="Masukkan username"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                aria-required="true"
                autoComplete="current-password"
                className="w-full bg-slate-700/60 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                placeholder="Masukkan password"
              />
            </div>

            {/* Inline error message */}
            {error && (
              <div
                role="alert"
                className="mb-4 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg px-4 py-2.5"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              aria-label="Masuk"
              className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Masuk
            </button>
          </form>

          {/* Demo credentials hint */}
          <p className="text-center text-xs text-slate-500 mt-6">
            Demo: admin / admin123 atau user / user123
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

export default LoginPage;
