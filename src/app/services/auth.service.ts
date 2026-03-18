/**
 * KAYA Authentication Service
 * Handles user signup, login, logout, and session management
 */

import { supabase } from '/src/lib/supabase';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// API base URL
const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-2071350e`;

// ============================================================================
// TYPES
// ============================================================================

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  role?: 'landlord' | 'tenant';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'landlord' | 'tenant' | 'property_manager' | 'admin';
  verificationStatus: string;
  subscriptionTier?: 'free' | 'pro' | 'enterprise';
  subscriptionStatus?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// AUTHENTICATION FUNCTIONS
// ============================================================================

/**
 * Sign up a new user
 */
export async function signUp(data: SignUpData): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Signup error:', result.error);
      return { success: false, error: result.error || 'Failed to create account' };
    }

    return { success: true, user: result.user };

  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Log in an existing user
 */
export async function login(data: LoginData): Promise<{ success: boolean; user?: User; accessToken?: string; error?: string }> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error || !authData.session) {
      console.error('Login error:', error);
      return { success: false, error: error?.message || 'Invalid email or password' };
    }

    // Get user profile from backend
    const profileResponse = await fetch(`${API_BASE}/auth/session`, {
      headers: {
        'Authorization': `Bearer ${authData.session.access_token}`,
      },
    });

    const profileData = await profileResponse.json();

    // Store session
    localStorage.setItem('kaya_access_token', authData.session.access_token);
    localStorage.setItem('kaya_user', JSON.stringify(profileData.user));

    return { 
      success: true, 
      user: profileData.user,
      accessToken: authData.session.access_token,
    };

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Log out current user
 */
export async function logout(): Promise<void> {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem('kaya_access_token');
    localStorage.removeItem('kaya_user');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

/**
 * Get current session
 */
export async function getSession(): Promise<{ user: User | null; accessToken: string | null }> {
  try {
    // Check localStorage first
    const cachedToken = localStorage.getItem('kaya_access_token');
    const cachedUser = localStorage.getItem('kaya_user');

    if (cachedToken && cachedUser) {
      // Verify token is still valid
      const response = await fetch(`${API_BASE}/auth/session`, {
        headers: {
          'Authorization': `Bearer ${cachedToken}`,
        },
      });

      const data = await response.json();

      if (data.user) {
        return { user: data.user, accessToken: cachedToken };
      }
    }

    // Check Supabase session
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      return { user: null, accessToken: null };
    }

    // Get user profile
    const profileResponse = await fetch(`${API_BASE}/auth/session`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

    const profileData = await profileResponse.json();

    if (profileData.user) {
      localStorage.setItem('kaya_access_token', session.access_token);
      localStorage.setItem('kaya_user', JSON.stringify(profileData.user));
    }

    return { 
      user: profileData.user || null, 
      accessToken: session.access_token 
    };

  } catch (error) {
    console.error('Session check error:', error);
    return { user: null, accessToken: null };
  }
}

/**
 * Get current user from localStorage (fast, no network call)
 */
export function getCurrentUser(): User | null {
  try {
    const cachedUser = localStorage.getItem('kaya_user');
    return cachedUser ? JSON.parse(cachedUser) : null;
  } catch {
    return null;
  }
}

/**
 * Get access token
 */
export function getAccessToken(): string | null {
  return localStorage.getItem('kaya_access_token');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}