import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth to finish loading
    if (loading) return;

    // If auth is required but user is not logged in, redirect
    if (requireAuth && !user) {
      console.log('🔒 Protected route: User not authenticated, redirecting to', redirectTo);
      navigate(redirectTo, { replace: true });
    }
  }, [user, loading, requireAuth, redirectTo, navigate]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If auth is required but user is not logged in, don't render children
  if (requireAuth && !user) {
    return null;
  }

  // User is authenticated or auth is not required
  return <>{children}</>;
}

// Convenience wrapper for public routes (redirects authenticated users)
export function PublicRoute({ 
  children, 
  redirectTo = '/app' 
}: { 
  children: React.ReactNode; 
  redirectTo?: string;
}) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth to finish loading
    if (loading) return;

    // If user is logged in, redirect to dashboard
    if (user) {
      console.log('🔓 Public route: User already authenticated, redirecting to', redirectTo);
      navigate(redirectTo, { replace: true });
    }
  }, [user, loading, redirectTo, navigate]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Render children (login/signup pages)
  return <>{children}</>;
}