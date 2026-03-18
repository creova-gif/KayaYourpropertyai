import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '/src/lib/supabase';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  phone?: string;
  subscriptionTier?: string;
  subscriptionStatus?: string;
}

interface Session {
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event);
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name,
            role: session.user.user_metadata?.role || 'landlord',
            phone: session.user.user_metadata?.phone,
            subscriptionTier: session.user.user_metadata?.subscriptionTier,
            subscriptionStatus: session.user.user_metadata?.subscriptionStatus,
            user_metadata: session.user.user_metadata,
          });
          setSession({
            access_token: session.access_token,
          });
        } else {
          setUser(null);
          setSession(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Session check error:', error);
        setLoading(false);
        return;
      }

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name,
          role: session.user.user_metadata?.role || 'landlord',
          phone: session.user.user_metadata?.phone,
          subscriptionTier: session.user.user_metadata?.subscriptionTier,
          subscriptionStatus: session.user.user_metadata?.subscriptionStatus,
          user_metadata: session.user.user_metadata,
        });
        setSession({
          access_token: session.access_token,
        });
      }
    } catch (error) {
      console.error('❌ Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    name: string
  ): Promise<void> => {
    try {
      setLoading(true);

      // Call backend to create user with admin privileges
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2071350e/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ Signup error:', result);
        throw new Error(result.error || 'Failed to create account');
      }

      console.log('✅ Signup successful:', result);

      // Now sign in the user
      await signIn(email, password);

    } catch (error: any) {
      console.error('❌ Signup error:', error);
      throw new Error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (
    email: string, 
    password: string
  ): Promise<void> => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Sign in error:', error);
        throw new Error(error.message || 'Invalid email or password');
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name,
          role: data.user.user_metadata?.role || 'landlord',
          phone: data.user.user_metadata?.phone,
          subscriptionTier: data.user.user_metadata?.subscriptionTier,
          subscriptionStatus: data.user.user_metadata?.subscriptionStatus,
          user_metadata: data.user.user_metadata,
        });
        setSession({
          access_token: data.session.access_token,
        });

        console.log('✅ Sign in successful:', data.user.email);
        
      } else {
        throw new Error('Failed to sign in');
      }

    } catch (error: any) {
      console.error('❌ Sign in error:', error);
      throw new Error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Sign out error:', error);
        return;
      }

      setUser(null);
      setSession(null);
      console.log('✅ Signed out successfully');
      
      // Redirect to landing page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('❌ Password reset error:', error);
        throw new Error(error.message);
      }

      console.log('✅ Password reset email sent');
      
    } catch (error: any) {
      console.error('❌ Password reset error:', error);
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export supabase client for direct use if needed
export { supabase };