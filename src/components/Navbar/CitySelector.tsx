import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { CITIES } from '../../data/mockData';

interface CitySelectorProps {
  activeCity: string;
  onCityChange: (cityId: string) => void;
}

export function CitySelector({ activeCity, onCityChange }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCity_ = CITIES.find((c) => c.id === activeCity);
  const filteredCities = CITIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSelect(cityId: string) {
    onCityChange(cityId);
    setIsOpen(false);
    setSearchQuery('');
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Select city"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm transition-colors min-w-[180px]"
      >
        <span className="flex-1 text-left">{activeCity_?.name ?? 'Select City'}</span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="City list"
          className="absolute top-full mt-1 left-0 w-full min-w-[220px] bg-slate-800 border border-slate-700/50 rounded-xl shadow-xl z-50 overflow-hidden"
        >
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-700/50">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search cities"
              className="bg-transparent text-white text-sm placeholder-slate-500 outline-none w-full"
              autoFocus
            />
          </div>

          {/* City list */}
          <ul className="max-h-48 overflow-y-auto py-1">
            {filteredCities.length === 0 ? (
              <li className="px-3 py-2 text-slate-400 text-sm">No cities found</li>
            ) : (
              filteredCities.map((city) => (
                <li
                  key={city.id}
                  role="option"
                  aria-selected={city.id === activeCity}
                  onClick={() => handleSelect(city.id)}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                    city.id === activeCity
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  {city.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CitySelector;
