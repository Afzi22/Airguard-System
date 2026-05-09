import { UserRole } from '../types';

export const MOCK_CREDENTIALS: Record<string, { password: string; role: UserRole }> = {
  admin: { password: 'admin123', role: 'admin' },
  user:  { password: 'user123',  role: 'public' },
};

export function validateCredentials(
  username: string,
  password: string
): UserRole | null {
  const entry = MOCK_CREDENTIALS[username];
  if (entry && entry.password === password) {
    return entry.role;
  }
  return null;
}
