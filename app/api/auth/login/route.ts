import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = 'its_raees';
const ADMIN_PASSWORD = 'Morih@srat41471';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password are required' });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create session
      const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      // Set session cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Login failed' });
  }
}
