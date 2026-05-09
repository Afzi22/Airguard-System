import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import type { ForecastDataPoint } from '../../types/index';

interface ForecastChartProps {
  data: ForecastDataPoint[];
  hazardLabel?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="text-white font-semibold">AQI: {payload[0].value}</p>
    </div>
  );
}

export function ForecastChart({ data, hazardLabel = 'Hazard Threshold (AQI > 100)' }: ForecastChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis
          dataKey="hour"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={{ stroke: '#334155' }}
          tickLine={false}
          interval={3}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 'auto']}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={100}
          stroke="#fb7185"
          strokeDasharray="6 3"
          label={{
            value: hazardLabel,
            fill: '#fb7185',
            fontSize: 10,
            position: 'insideTopRight',
          }}
        />
        <Area
          type="monotone"
          dataKey="aqi"
          stroke="#34d399"
          strokeWidth={2}
          fill="url(#aqiGradient)"
          dot={false}
          activeDot={{ r: 4, fill: '#34d399', stroke: '#0f172a', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ForecastChart;
