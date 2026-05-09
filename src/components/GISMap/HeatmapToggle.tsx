interface HeatmapToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

export function HeatmapToggle({ isActive, onToggle }: HeatmapToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-300 text-xs font-medium">Heatmap Layer</span>
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        aria-label="Toggle heatmap layer"
        onClick={onToggle}
        className={`
          relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
          ${isActive ? 'bg-emerald-500' : 'bg-slate-600'}
        `}
      >
        <span
          className={`
            inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200
            ${isActive ? 'translate-x-4' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}

export default HeatmapToggle;
