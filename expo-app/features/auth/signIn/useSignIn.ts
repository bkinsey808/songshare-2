/**
 * useSignIn.ts
 *
 * Custom hook for handling OAuth sign-in functionality
 *
 * This hook provides a comprehensive interface for OAuth authentication,
 * managing providers, loading states, errors, and navigation.
 */

import { useState, useMemo } from 'react';
import { useAuth } from 'features/auth/useAuth';
import { useRouter } from 'expo-router';
import { debugLog } from 'utils/debug';
import { signInWithProvider } from './signInWithProvider';
import { isDevelopment } from 'utils/isDevelopment';
import { PROVIDERS, type OAuthProviderType, type ProvidersType } from './providers';

/**
 * State object returned by the useSignIn hook.
 */
type SignInState = {
  /** True while sign-in is in progress */
  isLoading: boolean;

  /** Error message if sign-in fails, null otherwise */
  error: string | null;

  /** OAuth provider instances for Google, Microsoft, and Apple */
  providers: ProvidersType;

  /** Function to initiate sign-in with a provider */
  signIn: (provider: OAuthProviderType, providerName: string) => Promise<void>;

  /** Function to clear any error state */
  clearError: () => void;
};

/**
 * Custom hook for comprehensive OAuth sign-in functionality
 *
 * This hook:
 * 1. Creates and manages OAuth provider instances
 * 2. Manages loading and error states during sign-in
 * 3. Handles both popup (development) and redirect (production) flows
 * 4. Automatically navigates on successful authentication
 * 5. Provides error handling and recovery
 *
 * @returns return.isLoading - True while sign-in is in progress
 * @returns return.error - Error message if sign-in fails, null otherwise
 * @returns return.providers - OAuth provider instances for Google, Microsoft, and Apple
 * @returns return.signIn - Function to initiate sign-in with a provider
 * @returns return.clearError - Function to clear any error state
 */
export const useSignIn = (): SignInState => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create provider instances (memoized to prevent re-creation)
  const providers = useMemo(
    () => ({
      google: PROVIDERS.google.createProvider(),
      microsoft: PROVIDERS.microsoft.createProvider(),
      apple: PROVIDERS.apple.createProvider(),
    }),
    []
  );

  /**
   * Handle sign-in with any OAuth provider
   *
   * Uses environment-appropriate authentication method:
   * - Popup for localhost (development)
   * - Redirect for production (mobile compatibility)
   *
   * @param provider - The OAuth provider instance (Google, Microsoft, etc.)
   * @param providerName - Human-readable name for error messages
   */
  const signIn = async (provider: OAuthProviderType, providerName: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signInWithProvider(provider, providerName);

      // For popup flow (development), we get a result immediately
      if (result && result.user) {
        debugLog(
          'auth',
          `useSignIn: ${providerName} authentication successful:`,
          result.user.email
        );
        setUser(result.user);
        router.replace('/sign-in-landing');
      } else if (isDevelopment()) {
        // Popup flow but no user returned
        debugLog('auth', `useSignIn: ${providerName} authentication returned no user`);
        setIsLoading(false);
      }
      // For redirect flow (production), signInWithProvider doesn't return a result
      // The redirect will handle navigation, so we don't need to do anything here
    } catch (err: any) {
      debugLog('auth', `useSignIn: ${providerName} sign-in error:`, err.code, err.message);
      setError(`${providerName} Sign-in Error: ${err.message} (Code: ${err.code})`);
      setIsLoading(false);
    }
  };

  /**
   * Clear the current error state.
   *
   * Resets any authentication error messages to allow
   * users to retry sign-in operations.
   */
  const clearError = (): void => {
    setError(null);
  };

  return {
    isLoading,
    error,
    providers,
    signIn,
    clearError,
  };
};
