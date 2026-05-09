import { LogOut } from 'lucide-react';
import { CitySelector } from './CitySelector';
import { LiveClock } from './LiveClock';

interface PublicNavbarProps {
  activeCity: string;
  onCityChange: (cityId: string) => void;
  onLogout: () => void;
}

export function PublicNavbar({ activeCity, onCityChange, onLogout }: PublicNavbarProps) {
  return (
    <nav
      className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-3 flex items-center justify-between gap-4 z-40 sticky top-0"
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

      {/* Right: Clock and Logout */}
      <div className="flex items-center gap-5 shrink-0">
        <LiveClock />
        <button
          onClick={onLogout}
          aria-label="Logout"
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default PublicNavbar;
