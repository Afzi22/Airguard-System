import type { AlertCard, PublicHealthAdvice } from '../types/index';
import { apiFetch } from './apiClient';
import { getAlertsByCity, getPublicAdvicesByCity } from '../data/mockData';

/**
 * Fetch automated policy alerts for a given city (admin view).
 * Tries the real API first; falls back to mock data if unavailable.
 */
export async function fetchAlerts(cityId: string): Promise<AlertCard[]> {
  try {
    return await apiFetch<AlertCard[]>(`/alerts?city=${encodeURIComponent(cityId)}`);
  } catch {
    return getAlertsByCity(cityId);
  }
}

/**
 * Fetch public health advices for a given city (public view).
 * Tries the real API first; falls back to mock data if unavailable.
 */
export async function fetchPublicAdvices(cityId: string): Promise<PublicHealthAdvice[]> {
  try {
    return await apiFetch<PublicHealthAdvice[]>(`/advices?city=${encodeURIComponent(cityId)}`);
  } catch {
    return getPublicAdvicesByCity(cityId);
  }
}
