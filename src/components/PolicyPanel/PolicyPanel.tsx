import type { AlertCard as AlertCardType } from '../../types/index';
import { AlertCard } from './AlertCard';
import { SkeletonLoader } from '../shared/SkeletonLoader';
import { GlassCard } from '../shared/GlassCard';
import { CheckCircle } from 'lucide-react';

interface PolicyPanelProps {
  alerts: AlertCardType[];
  isLoading: boolean;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <CheckCircle size={32} className="text-emerald-400" />
      </div>
      <div>
        <p className="text-white text-sm font-medium mb-1">Semua Aman</p>
        <p className="text-slate-400 text-xs leading-relaxed max-w-[220px]">
          Kualitas udara saat ini stabil. Tidak ada rekomendasi kebijakan darurat.
        </p>
      </div>
    </div>
  );
}

export function PolicyPanel({ alerts, isLoading }: PolicyPanelProps) {
  return (
    <GlassCard className="p-5 flex flex-col gap-4">
      {/* Panel title */}
      <h2 className="text-lg font-semibold text-white">Automated Policy Recommendations</h2>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <SkeletonLoader height="h-24" />
          <SkeletonLoader height="h-24" />
          <SkeletonLoader height="h-24" />
        </div>
      ) : alerts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3" role="list" aria-label="Policy alerts">
          {alerts.map((alert) => (
            <div key={alert.id} role="listitem">
              <AlertCard alert={alert} />
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

export default PolicyPanel;
