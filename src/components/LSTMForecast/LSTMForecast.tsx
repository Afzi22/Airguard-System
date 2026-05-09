import type { ForecastDataPoint } from '../../types/index';
import { ForecastChart } from './ForecastChart';
import { SkeletonLoader } from '../shared/SkeletonLoader';
import { GlassCard } from '../shared/GlassCard';
import { AlertTriangle } from 'lucide-react';

interface LSTMForecastProps {
  forecastData: ForecastDataPoint[];
  isLoading: boolean;
  error: string | null;
}

export function LSTMForecast({ forecastData, isLoading, error }: LSTMForecastProps) {
  return (
    <GlassCard className="p-5 flex flex-col gap-4">
      {/* Card title */}
      <h2 className="text-lg font-semibold text-white">
        48-Hour AQI Forecast{' '}
        <span className="text-slate-400 text-sm font-normal">(LSTM Model)</span>
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
          <p className="text-slate-300 text-sm">{error}</p>
        </div>
      ) : (
        <ForecastChart data={forecastData} />
      )}
    </GlassCard>
  );
}

export default LSTMForecast;
