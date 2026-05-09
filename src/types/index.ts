export type AQILevel = 'good' | 'moderate' | 'unhealthy';
export type NodeStatus = 'Active' | 'Warning' | 'Offline';
export type AlertSeverity = 'Critical' | 'Warning' | 'Insight';

// Authentication types
export type UserRole = 'admin' | 'public';

export interface AuthState {
  role: UserRole;
  username: string;
}

// Public health advice type
export interface PublicHealthAdvice {
  id: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  location?: string | null;
}

export interface IoTNode {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  aqi: number;
  pm25: number;
  status: NodeStatus;
  lastUpdated: string;
}

export interface ForecastDataPoint {
  hour: string;       // Format: "HH:00" (e.g., "14:00")
  aqi: number;
  timestamp: string;  // ISO 8601
}

export interface AlertCard {
  id: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  location?: string | null;
}

export interface CityConfig {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
