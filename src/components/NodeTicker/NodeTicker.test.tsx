import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NodeTicker } from './NodeTicker'
import { IOT_NODES } from '../../data/mockData'

describe('NodeTicker', () => {
  it('renders all nodes from the list', () => {
    render(
      <NodeTicker nodes={IOT_NODES} selectedNodeId={null} onNodeSelect={vi.fn()} />
    )
    for (const node of IOT_NODES) {
      expect(screen.getByText(node.id)).toBeInTheDocument()
    }
  })

  it('renders a list with accessible label', () => {
    render(
      <NodeTicker nodes={IOT_NODES} selectedNodeId={null} onNodeSelect={vi.fn()} />
    )
    expect(screen.getByRole('list', { name: 'IoT node status list' })).toBeInTheDocument()
  })

  it('renders correct number of list items', () => {
    render(
      <NodeTicker nodes={IOT_NODES} selectedNodeId={null} onNodeSelect={vi.fn()} />
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(IOT_NODES.length)
  })

  it('renders empty list when nodes array is empty', () => {
    render(
      <NodeTicker nodes={[]} selectedNodeId={null} onNodeSelect={vi.fn()} />
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
