import { ZoomIn, ZoomOut, Crosshair } from 'lucide-react';

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onRecenter?: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onRecenter }: MapControlsProps) {
  return (
    <div className="flex flex-col gap-1 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-1 shadow-lg">
      <button
        type="button"
        onClick={onZoomIn}
        aria-label="Zoom in"
        className="flex items-center justify-center w-8 h-8 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
      >
        <ZoomIn size={16} />
      </button>
      <div className="h-px bg-slate-700/50" />
      <button
        type="button"
        onClick={onZoomOut}
        aria-label="Zoom out"
        className="flex items-center justify-center w-8 h-8 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
      >
        <ZoomOut size={16} />
      </button>
      <div className="h-px bg-slate-700/50" />
      <button
        type="button"
        onClick={onRecenter}
        aria-label="Recenter map"
        className="flex items-center justify-center w-8 h-8 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
      >
        <Crosshair size={16} />
      </button>
    </div>
  );
}

export default MapControls;
