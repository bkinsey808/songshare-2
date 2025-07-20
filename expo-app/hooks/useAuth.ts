/**
 * useAuth.ts
 *
 * Custom React hook for accessing Firebase authentication context.
 * This hook provides a convenient way to access the current user state,
 * loading state, and authentication methods from any component.
 *
 * Usage:
 * ```tsx
 * import { useAuth } from '~/hooks/useAuth';
 *
 * function MyComponent() {
 *   const { user, loading, signOut } = useAuth();
 *
 *   if (loading) return <Loading />;
 *   if (!user) return <SignInPrompt />;
 *
 *   return <div>Hello, {user.displayName}!</div>;
 * }
 * ```
 */

import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

/**
 * Custom hook to access authentication context
 *
 * This hook must be used within a component that is wrapped by AuthProvider.
 * It provides access to:
 * - user: Current Firebase user object or null
 * - loading: Boolean indicating if auth state is being determined
 * - setUser: Function to manually update user state (used by sign-in flow)
 * - signOut: Function to sign out the current user
 *
 * @returns AuthContextType object with user state and auth methods
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Ensure hook is used within AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
