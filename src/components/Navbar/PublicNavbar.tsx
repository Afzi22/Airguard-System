import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { CitySelector } from './CitySelector';
import { LiveClock } from './LiveClock';

interface PublicNavbarProps {
  activeCity: string;
  onCityChange: (cityId: string) => void;
  onGoToAdminLogin: () => void;
}

export function PublicNavbar({ activeCity, onCityChange, onGoToAdminLogin }: PublicNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0"
      style={{ zIndex: 1100 }}
      aria-label="AirGuard public navigation bar"
    >
      {/* Main row */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <span
            className="text-lg sm:text-xl font-bold text-white"
            style={{ textShadow: '0 0 12px #34d399, 0 0 24px #10b981' }}
          >
            Air<span className="text-emerald-400">Guard</span>
            <span className="hidden sm:inline"> System</span>
          </span>
        </div>

        {/* City Selector — always visible */}
        <div className="flex-1 flex justify-center max-w-[220px]">
          <CitySelector activeCity={activeCity} onCityChange={onCityChange} />
        </div>

        {/* Desktop right section */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <LiveClock />
          <button
            onClick={onGoToAdminLogin}
            aria-label="Admin login"
            className="flex items-center gap-2 bg-slate-700/60 hover:bg-slate-700 border border-slate-600/50 text-slate-300 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Shield size={14} />
            Admin
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-700/50 px-4 py-3 flex flex-col gap-3 bg-slate-900/95">
          <LiveClock />
          <button
            onClick={() => { onGoToAdminLogin(); setMenuOpen(false); }}
            aria-label="Admin login"
            className="flex items-center justify-center gap-2 bg-slate-700/60 hover:bg-slate-700 border border-slate-600/50 text-slate-300 hover:text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors w-full"
          >
            <Shield size={14} />
            Admin Login
          </button>
        </div>
      )}
    </nav>
  );
}

export default PublicNavbar;
