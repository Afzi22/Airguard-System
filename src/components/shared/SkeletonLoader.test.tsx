import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkeletonLoader } from './SkeletonLoader'

describe('SkeletonLoader', () => {
  it('renders with role="status"', () => {
    render(<SkeletonLoader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has accessible label "Loading..."', () => {
    render(<SkeletonLoader />)
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument()
  })

  it('applies custom height class', () => {
    render(<SkeletonLoader height="h-24" />)
    expect(screen.getByRole('status')).toHaveClass('h-24')
  })

  it('applies custom width class', () => {
    render(<SkeletonLoader width="w-1/2" />)
    expect(screen.getByRole('status')).toHaveClass('w-1/2')
  })

  it('defaults to w-full and h-4', () => {
    render(<SkeletonLoader />)
    const el = screen.getByRole('status')
    expect(el).toHaveClass('w-full')
    expect(el).toHaveClass('h-4')
  })
})
