import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { PublicDashboard } from './PublicDashboard'
import { getNodesByCity, getForecastByCity, getPublicAdvicesByCity } from '../../data/mockData'

// Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 12.2, 12.4

// Mock Recharts — ResponsiveContainer requires a real DOM size which jsdom doesn't provide.
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

// Mock API services to return mock data synchronously (no network calls in tests)
vi.mock('../../api/nodeService', () => ({
  fetchNodes: (cityId: string) => Promise.resolve(getNodesByCity(cityId)),
}))
vi.mock('../../api/forecastService', () => ({
  fetchForecast: (cityId: string) => Promise.resolve(getForecastByCity(cityId)),
}))
vi.mock('../../api/policyService', () => ({
  fetchPublicAdvices: (cityId: string) => Promise.resolve(getPublicAdvicesByCity(cityId)),
}))

describe('PublicDashboard', () => {
  it('renders PublicNavbar with a Logout button', () => {
    render(<PublicDashboard onLogout={vi.fn()} />)
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('renders GISMap with a heatmap toggle after data loads', async () => {
    render(<PublicDashboard onLogout={vi.fn()} />)
    await waitFor(() =>
      expect(screen.getByRole('switch', { name: /heatmap/i })).toBeInTheDocument()
    )
  })

  it('renders NodeTicker with node cards after data loads', async () => {
    render(<PublicDashboard onLogout={vi.fn()} />)
    // TNG-001 is the first node for Tangerang (default city)
    await waitFor(() =>
      expect(screen.getByText('TNG-001')).toBeInTheDocument()
    )
  })

  it('renders PublicForecast with its title', () => {
    render(<PublicDashboard onLogout={vi.fn()} />)
    expect(
      screen.getByText('Prakiraan Kualitas Udara 48 Jam')
    ).toBeInTheDocument()
  })

  it('renders PublicPolicyPanel with its title', () => {
    render(<PublicDashboard onLogout={vi.fn()} />)
    expect(screen.getByText('Saran Kesehatan Hari Ini')).toBeInTheDocument()
  })

  it('displays the title "Saran Kesehatan Hari Ini"', () => {
    render(<PublicDashboard onLogout={vi.fn()} />)
    expect(screen.getByText('Saran Kesehatan Hari Ini')).toBeInTheDocument()
  })

  it('displays the title "Prakiraan Kualitas Udara 48 Jam"', () => {
    render(<PublicDashboard onLogout={vi.fn()} />)
    expect(
      screen.getByText('Prakiraan Kualitas Udara 48 Jam')
    ).toBeInTheDocument()
  })
})
