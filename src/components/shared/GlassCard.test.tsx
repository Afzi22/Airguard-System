import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GlassCard } from './GlassCard'

describe('GlassCard', () => {
  it('renders children', () => {
    render(<GlassCard><span>Hello World</span></GlassCard>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('applies additional className', () => {
    const { container } = render(<GlassCard className="p-5">Content</GlassCard>)
    expect(container.firstChild).toHaveClass('p-5')
  })

  it('renders multiple children', () => {
    render(
      <GlassCard>
        <span>Child 1</span>
        <span>Child 2</span>
      </GlassCard>
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })
})
