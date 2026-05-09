import { Shield } from 'lucide-react';
import { CitySelector } from './CitySelector';
import { LiveClock } from './LiveClock';

interface PublicNavbarProps {
  activeCity: string;
  onCityChange: (cityId: string) => void;
  onGoToAdminLogin: () => void;
}

export function PublicNavbar({ activeCity, onCityChange, onGoToAdminLogin }: PublicNavbarProps) {
  return (
    <nav
      className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-3 flex items-center justify-between gap-4 sticky top-0"
      style={{ zIndex: 1100 }}
      aria-label="AirGuard public navigation bar"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <span
          className="text-xl font-bold text-white"
          style={{ textShadow: '0 0 12px #34d399, 0 0 24px #10b981' }}
        >
          Air<span className="text-emerald-400">Guard</span> System
        </span>
      </div>

      {/* Center: City Selector */}
      <div className="flex items-center gap-4">
        <CitySelector activeCity={activeCity} onCityChange={onCityChange} />
      </div>

      {/* Right: Clock and Admin Login */}
      <div className="flex items-center gap-5 shrink-0">
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
    </nav>
  );
}

export default PublicNavbar;
