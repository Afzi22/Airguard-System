// Base API client configuration
// Replace BASE_URL with actual API endpoint when ready

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';
const DEFAULT_TIMEOUT_MS = 10_000;

export interface ApiRequestOptions extends RequestInit {
  timeoutMs?: number;
}

/**
 * Base fetch wrapper with timeout support and placeholder interceptors.
 * Swap the mock service functions for calls to this when integrating a real API.
 */
export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Request interceptor placeholder — add auth headers here
    const headers = new Headers(fetchOptions.headers);
    headers.set('Content-Type', 'application/json');

    const response = await fetch(`${BASE_URL}${path}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    // Response interceptor placeholder — handle 401/403 globally here
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}
