import { describe, it, expect } from 'vitest'
import { getAQILevel, getAQIColor, getStatusColor, getSeverityColor, getAQIPublicLabel, getNodeStatusPublicLabel } from './aqiUtils'
import { CITIES, IOT_NODES, FORECAST_DATA, POLICY_ALERTS } from '../data/mockData'

// ─── getAQILevel ─────────────────────────────────────────────────────────────

describe('getAQILevel', () => {
  it('returns "good" for AQI ≤ 50 (aqi=42)', () => {
    expect(getAQILevel(42)).toBe('good')
  })

  it('returns "good" for AQI exactly 50 (boundary)', () => {
    expect(getAQILevel(50)).toBe('good')
  })

  it('returns "moderate" for AQI 51–100 (aqi=87)', () => {
    expect(getAQILevel(87)).toBe('moderate')
  })

  it('returns "moderate" for AQI exactly 100 (boundary)', () => {
    expect(getAQILevel(100)).toBe('moderate')
  })

  it('returns "unhealthy" for AQI > 100 (aqi=134)', () => {
    expect(getAQILevel(134)).toBe('unhealthy')
  })

  it('returns "unhealthy" for AQI exactly 101 (boundary)', () => {
    expect(getAQILevel(101)).toBe('unhealthy')
  })
})

// ─── getAQIColor ──────────────────────────────────────────────────────────────

describe('getAQIColor', () => {
  it('returns "emerald" for AQI ≤ 50 (aqi=42)', () => {
    expect(getAQIColor(42)).toBe('emerald')
  })

  it('returns "emerald" for AQI exactly 50 (boundary)', () => {
    expect(getAQIColor(50)).toBe('emerald')
  })

  it('returns "amber" for AQI 51–100 (aqi=87)', () => {
    expect(getAQIColor(87)).toBe('amber')
  })

  it('returns "amber" for AQI exactly 100 (boundary)', () => {
    expect(getAQIColor(100)).toBe('amber')
  })

  it('returns "rose" for AQI > 100 (aqi=134)', () => {
    expect(getAQIColor(134)).toBe('rose')
  })

  it('returns "rose" for AQI exactly 101 (boundary)', () => {
    expect(getAQIColor(101)).toBe('rose')
  })
})

// ─── getStatusColor ───────────────────────────────────────────────────────────

describe('getStatusColor', () => {
  it('returns "emerald" for status "Active"', () => {
    expect(getStatusColor('Active')).toBe('emerald')
  })

  it('returns "amber" for status "Warning"', () => {
    expect(getStatusColor('Warning')).toBe('amber')
  })

  it('returns "rose" for status "Offline"', () => {
    expect(getStatusColor('Offline')).toBe('rose')
  })
})

// ─── getSeverityColor ─────────────────────────────────────────────────────────

describe('getSeverityColor', () => {
  it('returns "rose" for severity "Critical"', () => {
    expect(getSeverityColor('Critical')).toBe('rose')
  })

  it('returns "amber" for severity "Warning"', () => {
    expect(getSeverityColor('Warning')).toBe('amber')
  })

  it('returns "emerald" for severity "Insight"', () => {
    expect(getSeverityColor('Insight')).toBe('emerald')
  })
})

// ─── mockData structure ───────────────────────────────────────────────────────

