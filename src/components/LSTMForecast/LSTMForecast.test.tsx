import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LSTMForecast } from './LSTMForecast'
import { FORECAST_DATA } from '../../data/mockData'

// Mock Recharts — ResponsiveContainer requires a real DOM size which jsdom doesn't provide.
// ForecastChart is also mocked to avoid SVG/defs rendering warnings in jsdom.
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recharts-container">{children}</div>
  ),
  AreaChart: () => <div data-testid="area-chart" />,
  Area: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ReferenceLine: () => null,
}))

describe('LSTMForecast', () => {
  it('shows skeleton loaders when isLoading is true', () => {
    render(
      <LSTMForecast forecastData={[]} isLoading={true} error={null} />
    )
    // SkeletonLoader renders with role="status"
    const skeletons = screen.getAllByRole('status')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('shows error message when error prop is set', () => {
    render(
      <LSTMForecast
        forecastData={[]}
        isLoading={false}
        error="Failed to load forecast data"
      />
    )
    expect(screen.getByText('Failed to load forecast data')).toBeInTheDocument()
  })

  it('does not show skeleton when not loading', () => {
    render(
      <LSTMForecast forecastData={FORECAST_DATA} isLoading={false} error={null} />
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('does not show error when error is null', () => {
    render(
      <LSTMForecast forecastData={FORECAST_DATA} isLoading={false} error={null} />
    )
    expect(screen.queryByText(/failed/i)).not.toBeInTheDocument()
  })

  it('renders the card title', () => {
    render(
      <LSTMForecast forecastData={FORECAST_DATA} isLoading={false} error={null} />
    )
    expect(screen.getByText('48-Hour AQI Forecast')).toBeInTheDocument()
  })

  it('renders chart when data is provided and not loading', () => {
    render(
      <LSTMForecast forecastData={FORECAST_DATA} isLoading={false} error={null} />
    )
    expect(screen.getByTestId('recharts-container')).toBeInTheDocument()
  })
})
