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
// NOTE: LeafletMap uses dynamic `import('leaflet').then((L) => L.map(...))`.
// Vitest resolves that to named exports, so we must export each method both
// as a named export AND on the `default` object.
vi.mock('leaflet', () => {
  const noop = () => ({})
  const handler: ProxyHandler<object> = { get: (_: unknown, prop: string | symbol) => () => new Proxy({}, handler) }
  const proxy = new Proxy({}, handler)

  const latLngBounds = () => ({
    pad: () => latLngBounds(),
    getWest: () => 0,
    getEast: () => 1,
    getNorth: () => 1,
    getSouth: () => 0,
  })

  const leafletMock = {
    map: () => proxy,
    tileLayer: () => proxy,
    marker: () => proxy,
    divIcon: noop,
    latLngBounds,
    imageOverlay: () => proxy,
  }

  return {
    // Named exports (used by dynamic import: `import('leaflet').then(L => L.map(...))`)
    ...leafletMock,
    // Default export (used by static import: `import L from 'leaflet'`)
    default: leafletMock,
  }
})
