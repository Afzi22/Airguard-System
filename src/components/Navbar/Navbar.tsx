import { Download, LogOut } from 'lucide-react';
import { CitySelector } from './CitySelector';
import { LiveClock } from './LiveClock';
import { StatusIndicator } from './StatusIndicator';

interface NavbarProps {
  activeCity: string;
  onCityChange: (cityId: string) => void;
  onExportReport: () => void;
  onLogout?: () => void;
}

export function Navbar({ activeCity, onCityChange, onExportReport, onLogout }: NavbarProps) {
  return (
    <nav
      className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-3 flex items-center justify-between gap-4 z-40 sticky top-0"
      aria-label="AirGuard navigation bar"
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

      {/* Right: Status indicators, clock, export */}
      <div className="flex items-center gap-5 shrink-0">
        <StatusIndicator label="AI Engine" status="Online" color="emerald" />
        <StatusIndicator label="IoT Nodes" status="45 Active" color="blue" />
        <LiveClock />
        <button
          onClick={onExportReport}
          aria-label="Export report"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Download size={14} />
          Export Report
        </button>
        {onLogout && (
          <button
            onClick={onLogout}
            aria-label="Logout"
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
