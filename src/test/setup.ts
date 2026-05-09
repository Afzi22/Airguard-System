import '@testing-library/jest-dom'
import { configureAxe } from 'jest-axe'
import { vi } from 'vitest'

// Configure jest-axe with WCAG AA rules
configureAxe({
  rules: {
    // Enforce WCAG AA color contrast
    'color-contrast': { enabled: true },
  },
})

// ── Leaflet mock ─────────────────────────────────────────────────────────────
// Leaflet requires a real browser DOM with canvas support which jsdom doesn't
// provide. We mock the entire module so tests that render GISMap don't throw.
vi.mock('leaflet', () => {
  const noop = () => ({})
  const chainable: Record<string, unknown> = {}
  const handler = { get: (_: unknown, prop: string) => chainable[prop] ?? (() => new Proxy({}, handler)) }
  const proxy = new Proxy({}, handler)

  return {
    default: {
      map: () => proxy,
      tileLayer: () => proxy,
      marker: () => proxy,
      divIcon: noop,
      latLngBounds: () => ({
        pad: () => ({ getWest: () => 0, getEast: () => 1, getNorth: () => 1, getSouth: () => 0 }),
        getWest: () => 0, getEast: () => 1, getNorth: () => 1, getSouth: () => 0,
      }),
      imageOverlay: () => proxy,
    },
  }
})
