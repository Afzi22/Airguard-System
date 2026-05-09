import type { PublicHealthAdvice } from '../../types';
import { HealthAdviceCard } from './HealthAdviceCard';
import { SkeletonLoader } from '../shared/SkeletonLoader';
import { GlassCard } from '../shared/GlassCard';
import { Leaf } from 'lucide-react';

interface PublicPolicyPanelProps {
  advices: PublicHealthAdvice[];
  isLoading: boolean;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <Leaf size={32} className="text-emerald-400" />
      </div>
      <div>
        <p className="text-slate-400 text-sm leading-relaxed max-w-[260px]">
          Udara hari ini dalam kondisi baik. Tidak ada saran khusus saat ini. 🌿
        </p>
      </div>
    </div>
  );
}

export function PublicPolicyPanel({ advices, isLoading }: PublicPolicyPanelProps) {
  return (
    <GlassCard className="p-5 flex flex-col gap-4">
      {/* Panel title */}
      <h2 className="text-lg font-semibold text-white">Saran Kesehatan Hari Ini</h2>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <SkeletonLoader height="h-24" />
          <SkeletonLoader height="h-24" />
          <SkeletonLoader height="h-24" />
        </div>
      ) : advices.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3" role="list" aria-label="Health advice list">
          {advices.map((advice) => (
            <div key={advice.id} role="listitem">
              <HealthAdviceCard advice={advice} />
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

export default PublicPolicyPanel;
