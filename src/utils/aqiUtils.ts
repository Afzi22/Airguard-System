import type { AQILevel, NodeStatus, AlertSeverity } from '../types/index';

export function getAQILevel(aqi: number): AQILevel {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  return 'unhealthy';
}

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return 'emerald';   // #10b981
  if (aqi <= 100) return 'amber';    // #f59e0b
  return 'rose';                      // #f43f5e
}

export function getStatusColor(status: NodeStatus): string {
  switch (status) {
    case 'Active': return 'emerald';
    case 'Warning': return 'amber';
    case 'Offline': return 'rose';
  }
}

export function getSeverityColor(severity: AlertSeverity): string {
  switch (severity) {
    case 'Critical': return 'rose';
    case 'Warning': return 'amber';
    case 'Insight': return 'emerald';
  }
}

export function getAQIPublicLabel(aqi: number): string {
  if (aqi <= 50) return 'Udara Baik 🟢';
  if (aqi <= 100) return 'Sedang 🟡';
  return 'Tidak Sehat 🔴';
}

export function getNodeStatusPublicLabel(status: NodeStatus): string {
  switch (status) {
    case 'Active': return 'Aktif';
    case 'Warning': return 'Peringatan';
    case 'Offline': return 'Tidak Aktif';
  }
}
