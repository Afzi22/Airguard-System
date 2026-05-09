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
  it('renders LoginPage on initial load', () => {
    render(<App />)

    // Login button and demo hint confirm LoginPage is shown
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument()
    expect(
      screen.getByText('Demo: admin / admin123 atau user / user123')
    ).toBeInTheDocument()
  })

  it('renders Admin Dashboard after admin login', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'admin123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }))

    // Admin Dashboard (Command Center) shows the Export Report button
    expect(
      screen.getByRole('button', { name: /export report/i })
    ).toBeInTheDocument()
  })

  it('renders PublicDashboard after public login', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'user' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'user123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }))

    // PublicDashboard shows the health advice panel title
    expect(screen.getByText('Saran Kesehatan Hari Ini')).toBeInTheDocument()
  })

  it('returns to LoginPage after logout from Admin Dashboard', () => {
    render(<App />)

    // Log in as admin
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'admin123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }))

    // Confirm we're on the Dashboard, then log out
    expect(
      screen.getByRole('button', { name: /export report/i })
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))

    // LoginPage should be visible again
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument()
  })
})
