import type { IoTNode } from '../types/index';
import { apiFetch } from './apiClient';
import { getNodesByCity } from '../data/mockData';

/**
 * Fetch IoT nodes for a given city.
 * Tries the real API first; falls back to mock data if unavailable.
 */
export async function fetchNodes(cityId: string): Promise<IoTNode[]> {
  try {
    return await apiFetch<IoTNode[]>(`/nodes?city=${encodeURIComponent(cityId)}`);
  } catch {
    // API not available — use mock data
    return getNodesByCity(cityId);
  }
}
