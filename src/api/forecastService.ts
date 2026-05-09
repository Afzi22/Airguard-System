import type { ForecastDataPoint } from '../types/index';
import { apiFetch } from './apiClient';
import { getForecastByCity } from '../data/mockData';

/**
 * Fetch LSTM forecast data for a given city.
 * Tries the real API first; falls back to mock data if unavailable.
 */
export async function fetchForecast(cityId: string): Promise<ForecastDataPoint[]> {
  try {
    return await apiFetch<ForecastDataPoint[]>(`/forecast?city=${encodeURIComponent(cityId)}`);
  } catch {
    return getForecastByCity(cityId);
  }
}
