import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { user, isLoading: isUserLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip redirect logic if still loading or not authenticated
    if (isAuthLoading || isUserLoading || !isAuthenticated) {
      return;
    }

    // Skip redirect if already on getting started pages
    if (location.pathname.startsWith('/getting-started')) {
      return;
    }

    // Skip redirect for auth and home pages
    if (location.pathname === '/auth' || location.pathname === '/') {
      return;
    }

    // Check if user is a guest (role is 'guest' or missing required info)
    const isGuest = user?.role === 'guest';

    if (isGuest) {
      console.log('User is guest, redirecting to getting started');
      navigate('/getting-started', { replace: true });
    }
  }, [isAuthLoading, isUserLoading, isAuthenticated, user, navigate, location.pathname]);

  return <>{children}</>;
} 