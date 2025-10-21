import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Simple authentication system
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this to a secure password
const SESSION_COOKIE_NAME = 'admin_session';

export async function authenticate(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<string> {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  return sessionId;
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return !!session?.value;
}

export async function requireAuth() {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}

export async function logout() {
  // In a real app, you'd invalidate the session server-side
  // For now, we'll just redirect to login
  redirect('/admin/login');
}
