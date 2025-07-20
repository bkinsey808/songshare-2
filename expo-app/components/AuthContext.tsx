/**
 * AuthContext.tsx
 *
 * Provides Firebase authentication state management throughout the application.
 * This context handles user sign-in state, loading states, and provides methods
 * for authentication operations like sign out.
 *
 * Features:
 * - Automatic Firebase auth state synchronization via onAuthStateChanged
 * - Loading state management during auth initialization
 * - Sign out functionality with error handling
 * - Manual user state updates (used by sign-in flow)
 */

import { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

/**
 * Type definition for the authentication context
 */
type AuthContextType = {
  /** Current authenticated user or null if not signed in */
  user: FirebaseUser | null;
  /** Loading state - true during initial auth check or auth operations */
  loading: boolean;
  /**
   * Manual user state setter - used by sign-in flow to immediately update context
   * before Firebase's onAuthStateChanged fires
   */
  setUser: (user: FirebaseUser | null) => void;
  /** Sign out function that handles Firebase logout and error cases */
  signOut: () => Promise<void>;
};

/**
 * React context for authentication state
 * Will be undefined if used outside of AuthProvider
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props for the AuthProvider component
 */
type AuthProviderProps = {
  children: ReactNode;
};

/**
 * AuthProvider Component
 *
 * Wraps the application to provide authentication context to all child components.
 * Should be placed high in the component tree (typically in _layout.tsx).
 *
 * Behavior:
 * - Initializes with loading=true until Firebase auth state is determined
 * - Automatically syncs with Firebase auth state changes
 * - Provides sign out functionality
 * - Handles authentication errors gracefully
 *
 * @param children - React components that will have access to auth context
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Local state for the current user
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // Loading state - starts true until we know the auth status
  const [loading, setLoading] = useState(true);

  // Set up Firebase auth state listener on component mount
  useEffect(() => {
    /**
     * Firebase auth state change listener
     *
     * This listener fires whenever the user's authentication state changes:
     * - User signs in (user object provided)
     * - User signs out (null provided)
     * - Auth token refreshes (same user object provided)
     * - Initial app load (provides current auth state)
     */
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Update local state with Firebase's current user
      setUser(currentUser);

      // Auth state is now known, stop loading
      setLoading(false);
    });

    // Cleanup: Remove listener when component unmounts
    return () => unsubscribe();
  }, []);

  /**
   * Sign out function
   *
   * Handles user logout by calling Firebase's signOut method.
   * The onAuthStateChanged listener will automatically update the local state
   * to null when sign out completes.
   *
   * @throws Error if sign out fails (network issues, etc.)
   */
  const handleSignOut = async () => {
    try {
      // Call Firebase sign out
      await signOut(auth);

      // Note: We don't manually set user to null here because
      // the onAuthStateChanged listener will handle it automatically
    } catch (error) {
      // Log error for debugging
      console.error('Error signing out:', error);

      // Re-throw error so calling components can handle it
      throw error;
    }
  };

  // Provide auth context to all children
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        signOut: handleSignOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
