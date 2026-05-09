import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PublicNavbar } from './PublicNavbar'

// Validates: Requirements 11.2

describe('PublicNavbar', () => {
  const defaultProps = {
    activeCity: 'tangerang',
    onCityChange: vi.fn(),
    onGoToAdminLogin: vi.fn(),
  }

  it('displays the AirGuard System logo', () => {
    render(<PublicNavbar {...defaultProps} />)
    const logoSpan = screen.getByText((_, element) => {
      return element?.tagName === 'SPAN' && (element.textContent ?? '').replace(/\s+/g, '') === 'AirGuardSystem'
    })
    expect(logoSpan).toBeInTheDocument()
  })

  it('displays the CitySelector dropdown', () => {
    render(<PublicNavbar {...defaultProps} />)
    expect(screen.getByRole('button', { name: /select city/i })).toBeInTheDocument()
  })

  it('displays the Admin login button', () => {
    render(<PublicNavbar {...defaultProps} />)
    expect(screen.getByRole('button', { name: /admin login/i })).toBeInTheDocument()
  })

  it('does NOT display the Export Report button', () => {
    render(<PublicNavbar {...defaultProps} />)
    expect(screen.queryByText(/export report/i)).not.toBeInTheDocument()
  })

  it('does NOT display AI Engine status indicator', () => {
    render(<PublicNavbar {...defaultProps} />)
    expect(screen.queryByText(/ai engine/i)).not.toBeInTheDocument()
  })

  it('does NOT display IoT Nodes status indicator', () => {
    render(<PublicNavbar {...defaultProps} />)
    expect(screen.queryByText(/iot nodes/i)).not.toBeInTheDocument()
  })
})