describe('mockData structure', () => {
  it('CITIES has exactly 7 items', () => {
    expect(CITIES).toHaveLength(7)
  })

  it('each CITY has id, name, and coordinates with lat/lng', () => {
    for (const city of CITIES) {
      expect(city).toHaveProperty('id')
      expect(city).toHaveProperty('name')
      expect(city.coordinates).toHaveProperty('lat')
      expect(city.coordinates).toHaveProperty('lng')
    }
  })

  it('IOT_NODES has at least 3 items', () => {
    expect(IOT_NODES.length).toBeGreaterThanOrEqual(3)
  })

  it('IOT_NODES covers all 3 AQI ranges (good, moderate, unhealthy)', () => {
    const levels = IOT_NODES.map((n) => getAQILevel(n.aqi))
    expect(levels).toContain('good')
    expect(levels).toContain('moderate')
    expect(levels).toContain('unhealthy')
  })

  it('each IOT_NODE has required fields', () => {
    for (const node of IOT_NODES) {
      expect(node).toHaveProperty('id')
      expect(node).toHaveProperty('name')
      expect(node).toHaveProperty('aqi')
      expect(node).toHaveProperty('pm25')
      expect(node).toHaveProperty('status')
      expect(node).toHaveProperty('lastUpdated')
      expect(node.coordinates).toHaveProperty('lat')
      expect(node.coordinates).toHaveProperty('lng')
    }
  })

  it('FORECAST_DATA has at least 24 items (48-hour forecast)', () => {
    expect(FORECAST_DATA.length).toBeGreaterThanOrEqual(24)
  })

  it('each FORECAST_DATA point has hour, aqi, and timestamp', () => {
    for (const point of FORECAST_DATA) {
      expect(point).toHaveProperty('hour')
      expect(point).toHaveProperty('aqi')
      expect(point).toHaveProperty('timestamp')
      expect(point.hour).toMatch(/^\d{2}:\d{2}$/)
    }
  })

  it('POLICY_ALERTS has exactly 3 items', () => {
    expect(POLICY_ALERTS).toHaveLength(3)
  })

  it('POLICY_ALERTS covers Critical, Warning, and Insight severities', () => {
    const severities = POLICY_ALERTS.map((a) => a.severity)
    expect(severities).toContain('Critical')
    expect(severities).toContain('Warning')
    expect(severities).toContain('Insight')
  })

  it('each POLICY_ALERT has required fields', () => {
    for (const alert of POLICY_ALERTS) {
      expect(alert).toHaveProperty('id')
      expect(alert).toHaveProperty('severity')
      expect(alert).toHaveProperty('message')
      expect(alert).toHaveProperty('timestamp')
    }
  })
})

// ─── getAQIPublicLabel ────────────────────────────────────────────────────────

describe('getAQIPublicLabel', () => {
  it('returns "Udara Baik 🟢" for AQI ≤ 50 (aqi=42)', () => {
    expect(getAQIPublicLabel(42)).toBe('Udara Baik 🟢')
  })

  it('returns "Udara Baik 🟢" for AQI exactly 50 (boundary)', () => {
    expect(getAQIPublicLabel(50)).toBe('Udara Baik 🟢')
  })

  it('returns "Sedang 🟡" for AQI 51–100 (aqi=75)', () => {
    expect(getAQIPublicLabel(75)).toBe('Sedang 🟡')
  })

  it('returns "Sedang 🟡" for AQI exactly 100 (boundary)', () => {
    expect(getAQIPublicLabel(100)).toBe('Sedang 🟡')
  })

  it('returns "Tidak Sehat 🔴" for AQI > 100 (aqi=134)', () => {
    expect(getAQIPublicLabel(134)).toBe('Tidak Sehat 🔴')
  })

  it('returns "Tidak Sehat 🔴" for AQI exactly 101 (boundary)', () => {
    expect(getAQIPublicLabel(101)).toBe('Tidak Sehat 🔴')
  })
})

// ─── getNodeStatusPublicLabel ─────────────────────────────────────────────────

describe('getNodeStatusPublicLabel', () => {
  it('returns "Aktif" for status "Active"', () => {
    expect(getNodeStatusPublicLabel('Active')).toBe('Aktif')
  })

  it('returns "Peringatan" for status "Warning"', () => {
    expect(getNodeStatusPublicLabel('Warning')).toBe('Peringatan')
  })

  it('returns "Tidak Aktif" for status "Offline"', () => {
    expect(getNodeStatusPublicLabel('Offline')).toBe('Tidak Aktif')
  })
})
