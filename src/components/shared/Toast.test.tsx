import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders nothing when isVisible is false', () => {
    const { container } = render(
      <Toast message="Test message" isVisible={false} onClose={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders the message when isVisible is true', () => {
    render(<Toast message="Air quality alert!" isVisible={true} onClose={vi.fn()} />)
    expect(screen.getByText('Air quality alert!')).toBeInTheDocument()
  })

  it('has role="alert" when visible', () => {
    render(<Toast message="Alert" isVisible={true} onClose={vi.fn()} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<Toast message="Alert" isVisible={true} onClose={onClose} />)
    await userEvent.click(screen.getByLabelText('Close notification'))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
