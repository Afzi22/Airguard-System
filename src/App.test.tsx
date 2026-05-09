import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { getNodesByCity, getForecastByCity, getAlertsByCity, getPublicAdvicesByCity } from './data/mockData'

// Validates: Requirements 10.6, 10.8

// Mock API services so tests don't make real network calls
vi.mock('./api/nodeService', () => ({
  fetchNodes: (cityId: string) => Promise.resolve(getNodesByCity(cityId)),
}))
vi.mock('./api/forecastService', () => ({
  fetchForecast: (cityId: string) => Promise.resolve(getForecastByCity(cityId)),
}))
vi.mock('./api/policyService', () => ({
  fetchAlerts: (cityId: string) => Promise.resolve(getAlertsByCity(cityId)),
  fetchPublicAdvices: (cityId: string) => Promise.resolve(getPublicAdvicesByCity(cityId)),
}))

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

describe('App routing', () => {
  it('renders PublicDashboard on initial load (no login required)', () => {
    render(<App />)
    // PublicDashboard shows health advice panel title immediately
    expect(screen.getByText('Saran Kesehatan Hari Ini')).toBeInTheDocument()
  })

  it('renders Admin Login page when Admin button is clicked', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /admin login/i }))
    // Login form should appear
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument()
  })

  it('renders Admin Dashboard after admin login', () => {
    render(<App />)

    // Go to admin login
    fireEvent.click(screen.getByRole('button', { name: /admin login/i }))

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'admin123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }))

    // Admin Dashboard shows the Export Report button
    expect(
      screen.getByRole('button', { name: /export report/i })
    ).toBeInTheDocument()
  })

  it('returns to PublicDashboard after logout from Admin Dashboard', () => {
    render(<App />)

    // Go to admin login and log in
    fireEvent.click(screen.getByRole('button', { name: /admin login/i }))
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'admin123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }))

    // Confirm we're on the Admin Dashboard, then log out
    expect(
      screen.getByRole('button', { name: /export report/i })
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))

    // Should return to PublicDashboard
    expect(screen.getByText('Saran Kesehatan Hari Ini')).toBeInTheDocument()
  })
})
