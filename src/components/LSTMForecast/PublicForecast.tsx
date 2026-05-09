import type { ForecastDataPoint } from '../../types';
import { ForecastChart } from './ForecastChart';
import { SkeletonLoader } from '../shared/SkeletonLoader';
import { GlassCard } from '../shared/GlassCard';
import { AlertTriangle } from 'lucide-react';

interface PublicForecastProps {
  forecastData: ForecastDataPoint[];
  isLoading: boolean;
  error: string | null;
}

export function PublicForecast({ forecastData, isLoading, error }: PublicForecastProps) {
  return (
    <GlassCard className="p-5 flex flex-col gap-4">
      {/* Card title */}
      <h2 className="text-lg font-semibold text-white">
        Prakiraan Kualitas Udara 48 Jam
      </h2>

      {/* Content area */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <SkeletonLoader height="h-[220px]" />
          <SkeletonLoader height="h-4" width="w-3/4" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-[220px] gap-3 text-center">
          <AlertTriangle size={32} className="text-rose-400" />
          <p className="text-slate-300 text-sm">Gagal memuat data. Silakan coba lagi nanti.</p>
        </div>
      ) : (
        <ForecastChart
          data={forecastData}
          hazardLabel="Batas Tidak Sehat (AQI > 100)"
        />
      )}
    </GlassCard>
  );
}

export default PublicForecast;
