import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PolicyPanel } from './PolicyPanel'
import { POLICY_ALERTS } from '../../data/mockData'

describe('PolicyPanel', () => {
  it('shows skeleton loaders when isLoading is true', () => {
    render(<PolicyPanel alerts={[]} isLoading={true} />)
    const skeletons = screen.getAllByRole('status')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('shows empty state when alerts array is empty and not loading', () => {
    render(<PolicyPanel alerts={[]} isLoading={false} />)
    expect(screen.getByText('Semua Aman')).toBeInTheDocument()
  })

  it('shows empty state description when no alerts', () => {
    render(<PolicyPanel alerts={[]} isLoading={false} />)
    expect(
      screen.getByText(/Kualitas udara saat ini stabil/i)
    ).toBeInTheDocument()
  })

  it('renders alerts list when alerts are provided', () => {
    render(<PolicyPanel alerts={POLICY_ALERTS} isLoading={false} />)
    expect(screen.getByRole('list', { name: 'Policy alerts' })).toBeInTheDocument()
  })

  it('renders correct number of alert items', () => {
    render(<PolicyPanel alerts={POLICY_ALERTS} isLoading={false} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(POLICY_ALERTS.length)
  })

  it('renders alert messages', () => {
    render(<PolicyPanel alerts={POLICY_ALERTS} isLoading={false} />)
    for (const alert of POLICY_ALERTS) {
      expect(screen.getByText(alert.message)).toBeInTheDocument()
    }
  })

  it('renders the panel title', () => {
    render(<PolicyPanel alerts={[]} isLoading={false} />)
    expect(screen.getByText('Automated Policy Recommendations')).toBeInTheDocument()
  })

  it('does not show empty state when alerts are provided', () => {
    render(<PolicyPanel alerts={POLICY_ALERTS} isLoading={false} />)
    expect(screen.queryByText('Semua Aman')).not.toBeInTheDocument()
  })
})
