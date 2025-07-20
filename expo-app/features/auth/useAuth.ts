import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

/**
 * Custom React hook for accessing Firebase authentication context.
 * This hook provides a convenient way to access the current user state,
 * loading state, and authentication methods from any component.
 *
 * This hook must be used within a component that is wrapped by AuthProvider.
 * It provides access to:
 * - user: Current Firebase user object or null
 * - loading: Boolean indicating if auth state is being determined
 * - setUser: Function to manually update user state (used by sign-in flow)
 * - signOut: Function to sign out the current user
 *
 * @example
 * ```tsx
 * import { useAuth } from '~/features/auth/useAuth';
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
 *
 * @returns return.user - Current Firebase user object or null
 * @returns return.loading - Boolean indicating if auth state is being determined
 * @returns return.setUser - Function to manually update user state (used by sign-in flow)
 * @returns return.signOut - Function to sign out the current user
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Ensure hook is used within AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
