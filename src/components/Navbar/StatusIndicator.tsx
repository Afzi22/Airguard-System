interface StatusIndicatorProps {
  label: string;
  status: string;
  color: 'emerald' | 'blue' | 'amber' | 'rose';
}

const colorMap: Record<StatusIndicatorProps['color'], string> = {
  emerald: 'bg-emerald-400',
  blue: 'bg-blue-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
};

export function StatusIndicator({ label, status, color }: StatusIndicatorProps) {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`${label}: ${status}`}
    >
      <span className={`w-2 h-2 rounded-full ${colorMap[color]} animate-pulse`} />
      <span className="text-slate-300 text-xs">
        <span className="text-slate-400">{label}:</span>{' '}
        <span className="text-white font-medium">{status}</span>
      </span>
    </div>
  );
}

export default StatusIndicator;
