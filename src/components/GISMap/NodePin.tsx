import type { CSSProperties } from 'react';
import type { IoTNode } from '../../types/index';
import { getAQIColor } from '../../utils/aqiUtils';

interface NodePinProps {
  node: IoTNode;
  isSelected: boolean;
  onClick: (nodeId: string) => void;
  /** Position on the placeholder map (percentage-based) */
  style?: CSSProperties;
}

const colorClassMap: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: 'bg-emerald-500', border: 'border-emerald-400', text: 'text-emerald-400' },
  amber:   { bg: 'bg-amber-500',   border: 'border-amber-400',   text: 'text-amber-400'   },
  rose:    { bg: 'bg-rose-500',    border: 'border-rose-400',    text: 'text-rose-400'    },
};

export function NodePin({ node, isSelected, onClick, style }: NodePinProps) {
  const color = getAQIColor(node.aqi);
  const colors = colorClassMap[color];

  return (
    <div className="absolute" style={style}>
      {/* Tooltip popup when selected — Req 3.3, 3.4, 3.5, 8.3 */}
      {isSelected && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-slate-800 border border-slate-700/50 rounded-lg shadow-xl p-3 z-10 pointer-events-none"
          role="tooltip"
          id={`tooltip-${node.id}`}
        >
          <p className="text-white text-xs font-semibold mb-1 truncate">{node.name}</p>
          <p className="text-slate-300 text-xs">
            PM2.5:{' '}
            <span className="text-white font-medium">{node.pm25} µg/m³</span>
          </p>
          <p className="text-slate-300 text-xs">
            Status:{' '}
            <span className={`font-medium ${colors.text}`}>{node.status}</span>
          </p>
          <p className="text-slate-300 text-xs">
            AQI:{' '}
            <span className={`font-medium ${colors.text}`}>{node.aqi}</span>
          </p>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-700/50" />
        </div>
      )}

      {/* Pin badge — Req 3.2, 3.3, 3.4, 3.5, 7.5 */}
      <button
        type="button"
        onClick={() => onClick(node.id)}
        aria-label={`IoT Node ${node.name}: AQI ${node.aqi}, status ${node.status}`}
        aria-pressed={isSelected}
        aria-describedby={isSelected ? `tooltip-${node.id}` : undefined}
        className={[
          'relative flex items-center justify-center w-10 h-10 rounded-full',
          colors.bg,
          'border-2',
          isSelected ? colors.border : 'border-white/20',
          'text-white text-xs font-bold shadow-lg',
          'transition-all duration-200',
          isSelected
            ? 'scale-125 ring-2 ring-offset-1 ring-offset-slate-900 ring-current'
            : 'hover:scale-110',
        ].join(' ')}
      >
        {node.aqi}
      </button>
    </div>
  );
}

export default NodePin;
