import type { IoTNode } from '../../types/index';
import { getStatusColor } from '../../utils/aqiUtils';

interface NodeCardProps {
  node: IoTNode;
  isSelected: boolean;
  onClick: (nodeId: string) => void;
}

const statusColorMap: Record<string, { dot: string; border: string; text: string }> = {
  emerald: { dot: 'bg-emerald-400', border: 'border-emerald-400/60', text: 'text-emerald-400' },
  amber:   { dot: 'bg-amber-400',   border: 'border-amber-400/60',   text: 'text-amber-400'   },
  rose:    { dot: 'bg-rose-400',    border: 'border-rose-400/60',    text: 'text-rose-400'    },
};

export function NodeCard({ node, isSelected, onClick }: NodeCardProps) {
  const color = getStatusColor(node.status);
  const colors = statusColorMap[color];

  return (
    <button
      type="button"
      onClick={() => onClick(node.id)}
      aria-label={`Node ${node.id}: PM2.5 ${node.pm25} µg/m³, status ${node.status}`}
      aria-pressed={isSelected}
      className={`
        flex flex-col gap-1 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border transition-all duration-200 text-left w-full sm:w-auto sm:shrink-0
        bg-slate-800/60 backdrop-blur-sm
        ${isSelected
          ? `${colors.border} shadow-lg ring-1 ring-current`
          : 'border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-700/40'
        }
      `}
    >
      {/* Node ID */}
      <span className="text-white text-xs font-semibold font-mono">{node.id}</span>

      {/* PM2.5 value */}
      <span className="text-slate-300 text-xs">
        PM2.5: <span className="text-white font-medium">{node.pm25} µg/m³</span>
      </span>

      {/* Status with color dot */}
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
        <span className={`text-xs font-medium ${colors.text}`}>{node.status}</span>
      </div>
    </button>
  );
}

export default NodeCard;
