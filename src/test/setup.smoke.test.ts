import { describe, it, expect } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Setup smoke test', () => {
  it('jest-axe is importable and configurable', () => {
    expect(typeof axe).toBe('function')
    expect(typeof toHaveNoViolations).toBe('object')
  })

  it('jsdom environment is active', () => {
    expect(typeof document).toBe('object')
    expect(typeof window).toBe('object')
  })
})
