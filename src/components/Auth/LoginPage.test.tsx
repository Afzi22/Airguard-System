import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('renders the login form with all required elements', () => {
    render(<LoginPage onLogin={vi.fn()} />)

    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument()
    expect(screen.getByText('Demo: admin / admin123')).toBeInTheDocument()
  })

  it('calls onLogin with ("admin", "admin") for valid admin credentials', () => {
    const onLogin = vi.fn()
    render(<LoginPage onLogin={onLogin} />)

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'admin123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }))

    expect(onLogin).toHaveBeenCalledOnce()
    expect(onLogin).toHaveBeenCalledWith('admin', 'admin')
  })

  it('calls onLogin with ("public", "user") for valid public credentials', () => {
    const onLogin = vi.fn()
    render(<LoginPage onLogin={onLogin} />)

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'user' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'user123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }))

    expect(onLogin).toHaveBeenCalledOnce()
    expect(onLogin).toHaveBeenCalledWith('public', 'user')
  })

  it('shows error message and does not call onLogin for invalid credentials', () => {
    const onLogin = vi.fn()
    render(<LoginPage onLogin={onLogin} />)

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'wronguser' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpass' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Username atau password salah. Silakan coba lagi.'
    )
    expect(onLogin).not.toHaveBeenCalled()
  })

  it('displays the demo credentials hint', () => {
    render(<LoginPage onLogin={vi.fn()} />)
    expect(screen.getByText('Demo: admin / admin123')).toBeInTheDocument()
  })

  it('calls onCancel when back button is clicked', () => {
    const onCancel = vi.fn()
    render(<LoginPage onLogin={vi.fn()} onCancel={onCancel} />)
    fireEvent.click(screen.getByRole('button', { name: /kembali ke tampilan publik/i }))
    expect(onCancel).toHaveBeenCalledOnce()
  })
})
