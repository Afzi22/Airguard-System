import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NodeCard } from './NodeCard'
import type { IoTNode } from '../../types/index'

const mockNode: IoTNode = {
  id: 'NODE-001',
  name: 'Stasiun Pusat',
  coordinates: { lat: -6.1781, lng: 106.6297 },
  aqi: 42,
  pm25: 12.3,
  status: 'Active',
  lastUpdated: '2025-01-01T10:00:00Z',
}

describe('NodeCard', () => {
  it('renders node ID', () => {
    render(<NodeCard node={mockNode} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('NODE-001')).toBeInTheDocument()
  })

  it('renders PM2.5 value', () => {
    render(<NodeCard node={mockNode} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('12.3 µg/m³')).toBeInTheDocument()
  })

  it('renders node status', () => {
    render(<NodeCard node={mockNode} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('has accessible aria-label with node data', () => {
    render(<NodeCard node={mockNode} isSelected={false} onClick={vi.fn()} />)
    expect(
      screen.getByLabelText('Node NODE-001: PM2.5 12.3 µg/m³, status Active')
    ).toBeInTheDocument()
  })

  it('sets aria-pressed=true when selected', () => {
    render(<NodeCard node={mockNode} isSelected={true} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('sets aria-pressed=false when not selected', () => {
    render(<NodeCard node={mockNode} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onClick with node id when clicked', async () => {
    const onClick = vi.fn()
    render(<NodeCard node={mockNode} isSelected={false} onClick={onClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledWith('NODE-001')
  })

  it('renders Warning status with amber color class', () => {
    const warningNode: IoTNode = { ...mockNode, status: 'Warning' }
    render(<NodeCard node={warningNode} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('renders Offline status', () => {
    const offlineNode: IoTNode = { ...mockNode, status: 'Offline' }
    render(<NodeCard node={offlineNode} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('Offline')).toBeInTheDocument()
  })
})
