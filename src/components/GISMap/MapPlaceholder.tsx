interface MapPlaceholderProps {
  activeCity?: string;
}

export function MapPlaceholder({ activeCity }: MapPlaceholderProps) {
  return (
    <div
      className="relative w-full h-full min-h-[400px] bg-slate-900 overflow-hidden rounded-xl"
      aria-label={`Map view for ${activeCity ?? 'selected city'}`}
      role="img"
    >
      {/* Grid overlay representing map tiles */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(52, 211, 153, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52, 211, 153, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-transparent to-slate-900/60" />

      {/* Map label */}
      <div className="absolute bottom-4 left-4 text-slate-500 text-xs font-mono">
        GIS Map — {activeCity ?? 'No city selected'}
      </div>

      {/* Decorative "roads" */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="40%" x2="100%" y2="45%" stroke="#34d399" strokeWidth="2" />
        <line x1="0" y1="65%" x2="100%" y2="60%" stroke="#34d399" strokeWidth="1" />
        <line x1="30%" y1="0" x2="35%" y2="100%" stroke="#34d399" strokeWidth="2" />
        <line x1="65%" y1="0" x2="60%" y2="100%" stroke="#34d399" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default MapPlaceholder;
