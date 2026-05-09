import { AlertTriangle, Info } from 'lucide-react';
import type { PublicHealthAdvice } from '../../types';
import { getSeverityColor } from '../../utils/aqiUtils';

interface HealthAdviceCardProps {
  advice: PublicHealthAdvice;
}

const severityColorMap: Record<string, { border: string; accent: string; badge: string; icon: string }> = {
  rose: {
    border: 'border-rose-500/30',
    accent: 'bg-rose-500/10',
    badge: 'bg-rose-500/20 text-rose-400',
    icon: 'text-rose-400',
  },
  amber: {
    border: 'border-amber-500/30',
    accent: 'bg-amber-500/10',
    badge: 'bg-amber-500/20 text-amber-400',
    icon: 'text-amber-400',
  },
  emerald: {
    border: 'border-emerald-500/30',
    accent: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/20 text-emerald-400',
    icon: 'text-emerald-400',
  },
};

function formatTimestamp(ts: string): string {
  try {
    return new Date(ts).toLocaleString('id-ID', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return ts;
  }
}

export function HealthAdviceCard({ advice }: HealthAdviceCardProps) {
  const color = getSeverityColor(advice.severity);
  const colors = severityColorMap[color];
  const isInsight = advice.severity === 'Insight';

  return (
    <div
      className={`flex gap-3 p-4 rounded-xl border ${colors.border} ${colors.accent}`}
      role="article"
      aria-label={`${advice.severity} health advice`}
    >
      {/* Icon */}
      <div className={`shrink-0 mt-0.5 ${colors.icon}`}>
        {isInsight ? <Info size={18} /> : <AlertTriangle size={18} />}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 min-w-0">
        {/* Severity badge */}
        <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
          {advice.severity}
        </span>

        {/* Message */}
        <p className="text-slate-300 text-sm leading-relaxed">{advice.message}</p>

        {/* Timestamp */}
        <p className="text-slate-500 text-xs">{formatTimestamp(advice.timestamp)}</p>
      </div>
    </div>
  );
}

export default HealthAdviceCard;
